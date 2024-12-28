from rest_framework import serializers
from .models import DatabaseSetting

class DatabaseSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseSetting
        fields = '__all__'
