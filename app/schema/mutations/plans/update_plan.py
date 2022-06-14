import graphene
from app.models.plan import Plan
from app.schema.types.plan_type import PlanType


class UpdatePlan(graphene.relay.ClientIDMutation):
    class Input:
        plan_id = graphene.ID(required=True)

    plan = graphene.Field(PlanType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        plan = Plan.objects.get(pk=input.get("plan_id"))
        plan.fee = 111
        plan.save()
        return UpdatePlan(plan=plan)


class PlanMutation(graphene.AbstractType):
    update_plan = UpdatePlan.Field()
