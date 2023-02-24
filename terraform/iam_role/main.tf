# ====================== タスク実行ロール ===============================
# ---------------------------------------------------------------------
# ECSタスクを操作可能にするassume role作成(タスク実行ロール用)
# ---------------------------------------------------------------------
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.app_name}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Effect = "Allow",
        Sid    = ""
      }
    ]
  })
}

# ---------------------------------------------------------------------
# ECSのタスク実行ロールをassume roleに付与
# ---------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
# =====================================================================



# ====================== タスクロール ===================================
# ---------------------------------------------------------------------
# ECSタスクを操作可能にするassume role作成(タスクロール用)
# ---------------------------------------------------------------------
resource "aws_iam_role" "ecs_task_role" {
  name = "${var.app_name}-ecs-task-role"

  assume_role_policy = jsonencode(
    {
      Version = "2012-10-17",
      Statement = [
        {
          Action = "sts:AssumeRole",
          Principal = {
            Service = "ecs-tasks.amazonaws.com"
          },
          Effect = "Allow",
          Sid    = ""
        }
      ]
    }
  )
}

# ---------------------------------------------------------------------
# ECS Execに必要なSSMセッションマネージャー関連の権限を付与したロールを作成
# ---------------------------------------------------------------------
resource "aws_iam_policy" "ecs_task_role_ssmmessages" {
  name_prefix = "${var.app_name}-ecs-task-role-ssmmessages"
  policy = data.aws_iam_policy_document.ecs_task_role_ssmmessages.json
}

# ---------------------------------------------------------------------
# ECSのタスクロールをassume roleに付与
# ---------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "ecs_task_role_ssmmessages" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.ecs_task_role_ssmmessages.arn
}
# =====================================================================
