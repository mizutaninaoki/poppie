# 2023/02/16時点最新バージョン1.23.3
FROM nginx:1.23.3
RUN apt-get update && \
    apt-get install -y apt-utils \
    locales && \
    echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8

# インクルード用のディレクトリ内に設定ファイルがあれば、最初に全て削除
RUN rm -f /etc/nginx/conf.d/*

# 初期状態の設定ファイルをコンテナのnginxへコピー
ADD ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/nginx/default-prod.conf /etc/nginx/conf.d/default-prod.conf

# ALBからnginxコンテナにアクセスできるように80番ポートを開けておく
# EXPOSE 80

# ビルド完了後にNginxを起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf