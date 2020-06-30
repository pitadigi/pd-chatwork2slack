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

