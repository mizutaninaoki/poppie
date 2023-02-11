import logging
import graphene
from app.models.plan import Plan
from app.schema.types.plan_type import PlanType

logger = logging.getLogger(__name__)


class PlansQuery(graphene.ObjectType):
    plans = graphene.List(
        graphene.NonNull(PlanType), required=True, description="プラン一覧取得"
    )

    def resolve_plans(root, info):
        return Plan.objects.all()
