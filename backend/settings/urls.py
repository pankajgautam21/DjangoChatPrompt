from django.urls import path
from .views import SaveDatabaseConfigAPIView, TestDatabaseConnectionAPIView,ExecuteQueryAPIView

urlpatterns = [
    path('save/', SaveDatabaseConfigAPIView.as_view(), name='save_db_config'),
    path('test/', TestDatabaseConnectionAPIView.as_view(), name='test_db_connection'),
     path('execute-query/', ExecuteQueryAPIView.as_view(), name='execute_query'),
]
