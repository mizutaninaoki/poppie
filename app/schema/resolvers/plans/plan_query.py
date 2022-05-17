import logging
import graphene
from app.models.plan import Plan
from app.schema.types.plan_type import PlanType

# TODO: __name__でOK?
# logger = logging.getLogger(__name__)


class PlanQuery(graphene.ObjectType):
    plans = graphene.List(PlanType)
    plan = graphene.Field(PlanType, id=graphene.ID(required=True))

    def resolve_plans(root, info):
        return Plan.objects.all()

    def resolve_plan(root, info, id):
        try:
            return Plan.objects.get(id=id)
        except Plan.DoesNotExist:
            # logger.exception('エラーが発生しました。プランがありません。')
            return None
