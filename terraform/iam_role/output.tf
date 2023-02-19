output "aws_iam_role_backend_task" {
  value = aws_iam_role.backend_task
}

output "aws_iam_role_ecs_task_execution" {
  value = aws_iam_role.ecs_task_execution
}
