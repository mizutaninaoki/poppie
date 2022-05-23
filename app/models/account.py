from django.db import models
from django.conf import settings
from .company import Company


class Account(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="account", on_delete=models.CASCADE
    )
    givable_point = models.IntegerField("贈与可能ポイント", blank=False, null=False, default=0)
    received_point = models.IntegerField(
        "受け取ったポイント", blank=False, null=False, default=0
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "accounts"

    def __str__(self):
        return f"id: {self.id}, givable_point: {self.givable_point}, received_point: {self.received_point}, created_at: {self.created_at}, updated_at: {self.updated_at}"

    # 贈与可能なポイントを増やす
    def increase_givable_point(self, point):
        self.givable_point += point
        self.save()

    # 贈与可能なポイントを減らす
    def decrease_givable_point(self, point):
        self.givable_point -= point
        self.save()

    # 受け取ったポイントを増やす
    def increase_received_point(self, point):
        self.received_point += point
        self.save()

    # 受け取ったポイントを減らす
    def decrease_received_point(self, point):
        self.received_point -= point
        self.save()
