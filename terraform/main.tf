########################################################################################################
#-----------------------------
# terraformで管理していないリソース
#-----------------------------
# S3, route53のホストゾーン
########################################################################################################

#---------------------------------------------------------------------
# variable(terraform.tfvarsに定義した変数を使用できるようにする)
#---------------------------------------------------------------------
variable "access_key" {}
variable "secret_key" {}
variable "region" {
  default = "ap-northeast-1"
}
variable "public_key_path" {}
variable "app_name" {}
variable "domain" {}

# Route53
variable "backend_sub_domain" {}

# VPC
variable "vpc_cidr" {}
variable "azs" {}
variable "public_subnet_cidrs" {}
variable "private_subnet_cidrs" {}
variable "azs_name" {}

# ECR
variable "ecr_django_repository_name" {}
variable "ecr_next_repository_name" {}
variable "ecr_nginx_repository_name" {}

# ELB
variable "next_health_check_path" {}
variable "nginx_health_check_path" {}

# RDS
variable "db_identifier" {}

# ECS
variable "next_public_scheme" {}
variable "next_public_nginx_port" {}
variable "next_public_poppie_host" {}

#
# 環境変数
#
variable "env_name" {}
variable "node_env" {}
variable "django_secret_key" {}
variable "aws_s3_access_key_id" {}
variable "aws_s3_secret_access_key_id" {}
variable "aws_storage_bucket_name" {}
variable "aws_region_name" {}
variable "engine" {}
variable "postgres_db" {}
variable "postgres_user" {}
variable "postgres_password" {}
variable "db_host" {}
variable "db_port" {}
variable "database" {}
variable "allowed_hosts" {}
variable "cors_allowed_origins" {}


#------------------------------------------
# ECR
#------------------------------------------
module "ecr" {
  source                     = "./ecr"
  ecr_django_repository_name = var.ecr_django_repository_name
  ecr_next_repository_name   = var.ecr_next_repository_name
  ecr_nginx_repository_name  = var.ecr_nginx_repository_name
}

#------------------------------------------
# IAM ROLE
#------------------------------------------
module "iam_role" {
  source   = "./iam_role"
  app_name = var.app_name
}

#------------------------------------------
# Network(VPC、サブネット)
#------------------------------------------
module "network" {
  source               = "./network"
  app_name             = var.app_name
  vpc_cidr             = var.vpc_cidr
  azs                  = var.azs
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  azs_name             = var.azs_name
}

#------------------------------------------
# SECURITY GROUP
#------------------------------------------
module "security_group" {
  source   = "./security_group"
  app_name = var.app_name
  vpc_id   = module.network.vpc_id
}

#------------------------------------------
# ELB
#------------------------------------------
# frontend
module "elb_frontend" {
  source   = "./elb/frontend"
  app_name = var.app_name
  vpc_id   = module.network.vpc_id
  acm_id   = module.acm.acm_id # acm証明書のid
  alb_security_group_load-balancer = module.security_group.alb_security_group_load-balancer
  public_subnet_ids                = module.network.public_subnet_ids
  next_health_check_path           = var.next_health_check_path
}

# backend
module "elb_backend" {
  source   = "./elb/backend"
  app_name = var.app_name
  vpc_id   = module.network.vpc_id
  acm_id   = module.acm.acm_id # acm証明書のid(サブドメインも対応)
  alb_security_group_load-balancer = module.security_group.alb_security_group_load-balancer
  public_subnet_ids                = module.network.public_subnet_ids
  nginx_health_check_path          = var.nginx_health_check_path
}

#------------------------------------------
# Route53
#------------------------------------------
# フロントエンド側とバックエンド側、両方のALBへのAレコードも作成している
module "route53" {
  source             = "./route53"
  domain             = var.domain
  backend_sub_domain = var.backend_sub_domain
  aws_lb_frontend    = module.elb_frontend.aws_lb_frontend
  aws_lb_backend     = module.elb_backend.aws_lb_backend
}

#------------------------------------------
# ACM
#------------------------------------------
module "acm" {
  source = "./acm"
  domain = var.domain
}

#------------------------------------------
# cloudwatch logs
#------------------------------------------
module "cloudwatch" {
  source   = "./cloudwatch"
  app_name = var.app_name
}

#------------------------------------------
# RDS
#------------------------------------------
module "rds" {
  source   = "./rds"
  app_name = var.app_name

  vpc_id             = module.network.vpc_id
  private_subnet_ids = module.network.private_subnet_ids # RDSはプライベートサブネット内に配置する
  # alb_security_group = module.elb.alb_security_group     # RDSへのアクセスを許可するALBのセキュリティーグループ
  alb_security_group_ecs = module.security_group.alb_security_group_ecs # RDSへのアクセスを許可するECSのセキュリティーグループ

  # DB環境変数
  postgres_db       = var.postgres_db
  db_identifier     = var.db_identifier
  postgres_user     = var.postgres_user
  postgres_password = var.postgres_password
  db_port           = var.db_port
}

# ------------------------------------------
# ecs cluster
# ------------------------------------------
module "cluster" {
  source   = "./ecs/cluster"
  app_name = var.app_name
}

#------------------------------------------
# ecs services
#------------------------------------------
# フロントエンドのECS Fargate
module "ecs_frontend" {
  source = "./ecs/services/frontend"

  # 変数(モジュール)
  app_name                        = var.app_name
  vpc_id                          = module.network.vpc_id
  cluster_arn                     = module.cluster.cluster_arn
  aws_iam_ecs_task_execution_role = module.iam_role.aws_iam_ecs_task_execution_role # タスク実行ロール
  aws_iam_ecs_task_role           = module.iam_role.aws_iam_ecs_task_role # タスクロール
  db_instance_postgres            = module.rds.db_instance_postgres # task-definitionのdepends_onに指定する時に使用(フロントも一応DB作成後に起動させている)

  aws_alb_target_group_ecs_frontend_arn = module.elb_frontend.aws_alb_target_group_ecs_frontend_arn
  alb_security_group_ecs                = module.security_group.alb_security_group_ecs # ECSのセキュリティグループはフロントエンド、バックエンド共通のを使用
  private_subnet_ids                    = module.network.private_subnet_ids

  # 環境変数
  next_public_scheme      = var.next_public_scheme
  next_public_nginx_port  = var.next_public_nginx_port
  next_public_poppie_host = var.next_public_poppie_host
  env_name                = var.env_name
  node_env                = var.node_env
}

# バックエンドのECS Fargate
module "ecs_backend" {
  source = "./ecs/services/backend"

  # 変数(モジュール)
  app_name                        = var.app_name
  vpc_id                          = module.network.vpc_id
  cluster_arn                     = module.cluster.cluster_arn
  aws_iam_ecs_task_execution_role = module.iam_role.aws_iam_ecs_task_execution_role # タスク実行ロール
  aws_iam_ecs_task_role           = module.iam_role.aws_iam_ecs_task_role # タスクロール
  db_instance_postgres            = module.rds.db_instance_postgres # task-definitionのdepends_onに指定する時に使用

  aws_alb_target_group_ecs_backend_arn = module.elb_backend.aws_alb_target_group_ecs_backend_arn
  alb_security_group_ecs               = module.security_group.alb_security_group_ecs # ECSのセキュリティグループはフロントエンド、バックエンド共通のを使用
  private_subnet_ids                   = module.network.private_subnet_ids

  # 環境変数
  env_name                    = var.env_name
  django_secret_key           = var.django_secret_key
  aws_s3_access_key_id        = var.aws_s3_access_key_id
  aws_s3_secret_access_key_id = var.aws_s3_secret_access_key_id
  aws_storage_bucket_name     = var.aws_storage_bucket_name
  aws_region_name             = var.aws_region_name
  engine                      = var.engine
  postgres_db                 = var.postgres_db
  postgres_user               = var.postgres_user
  postgres_password           = var.postgres_password
  db_host                     = module.rds.db_instance_postgres.address # RDSのエンドポイントをhostに指定する
  db_port                     = var.db_port
  database                    = var.database
  allowed_hosts               = var.allowed_hosts
  cors_allowed_origins        = var.cors_allowed_origins
}



# #------------------------------------------
# # keypair
# #------------------------------------------
# module "keypair" {
#   source          = "./keypair"
#   app_name        = var.app_name
#   public_key_path = var.public_key_path
# }

# #------------------------------------------
# # EC2(RDSへsshできるよう踏み台サーバーとしての役割)
# #------------------------------------------
# module "ec2" {
#   source = "./ec2"

#   app_name          = var.app_name
#   vpc_id            = module.network.vpc_id
#   public_subnet_ids = module.network.public_subnet_ids
#   aws_key_pair_public_key_id = module.keypair.aws_key_pair_public_key_id
# }