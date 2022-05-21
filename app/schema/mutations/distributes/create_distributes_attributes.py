import graphene


class DistributeAttributes(graphene.InputObjectType):
    account_id = graphene.ID(required=True)
    distribute_point = graphene.Int(required=True)
