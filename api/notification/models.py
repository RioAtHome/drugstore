from django.db import models
from django.conf import settings

USER_MODEL = settings.AUTH_USER_MODEL


class Notification(models.Model):
    class Meta:
        ordering = ["-created_at", "seen"]
        app_label = "notification"

    user = models.ForeignKey(
        USER_MODEL, on_delete=models.CASCADE, related_name="notifications"
    )
    payload = models.CharField(max_length=255)
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def mark_as_seen(self):
        if not self.seen:
            self.seen = True
            self.save()

    def __str__(self):
        return str(self.id)


class Online(models.Model):
    """
    collects who is online at the moment, and who isnt
    """

    user = models.OneToOneField(USER_MODEL, primary_key=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user.pk)
