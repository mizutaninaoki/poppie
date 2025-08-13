# poppie 開発環境

### Docker Compose

```sh
$ docker compose up
```

### pipenv

```sh
$ pipenv shell
```

### バックエンド(Django) 起動

```sh
$ pipenv run start
```

### フロントエンド(Next.js) 起動

```sh
$ cd frontend
$ yarn dev
```

### テスト(pytest)

```sh
$ pytest
```

※ pipenv で作った仮想環境に入っていないとテストの実行はできません。

### テスト(Cypress)

```sh
$ cd frontend
$ yarn run cy:run:dev
```

### デプロイ

```sh
$ ./ecr_push.sh
$ cd terraform
$ terraform plan
$ terraform apply
```

### 初回デプロイのみ

```sh
# planのマスターデータをDBに作成しておく必要があるので、ECS Execでコンテナに入ってseedデータを作成する
$ aws ecs execute-command --task=【タスクID】 --interactive --cluster=【クラスター名】 --container=【コンテナ名】 --command /bin/sh
$ ./seed.sh
```
