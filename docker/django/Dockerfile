#=====================
# builder
#=====================
# Dockerマルチステージ ビルドを使用して、最終的なイメージ サイズを縮小している。
# このbuilderはPython wheelを構築するために使用される一時的なイメージ。
# その後、wheelは最終的なプロダクションイメージにコピーされ、builderイメージは破棄される。
# see: https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/#project-setup
FROM python:3.9-alpine as builder

# set work directory
WORKDIR /usr/src/tmp

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libpq

RUN pip install --upgrade pip

COPY ./app ./app
COPY ./account ./account
COPY ./config ./config
COPY ./manage.py ./manage.py
COPY ./seed.sh ./seed.sh


# install dependencies
COPY ./requirements/base.txt ./requirements/base.txt
COPY ./requirements/production.txt ./requirements/production.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/tmp/wheels -r ./requirements/base.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/tmp/wheels -r ./requirements/production.txt


#========================
# runner
#========================
FROM python:3.9-alpine

# create the app user
RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV APP_HOME=/poppie
RUN mkdir -p $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
WORKDIR $APP_HOME


# install dependencies
RUN apk update && apk add libpq
COPY --from=builder /usr/src/tmp/wheels /wheels
COPY --from=builder /usr/src/tmp/requirements/base.txt .
COPY --from=builder /usr/src/tmp/requirements/production.txt .
RUN pip install --no-cache /wheels/*


COPY ./docker/django/entrypoint.sh $APP_HOME/entrypoint.sh
# 結果を出力せずに直接ファイルを編集
RUN sed -i 's/\r$//g' $APP_HOME/entrypoint.sh
RUN chmod +x  $APP_HOME/entrypoint.sh

# copy project
# COPY . $APP_HOME
COPY ./app $APP_HOME/app
COPY ./account $APP_HOME/account
COPY ./config $APP_HOME/config
COPY ./manage.py $APP_HOME/manage.py
COPY ./seed.sh $APP_HOME/seed.sh

RUN chmod +x  $APP_HOME/seed.sh

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# change to the app user
USER app

# run entrypoint.prod.sh
# "$APP_HOME/entrypoint.sh"の書き方はエラーになる
ENTRYPOINT ["/poppie/entrypoint.sh"]
