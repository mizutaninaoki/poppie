# ---------------------------------------------------
# output
# ---------------------------------------------------
output "aws_lb_frontend" {
  value = aws_lb.frontend
}

output "aws_alb_listener_frontend_http" {
  value = aws_alb_listener.frontend_http
}

output "aws_alb_target_group_ecs_frontend_arn" {
  value = aws_alb_target_group.frontend.arn
}