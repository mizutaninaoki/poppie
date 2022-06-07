from django.db import models
from .company import Company
from app.services.amazon_s3_service import AmazonS3Service


class Item(models.Model):
    # 景品を公開するかどうか（交換可能にするかどうか）
    class Statuses(models.IntegerChoices):
        PUBLIC = 0
        PRIVATE = 1

    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    name = models.CharField("景品名", max_length=30, blank=False, null=False)
    unit = models.CharField("単位", max_length=10, blank=False, null=False)
    exchangable_point = models.IntegerField("交換に必要なポイント", blank=False, null=False)
    status = models.IntegerField(
        "ステータス",
        blank=False,
        null=False,
        choices=Statuses.choices,
        default=Statuses.PUBLIC,
    )
    quantity = models.IntegerField("在庫数", blank=False, null=False, default=0)
    image_key = models.CharField("S3内の画像保存キー", blank=True, null=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "items"

    def __str__(self):
        return f"id: {self.id}, company_id: {self.company_id}, name: {self.name}, unit: {self.unit}, exchangable_point: {self.exchangable_point}, status: {self.status}, quantity: {self.quantity}, image_key: {self.image_key}, created_at: {self.created_at}, updated_at: {self.updated_at}"

    # S3の署名付きプロフィール画像URL
    def image_url(self):
        if self.image_key:
            return AmazonS3Service().generate_image_presigned_url(self.image_key)
        else:
            return None
