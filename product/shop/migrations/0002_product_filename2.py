# Generated by Django 4.2.11 on 2024-04-19 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='filename2',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
    ]
