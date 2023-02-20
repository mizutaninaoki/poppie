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
  value = aws_lb_listener.http
}
