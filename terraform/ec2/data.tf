# Amazon Linux 2 の最新版AMIを取得
data "aws_ssm_parameter" "amazon2_latest_ami" {
  name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"
}