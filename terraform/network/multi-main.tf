# #------------------------------------------
# # VPC作成
# #------------------------------------------
# resource "aws_vpc" "vpc" {
#   cidr_block = var.vpc_cidr
#   # VPCの設定でenable_dns_hostnamesをtrueにしておくことことでVPC内からでもエンドポイントのドメイン名を解決できる。
#   enable_dns_hostnames = true

#   tags = {
#     Name = var.app_name
#   }
# }

# #------------------------------------------
# # Public Subnet作成(cidrの数だけ(ここでは2つ))
# #------------------------------------------
# resource "aws_subnet" "publics" {
#   # public_subnet_cidrs分、繰り返す
#   count = length(var.public_subnet_cidrs)

#   vpc_id = aws_vpc.vpc.id # 先程作成したvpc

#   availability_zone       = var.azs[count.index]
#   cidr_block              = var.public_subnet_cidrs[count.index]
#   map_public_ip_on_launch = true # サブネットで起動したインスタンスにパブリックIPの割り当てを許可する

#   tags = {
#     Name = "${var.app_name}-public-${var.azs_name[count.index]}"
#   }
# }

#------------------------------------------
# インターネットゲートウェイ作成(VPCとインターネット間で通信できるようにする)
#------------------------------------------
# resource "aws_internet_gateway" "this" {
#   vpc_id = aws_vpc.vpc.id # 紐付けるVPCのID

#   tags = {
#     Name = var.app_name
#   }
# }

#------------------------------------------
# Elastic IP作成
# (Elastic IPは固定のパブリックIPのこと。NATゲートウェイに付与する。)
#------------------------------------------
# resource "aws_eip" "nat" {
#   count = length(var.public_subnet_cidrs)

#   vpc = true

#   tags = {
#     Name = "${var.app_name}-natgw-${count.index}"
#   }
# }


#------------------------------------------
# NATゲートウェイをcidrの数だけ作成
# (NATゲートウェイをぞれぞれのパブリックサブネットに配置して、NATゲートウェイ経由でプライベートサブネットにアクセスできるようにする)
#------------------------------------------
# resource "aws_nat_gateway" "this" {
#   count = length(var.public_subnet_cidrs)

#   subnet_id     = element(aws_subnet.publics.*.id, count.index) # NATゲートウェイを作成するパブリックサブネットを指定。
#   allocation_id = element(aws_eip.nat.*.id, count.index)        # 先ほど作成したElastic IPをNATゲートウェイに付与する

#   tags = {
#     Name = "${var.app_name}-${count.index}"
#   }
# }

# #------------------------------------------
# # Public Subnetに関連づけるルートテーブル作成
# # ルートテーブルはVPCに作成する。(※ サブネットに作成するわけではない！)
# # ２つのパブリックサブネットのデフォルトの行き先は、どちらも次に定義するルートテーブルルールの通り、インターネットゲートウェイになるため、
# # パブリックサブネットのためのルートテーブルは１つで良い。
# # (プライベートサブネットの場合、各プライベートサブネットからの行き先はそれぞれのNATゲートウェイで、ルートテーブルのデフォルトの行き先はルートテーブルに１つしか定義できないため、
# # それぞれのプライベートサブネットからそれぞれ紐づくNATゲートウェイへのルートテーブルを２つ作成しなくてはならない)
# #------------------------------------------
# resource "aws_route_table" "public" {
#   vpc_id = aws_vpc.vpc.id # ルートテーブルを作成するVPCを指定

#   tags = {
#     Name = "${var.app_name}-public"
#   }
# }

# #-----------------------------------------------------
# # Public Subnetからインターネットゲートウェイへのルートを定義
# # ルートはルートテーブルの１レコードに該当する。
# # プライベートサブネットに設定するルートテーブルのため、デフォルトの行き先をインテーネットゲートウェイに指定して、インターネットへの通信を可能にしている。
# #-----------------------------------------------------
# resource "aws_route" "public" {
#   route_table_id         = aws_route_table.public.id    # ルート設定するルートテーブルID
#   destination_cidr_block = "0.0.0.0/0"                  # ルートの送信先
#   gateway_id             = aws_internet_gateway.this.id # インターネットゲートウェイのID
# }

# #-----------------------------------------------------
# # パブリック用のルートテーブル全てをPublic Subnetに関連付け
# # どのルートテーブルを使ってルーティングするかはサブネット単位で判断する。
# # VPC内に作成したルートテーブルをどのサブネットに適用する(関連づける)のかを定義している。
# #-----------------------------------------------------
# resource "aws_route_table_association" "public" {
#   count = length(var.public_subnet_cidrs)

#   # *.idでサブネットIdを配列を取得
#   subnet_id      = element(aws_subnet.publics.*.id, count.index) # それぞれのパブリックサブネットにルートテーブルを紐づける
#   route_table_id = aws_route_table.public.id                     # 紐付け対象のルートテーブルID
# }


# # ここから下、プライベートサブネットの作成
# #-----------------------------------------------------
# # Private Subnetをcidrの数だけ作成
# #-----------------------------------------------------
# resource "aws_subnet" "privates" {
#   count  = length(var.private_subnet_cidrs)
#   vpc_id = aws_vpc.vpc.id

#   availability_zone = var.azs[count.index]
#   cidr_block        = var.private_subnet_cidrs[count.index]

#   tags = {
#     Name = "${var.app_name}-private-${var.azs_name[count.index]}"
#   }
# }


#-----------------------------------------------------
# Private Subnetに関連づけるルートテーブルをcidrの数だけ作成
# ルートテーブルはVPCに作成する。(※ サブネットに作成するわけではない！)
# パブリックサブネットにはルートテーブルは１つだけでOKだったが、プライベートサブネットの場合、
# 各プライベートサブネットからの行き先はそれぞれのNATゲートウェイで、ルートテーブルのデフォルトの行き先はルートテーブルに１つしか定義できないため、
# それぞれのプライベートサブネットからそれぞれ紐づくNATゲートウェイへのルートテーブルを２つ作成しなくてはならない。
#-----------------------------------------------------
# resource "aws_route_table" "privates" {
#   count  = length(var.private_subnet_cidrs)
#   vpc_id = aws_vpc.vpc.id # 紐付けるVPCのID

#   tags = {
#     Name = "${var.app_name}-private-${count.index}"
#   }
# }

# #-----------------------------------------------------
# # Private SubnetからNATゲートウェイへのルートを追加(ルートテーブルにルートのレコード追加)
# # プライベートサブネット -> NATゲートウェイ(Elastic IPを持つ) -> インターネットゲートウェイの流れで通信して欲しいため、
# # プライベートサブネットのためのルートテーブル(2つ)にはそれぞれ関連づけるNATゲートウェイを指定したレコード(ルール)を追加。
# #-----------------------------------------------------
# resource "aws_route" "privates" {
#   count                  = length(var.private_subnet_cidrs)
#   destination_cidr_block = "0.0.0.0/0" # 0.0.0.0/0で全てのアクセスに対してのルートを設定

#   route_table_id = element(aws_route_table.privates.*.id, count.index) # ルートテーブルを作成する２つのプライベートサブネットを指定
#   nat_gateway_id = element(aws_nat_gateway.this.*.id, count.index)     # 紐づける２つのNATゲートウェイ
# }

#-----------------------------------------------------
# 全てのPrivate Subnetにルートテーブルを関連づける
# どのルートテーブルを使ってルーティングするかはサブネット単位で判断する。
# VPC内に作成したルートテーブルをどのサブネットに適用する(関連づける)のかを定義している。
#-----------------------------------------------------
# resource "aws_route_table_association" "privates" {
#   count = length(var.private_subnet_cidrs)

#   subnet_id      = element(aws_subnet.privates.*.id, count.index)      # それぞれのプライベートサブネットにルートテーブルを紐づける
#   route_table_id = element(aws_route_table.privates.*.id, count.index) # 紐付け対象のルートテーブルID
# }
