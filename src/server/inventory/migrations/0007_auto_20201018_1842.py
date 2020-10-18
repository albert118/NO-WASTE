# Generated by Django 3.0.8 on 2020-10-18 07:42

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_auto_20201018_1841'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='added_date',
            field=models.DateField(default=datetime.datetime(2020, 10, 18, 7, 42, 10, 697246, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='added_date',
            field=models.DateField(default=datetime.datetime(2020, 10, 18, 7, 42, 10, 697246, tzinfo=utc)),
        ),
    ]
