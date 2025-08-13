###############################################################################
# EC2へは「ssh ec2-user@生成したElastic IPのアドレス」のコマンドでEC2へ接続できる。(ポートはデフォルトの22のみ接続可)
# EC2へ接続後はスーパーユーザーでpsqlコマンドを使えるようにするため、以下コマンドを打つ。
# sudo su -
# amazon-linux-extras install -y postgresql17
# その後、以下コマンドでRDS(Postgres)に接続
# psql -h <RDSエンドポイント> -U <ユーザ名> -d <DB名>
###############################################################################


#------------------------------------------
# EC2(踏み台サーバー)のセキュリティグループ作成
#------------------------------------------
resource "aws_security_group" "ec2_sg" {
  name        = "${var.app_name}-ec2-sg"
  description = "ec2 security group of ${var.app_name}"

  vpc_id = var.vpc_id

  # インバウンドルール(ssh)
  # EC2でssh接続の際、ポートを22以外に変更したい場合、手動であればsshd_configを変更すれば変えられるが、terraformではできないっぽい。
  # 試しにingressのportを220に変更してssh接続したが、refuse connectionになり、接続拒否された。
  # 踏み台サーバーとしてここでは使っているからポート22でも良いが、セキュアにEC2をterraformで作成する場合、SSMエージェントをEC2作成時にインストールするようにして、
  # セッションマネージャで接続するようにした方が良い。
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # 本当はここは許可したIPアドレスのみに制限した方がいい
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-ec2-sg"
  }
}

#------------------------------------------
# Elastic IP作成(踏み台EC2用)
#------------------------------------------
resource "aws_eip" "fumidai_ec2_eip" {
  vpc = true

  tags = {
    Name = "${var.app_name}-fumidai-ec2-eip"
  }
}

#------------------------------------------
# EC2インスタンス作成
#------------------------------------------
resource "aws_instance" "fumidai_ec2" {
  ami                    = data.aws_ssm_parameter.amazon2_latest_ami.value # Amazon Linux 2 の最新版AMIのID
  instance_type          = "t2.micro"
  key_name               = var.aws_key_pair_public_key_id # EC2に入るために上で作成した公開鍵の名前(id)
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  # 踏み台サーバーとしてEC2を１つだけ配置する(public_subnet_idsという配列から最初のpublic_subnet_idを取得)
  subnet_id                   = var.public_subnet_ids[0][0]
  associate_public_ip_address = true # インスタンスの起動時のパブリックIPアドレス割り当てを有効にする

  # OSがインストールされるボリューム
  root_block_device {
    volume_type = "gp2"
    volume_size = "8"
  }

  # root_block_device以外のボリューム(device_name (/dev/sdbとか)を変えて、複数作成可能)
  # ログなどが保管される
  ebs_block_device {
    device_name = "/dev/sdf"
    volume_type = "gp2"
    volume_size = "30" # ギガ数(30GBまでがEC2の無料利用枠対象のサイズ)
  }
  tags = {
    Name = "${var.app_name}-fumidai-ec2"
  }
}

#------------------------------------------
# Elastic IPをEC2(踏み台サーバー)にアタッチ
#------------------------------------------
resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.fumidai_ec2.id
  allocation_id = aws_eip.fumidai_ec2_eip.id
}
