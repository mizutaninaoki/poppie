# poppie開発環境

### Docker Compose
```sh
$ docker-compose up
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
※ pipenvで作った仮想環境に入っていないとテストの実行はできません。

### テスト(Cypress)
```sh
$ cd frontend
$ yarn run cy:run:dev
```