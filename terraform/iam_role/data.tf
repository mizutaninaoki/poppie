# ------------------------------------------------------------------------------------------
# ECS Execを利用するために必要なSSMセッションマネージャー関連の権限を付与したロール (ECSタスクロールに使用)
# ------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "ecs_task_role_ssmmessages" {
  version = "2012-10-17"
  statement {
    actions = [
      "ssmmessages:CreateControlChannel",
      "ssmmessages:CreateDataChannel",
      "ssmmessages:OpenControlChannel",
      "ssmmessages:OpenDataChannel"
    ]
    resources = ["*"]
  }
}
