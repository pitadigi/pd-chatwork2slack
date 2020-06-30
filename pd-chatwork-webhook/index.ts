import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as dotenv from 'dotenv';
import { QueueClient } from '@azure/storage-queue';

import { ConfigFile } from '../common/config-file';
import { Config } from '../common/config';

/**
 * ChatworkのWebhookの仕様に沿って処理を行う(https://developer.chatwork.com/ja/webhook.html)
 * Webhook設定ID(body.webhook_seting_id).jsonファイルをconfig Blobから取得する
 * jsonファイルのchatwork_webhook_signatureと、リクエストヘッダ(X-ChatWorkWebhookSignature)を比較していれば
 * Storage キュー(pd-chatwork-webhook-queue)にリクエスト内容を保存する
 * 本処理では、エラーが発生しても200レスポンスを返す(Chatworkの仕様)
 * @param context 
 * @param req 
 */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
    }

    if (!req.body) {
        context.res = {
            status: 200,
            body: 'No body',
        };
        return;
    }

    const headerSignature = req.headers['x-chatworkwebhooksignature'];
    const settingId: string = req.body.webhook_setting_id;

    const configFile: ConfigFile = new ConfigFile();
    const configString: string = await configFile.getConfigFile(settingId + '.json');
    const config: Config = JSON.parse(configString);

    if (config.chatwork_webhook_signature !== headerSignature) {
        context.res = {
            status: 200,
            body: 'Invalid signature',
        };

        return;
    }

    const queueClient: QueueClient = new QueueClient(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.AZURE_STORAGE_QUEUE_NAME);
    const message = Buffer.from(JSON.stringify(req.body)).toString('base64');

    try {
        await queueClient.sendMessage(message);
    }
    catch(e) {
        context.res = {
            status: 200,
            body: 'Can not send message to storage queue',
        };
    }

    context.res = {
        status: 200,
    };

    return;
};

export default httpTrigger;
