# Generated by Django 3.1.5 on 2021-02-07 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devrestapp', '0008_auto_20210207_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='errno',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
