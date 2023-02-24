#------------------------------------------
# output
#------------------------------------------
# DBインスタンス(postgres)
output "db_instance_postgres" {
  value = aws_db_instance.postgres
}