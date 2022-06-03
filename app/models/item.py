from django.db import models
from .company import Company


class Item(models.Model):
    # 景品を公開するかどうか（交換可能にするかどうか）
    class Statuses(models.IntegerChoices):
        PUBLIC = 0
        PRIVATE = 1

    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    name = models.CharField("景品名", max_length=30, blank=False, null=False)
    unit = models.CharField("単位", max_length=10, blank=False, null=False)
    exchangable_point = models.IntegerField("交換に必要なポイント", blank=False, null=False)
    image = models.ImageField("景品画像", upload_to="images", null=True, blank=True)
    status = models.IntegerField(
        "ステータス",
        blank=False,
        null=False,
        choices=Statuses.choices,
        default=Statuses.PUBLIC,
    )
    quantity = models.IntegerField("在庫数", blank=False, null=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "items"

    def __str__(self):
        return f"id: {self.id}, company_id: {self.company_id}, name: {self.name}, unit: {self.unit}, exchangable_point: {self.exchangable_point}, image: {self.image}, status: {self.status}, quantity: {self.quantity}, created_at: {self.created_at}, updated_at: {self.updated_at}"
