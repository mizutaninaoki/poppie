# ---------------------------------------------------
# output
# ---------------------------------------------------
output "aws_lb_backend" {
  value = aws_lb.backend
}

output "aws_alb_listener_backend_http" {
  value = aws_alb_listener.backend_http
}

output "aws_alb_target_group_ecs_backend_arn" {
  value = aws_alb_target_group.backend.arn
}