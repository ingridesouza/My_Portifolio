from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('github_integration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='githubstats',
            name='contribution_calendar',
            field=models.JSONField(default=dict),
        ),
    ]
