# Generated by Django 3.2.12 on 2022-06-06 03:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_auto_20220606_1234'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='imageName',
            new_name='image_name',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='imageUrl',
            new_name='image_url',
        ),
    ]
