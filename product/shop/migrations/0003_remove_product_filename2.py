# Generated by Django 4.2.11 on 2024-04-19 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_product_filename2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='filename2',
        ),
    ]
