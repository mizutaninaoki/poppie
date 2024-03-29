#-----------------------------------------------------
# output
#-----------------------------------------------------
output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnet_ids" {
  value = [aws_subnet.publics.*.id]
}

output "private_subnet_ids" {
  value = [aws_subnet.privates.*.id]
}
