#---------------------------------------------------
# output
#---------------------------------------------------
output "aws_django_ecr_repository" {
  description = "作成したdjangoのECRのリポジトリ"
  value       = aws_ecr_repository.django.name
}

output "aws_next_ecr_repository" {
  description = "作成したnextのECRのリポジトリ"
  value       = aws_ecr_repository.next.name
}

output "aws_nginx_ecr_repository" {
  description = "作成したnginxのECRのリポジトリ"
  value       = aws_ecr_repository.nginx.name
}
