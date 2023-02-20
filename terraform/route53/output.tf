# Route53のネームサーバを出力
output "name_servers" {
  description = "A list of name servers in associated (or default) delegation set."
  value       = aws_route53_zone.public.name_servers
}