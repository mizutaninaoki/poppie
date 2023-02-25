#---------------------------------------------------
# output
#---------------------------------------------------
output "aws_key_pair_public_key_id" {
  value = aws_key_pair.public_key.id
}
