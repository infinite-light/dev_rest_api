# Generated by Django 3.1.5 on 2021-01-23 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devrestapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deptname', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='office',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('office_city', models.CharField(max_length=20)),
            ],
        ),
        migrations.RenameField(
            model_name='employees',
            old_name='emp_id',
            new_name='contactno',
        ),
    ]