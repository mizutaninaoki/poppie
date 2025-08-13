#------------------------------------------
# local
#------------------------------------------
locals {
  name = "${var.app_name}-postgresql"
}

#------------------------------------------
# RDSのセキュリティグループを作成
#------------------------------------------
resource "aws_security_group" "db_sg" {
  name = "${var.app_name}-postgresql"
  description = "${local.name} security group(Allows inbound access from ECS only)"
  vpc_id      = var.vpc_id

  # インバウンド(RDSにはECSのセキュリティグループからのアクセスのみ許可)
  ingress {
    protocol        = "tcp"
    from_port       = var.db_port
    to_port         = var.db_port
    security_groups = [var.alb_security_group_ecs.id]
  }

  # アウトバウンド
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name} security group"
  }
}

#----------------------------------------------------------------------
# データベースを稼働させるサブネットをDBサブネットグループで定義(プライベートサブネット内)
#----------------------------------------------------------------------
resource "aws_db_subnet_group" "db_subnet_group" {
  name        = var.postgres_db
  description = "${var.postgres_db} subnet group"
  subnet_ids  = flatten([var.private_subnet_ids]) # RDSは作成済の２つのプライベートサブネット内にそれぞれ配置する
  tags = {
    Name = var.postgres_db
  }
}

#------------------------------------------
# RDSを作成
#------------------------------------------
resource "aws_db_instance" "postgres" {
  allocated_storage     = 20    # 割当ストレージ
  max_allocated_storage = 100   # 指定した容量まで自動的にスケールする。運用中の予期せぬストレージの枯渇を避けるために設置したほうがよい。
  storage_type          = "gp2" # ストレージタイプ(gp2(汎用SSDのEBSボリューム)を使用)
  # kms_key_id           = aws_kms_key.example.arn # KMSの鍵
  # storage_encrypted    = true # KMSの鍵を使用して暗号化するかどうか。必要であればコメント解除する。
  # 暗号化を手動で行う場合は以下記事参考
  # https://dev.classmethod.jp/articles/encrypt-unencrypted-rds-db-instance-ja/
  engine              = "postgres"    # DBデータベースエンジン
  engine_version      = "17.5"        # DBエンジンバージョン
  instance_class      = "db.t3.micro" # DBインスタンスサイズ
  # multi_az            = true        # マルチAZはtrue(異なるアベイラビリティゾーンのサブネットをaws_db_subnet_groupで指定しておかなければいけない)
  multi_az            = false         # マルチAZはtrue(異なるアベイラビリティゾーンのサブネットをaws_db_subnet_groupで指定しておかなければいけない)
  publicly_accessible = false         # publicly_accessibleをfalseにすると、VPC外からのアクセスを遮断する

  # バックアップ設定(RDSでは毎日バックアップが行われる。メンテナンス前にバックアップをとっておくと安心感が増す。)
  backup_window           = "09:00-09:30" # buckup_windowでバックアップのタイミングを指定。時間設定はUTCでしか指定できない。AM6:00〜6:30の間に毎日バックアップをとる。
  # backup_retention_period = 30            # 最大35日までバックアップ期間を設定可能
  backup_retention_period = 7            # 最大35日までバックアップ期間を設定可能

  # メンテナンス設定(RDSでは定期的にメンテナンスが行われる。)
  maintenance_window         = "mon:10:00-mon:10:30" # maintenance_windowでメンテナンスのタイミングを指定。時間設定はUTCでしか指定できない。メンテナンス自体にはOSやデータベースエンジンの更新が含まれ、メンテナンス自体を無効化することはできない。
  auto_minor_version_upgrade = false                 # 自動マイナーバージョンアップだけはauto_minor_version_upgradeをfalseにすることで無効化できる。

  deletion_protection  = false # 削除保護をするかどうか (INFO: trueの場合、terraform destoryで削除できない。DBを削除する場合、一旦falseに変更してからDBを削除すること。)
  # skip_final_snapshot = false # DB削除時にスナップショットスキップするかどうか。falseにして作成するようにする。
  skip_final_snapshot = true # DB削除時にスナップショットスキップするかどうか。falseにして作成するようにする。
  final_snapshot_identifier = "poppie-final-snapshot-identifier" # skip_final_snapshotをfalseにする場合、final_snapshot_identifierを設定しないとRDSをterraformで削除するときエラーになる。(値には半角英語のハイフンしか使えない)
  apply_immediately = false # RDSの設定変更のタイミングには「即時」と「メンテナンスウィンドウ」がある。RDSでは一部の設定変更に再起動が伴い、予期せぬダウンタイムが起こり得る。そのため、apply_immediatelyをfalseにして即時反映を避ける。

  identifier = var.db_identifier # DBName must begin with a letter and contain only alphanumeric characters(半角英数字のみRDSの識別子に使用可能)
  db_name    = var.postgres_db
  username   = var.postgres_user     # マスターユーザー名
  password   = var.postgres_password # マスターパスワード
  port       = var.db_port  # postgresqlのポート番号

  vpc_security_group_ids = [aws_security_group.db_sg.id]            # セキュリティーグループ
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name # DBサブネットグループ
}
