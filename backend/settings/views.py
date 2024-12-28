from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connections, OperationalError
from .models import DatabaseSetting
from .serializer import DatabaseSettingSerializer
import openai
from .utils import prompt_to_sql 
import logging

class SaveDatabaseConfigAPIView(APIView):
    def post(self, request):
        serializer = DatabaseSettingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Database configuration saved."})
        return Response(serializer.errors, status=400)


class TestDatabaseConnectionAPIView(APIView):
    def post(self, request):
        config_id = request.data.get("config_id")
        try:
            config = DatabaseSetting.objects.get(id=config_id)
            settings = {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': config.database_name,
                'USER': config.username,
                'PASSWORD': config.password,
                'HOST': config.host,
                'PORT': config.port,
            }
            connections.databases['dynamic'] = settings
            with connections['dynamic'].cursor() as cursor:
                cursor.execute("SELECT 1;")
            return Response({"success": True, "message": "Connection successful!"})
        except DatabaseSetting.DoesNotExist:
            return Response({"success": False, "message": "Invalid configuration ID."}, status=404)
        except OperationalError as e:
            return Response({"success": False, "message": f"Connection failed: {str(e)}"}, status=400)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=500)

class ExecuteQueryAPIView(APIView):
    def post(self, request):
        user_prompt = request.data.get("user_prompt")  
        config_id = request.data.get("config_id")

        if not user_prompt:
            return Response({"success": False, "message": "User prompt is required."}, status=400)

        sql_query = prompt_to_sql(user_prompt)
        if not sql_query:
            return Response({"success": False, "message": "Could not convert prompt to SQL query."}, status=500)

        try:
            config = DatabaseSetting.objects.get(id=config_id)
            settings = {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': config.database_name,
                'USER': config.username,
                'PASSWORD': config.password,
                'HOST': config.host,
                'PORT': config.port,
            }
            connections.databases['dynamic'] = settings

            with connections['dynamic'].cursor() as cursor:
                cursor.execute(sql_query)
                if sql_query.strip().lower().startswith("select"):
                    results = cursor.fetchall()
                    return Response({"success": True, "results": results})
            return Response({"success": True, "message": "Query executed successfully."})

        except OperationalError as e:
            logging.error(f"Database connection error: {str(e)}")
            return Response({"success": False, "message": f"Database connection error: {str(e)}"}, status=400)
        except Exception as e:
            logging.error(f"Error executing query: {str(e)}")
            return Response({"success": False, "message": str(e)}, status=500)