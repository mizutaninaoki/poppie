#------------------------------------------
# provider
#------------------------------------------
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

# terraformのバージョン等設定
terraform {
  required_version = ">= 1.3.9"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.54.0"
    }
  }
}
