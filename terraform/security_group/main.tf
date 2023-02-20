#------------------------------------------
# ALBのセキュリティグループ作成
#------------------------------------------
# ALB Security Group (Traffic Internet -> ALB)
resource "aws_security_group" "load-balancer" {
  name        = "${var.app_name}-alb" # セキュリティーグループ名
  description = "${var.app_name}-alb" # セキュリティーグループについてのdescription

  vpc_id = var.vpc_id # 紐付けるvpc id

  # インバウンドルール
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # アウトバウンドルール
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-alb"
  }
}


#------------------------------------------
# ECSサービス用のセキュリティーグループの作成
#------------------------------------------
# ECS Security group (traffic ALB -> ECS, ssh -> ECS)
resource "aws_security_group" "ecs" {
  name        = "${var.app_name}-ecs-security_group"
  description = "${var.app_name}-ecs-security_group"
  vpc_id      = var.vpc_id

  # インバウンドルール　
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.load-balancer.id]
  }

  # ポート 220 の ECS クラスターに関連付けられているセキュリティ グループのインバウンド ルールに注意してください。
  # これは、EC2 インスタンスに SSH 接続して、最初の DB 移行を実行し、スーパー ユーザーを追加できるようにするためです。
  # ingress {
  #   from_port   = 220
  #   to_port     = 220
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  # アウトバウンドルール
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-ecs"
  }
}
