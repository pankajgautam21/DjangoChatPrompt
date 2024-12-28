from django.db import models
class DatabaseSetting(models.Model):
    host = models.CharField(max_length=255)
    port = models.CharField(max_length=10)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    database_name = models.CharField(max_length=255, default='default_db')

    def __str__(self):
        return self.host

