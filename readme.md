# Chatworkに投稿されたメッセージをSlackに通知

ChatworkのWebhookと、SlackのImcomig Webhookを利用して、Chatworkに投稿されたメッセージをSlackに通知します。

## 動作環境

本プログラムは、Microsoft AzureのFunctionsで動作します。

## セットアップ方法

### VisualStudio Codeのインストール

VisualStudio Codeをダウンロードしてインストールします。

### Azure Functions拡張機能のインストール

VisualStudio Codeで、Azure Functionsの拡張機能をインストールします。

### npmパッケージのインストール

ソースをクローンしたフォルダで以下のコマンドを実行し、npmパッケージをインストールします。

```npm install```

### Functionsサービスの作成

Azure Portalにログインして、Functionsサービスを作成します。
Node.jsのv12で作成してください。
Functions、ストレージアカウントの名称は好きなものをつけてください。

### ストレージサービスの設定

ストレージアカウントに、コンテナとキューを作成します。
コンテナは「config」、キューは「queue」としてください。

### Functionsサービスの設定

作成したFunctionsサービスの構成-アプリケーションの設定で以下の値を設定します。

* AZURE_STORAGE_CONNECTION_STRING ･･･ ストレージアカウントへの接続文字列
* AZURE_STORAGE_CONFIG_CONTAINER_NAME ･･･ config
* AZURE_STORAGE_QUEUE_NAME ･･･　queue

### デプロイ

VisualStudio CodeのAzure Functions拡張機能で、作成したFunctionsサービスに対しデプロイします。

### ChatworkのWebhookの設定

サービス連携のWebhookで、Slackに通知したいルームのWebhookを作成します。
Webhook URLは、Functionsサービスの「pd-chatwork-webhook」のURLになります。
Azure Portalで、pd-chatwork-webhook関数のURLを取得して設定してください。
作成したWebhookの「Webhook設定ID」「トークン」をメモしておきます。

### SlackのImcoming hookの設定

SlackでImcoming hookを作成します。
Webhook URLをメモしておきます。

### 構成ファイルの作成

「<Chatwork Webhook設定ID>.json」という名称のテキストファイルを作成します。
Chatwork Webhook設定IDが、「1234」なら、「1234.json」となります。
テキストは以下のように設定してください。

```json
{
    "chatwork_webhook_token": "Chatwork Webhookのトークン",
    "slack_webhook_url": "Slack Webhook URL"
}
```

構成ファイルは、ストレージアカウントのconfigコンテナにアップロードします。

以上
