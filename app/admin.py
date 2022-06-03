from django.contrib import admin
from .models.plan import Plan
from .models.company import Company
from .models.account import Account
from .models.dealing import Dealing
from .models.distribute_log import DistributeLog
from .models.item import Item
from .models.purchased_point_log import PurchasedPointLog
from .models.company import Company
from .models.exchanged_item import ExchangedItem
from .models.exchanged_item_log import ExchangedItemLog

admin.site.register(Plan)
admin.site.register(Company)
admin.site.register(Account)
admin.site.register(Dealing)
admin.site.register(DistributeLog)
admin.site.register(Item)
admin.site.register(PurchasedPointLog)
admin.site.register(ExchangedItem)
admin.site.register(ExchangedItemLog)
