#=====================================================================================================
# ECRリポジトリにイメージが存在している場合、terraform destroyでは破棄されない。（削除したい時は手動で削除する）
#=====================================================================================================

# 参考：https://book.st-hakky.com/docs/infra-terraform-aws-ecr/
# ECRのイメージを最大5まで保持して、残りのものは削除する
locals {
  ecr-lifecycle-policy = {
    rules = [
      {
        action = {
          type = "expire"
        }
        description  = "最新のイメージを3つだけ残す"
        rulePriority = 1
        selection = {
          countNumber = 3
          countType   = "imageCountMoreThan"
          tagStatus   = "any"
        }
      },
    ]
  }
}

#---------------
# django
#---------------

# djangoのECRリポジトリ作成(プライベートリポジトリ)
resource "aws_ecr_repository" "django" {
  name                 = var.ecr_django_repository_name
  image_tag_mutability = "MUTABLE"

  # image_scanning_configurationでコンテナイメージのセキュリティ診断も行ってくれるようなので有効にしておくと良い。
  # イメージのスキャンをpush時に行う
  image_scanning_configuration {
    scan_on_push = true
  }
}


# djangoのECRリポジトリのライフサイクルポリシー定義
resource "aws_ecr_lifecycle_policy" "django_lifecycle" {
  repository = aws_ecr_repository.django.name
  policy     = jsonencode(local.ecr-lifecycle-policy)
}

#---------------
# next
#---------------

# nextのECRリポジトリ作成(プライベートリポジトリ)
resource "aws_ecr_repository" "next" {
  name                 = var.ecr_next_repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# nextのECRリポジトリのライフサイクルポリシー定義
resource "aws_ecr_lifecycle_policy" "next_lifecycle" {
  repository = aws_ecr_repository.next.name
  policy     = jsonencode(local.ecr-lifecycle-policy)
}

#---------------
# nginx
#---------------

# nginxのECRリポジトリ作成(プライベートリポジトリ)
resource "aws_ecr_repository" "nginx" {
  name                 = var.ecr_nginx_repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# nginxのECRリポジトリのライフサイクルポリシー定義
resource "aws_ecr_lifecycle_policy" "nginx_lifecycle" {
  repository = aws_ecr_repository.nginx.name
  policy     = jsonencode(local.ecr-lifecycle-policy)
}
