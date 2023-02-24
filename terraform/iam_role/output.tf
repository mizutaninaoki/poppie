# output "aws_iam_role_ecs_task_execution" {
#   value = aws_iam_role.ecs_task_execution
# }

# タスク実行ロール
output "aws_iam_ecs_task_execution_role" {
  value = aws_iam_role.ecs_task_execution_role
}
# タスクロール
output "aws_iam_ecs_task_role" {
  value = aws_iam_role.ecs_task_role
}