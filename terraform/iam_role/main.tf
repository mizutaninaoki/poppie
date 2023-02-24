# ---------------------------------------------------------------------
# IAMロールを定義して、信頼ポリシーを紐付ける(backend_task)
# ---------------------------------------------------------------------
resource "aws_iam_role" "backend_task" {
  name = "${var.app_name}_backend_task"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


# ---------------------------------------------------------------------
# IAMロールを定義して、信頼ポリシーを紐付ける(ecs_task_execution)
# ---------------------------------------------------------------------
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.app_name}_ecs_task_execution"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


# ---------------------------------------------------------------------
# IAMロールとIAMポリシーを紐付ける
# ---------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
