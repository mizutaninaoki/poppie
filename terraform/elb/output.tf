# ---------------------------------------------------
# output
# ---------------------------------------------------
# output "http_listener_arn" {
#   value = aws_lb_listener.http.arn
# }

# output "https_listener_arn" {
#   value = aws_lb_listener.https.arn
# }

output "aws_lb" {
  value = aws_lb.this
}


output "aws_alb_listener_http" {
  value = aws_alb_listener.http
}

output "aws_alb_target_group_ecs_arn" {
  value = aws_alb_target_group.default_target_group.arn
}