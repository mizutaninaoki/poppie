#---------------------------------------------------
# output
#---------------------------------------------------
output "alb_security_group_load-balancer" {
  value = aws_security_group.load-balancer
}

output "alb_security_group_ecs" {
  value = aws_security_group.ecs
}