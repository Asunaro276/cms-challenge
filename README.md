# このプロジェクトの目的
- 複数の言語でCMS APIを作成することでWEB開発に対する知見を深める


# dockerとgolang-migrateを用いたdb migration
### データベース初期化
```
docker-compose up
```
### データベースのmigrateバージョンを1つ戻す
```
docker-compose run migrate down 1
```
### データベースのmigrateバージョンを1つ進める
```
docker-compose run migrate up 1
```
### migrateしたデータベースを削除
```
docker-compose run migrate drop -f
```
