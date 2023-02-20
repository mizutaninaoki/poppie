#------------------------------------------
# variable
#------------------------------------------
variable "domain" {
  type = string
}

variable "aws_lb" {
  type = object({
    dns_name: string,
    zone_id: string
  })
}
