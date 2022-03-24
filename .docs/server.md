# denoでサーバ

<https://kreuzwerker.de/en/post/creating-a-simple-rest-api-in-deno>


# serverサイド選択肢

DBはawsに設置してるから、
そこにアクセスできれば何でもいいんだけど、
フロントaleph.jsだけだとあくせすできないっぽい。

ということで、サーバサイドを作成する必要がある。

最終的にはawsのlambdaで実装したいところではあるが、

とりあえずの検証・テスト環境として、ローカルでサーバサイドをデモしてもいいだろう。
あれ？その前提だとAleph.js+Vercelで動きそうじゃね。

# 経過

ローカル環境で、aleph.jsのapi側から無事に呼び出せた。
vercelのために、awsのDBのVPCをフルオープンにしてデプロイからのアクセスも確認
ということは、これはawsでコンテナしたほうがセキュアでは？
→金か。
