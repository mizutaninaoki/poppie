#---------------------------------------------------
# output
#---------------------------------------------------
output "id" {
  description = "作成したEC2のid"
  value       = aws_instance.fumidai_ec2.*.id
}

output "arn" {
  description = "作成したEC2のARN"
  value       = aws_instance.fumidai_ec2.*.arn
}
