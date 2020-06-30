import { AzureFunction, Context } from "@azure/functions"
import * as dotenv from 'dotenv';
const axios = require('axios').default;

import { ConfigFile } from '../common/config-file';
import { Config } from '../common/config';

const queueTrigger: AzureFunction = async function (context: Context, pdChatwork2SlackQueue: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
    }

    const payload: any = context.bindings.pdChatwork2SlackQueue;

    const configFile: ConfigFile = new ConfigFile();
    const configString = await configFile.getConfigFile(payload.webhook_setting_id + '.json');
    const config: Config = JSON.parse(configString);

    const message: any = {
        text: payload.webhook_event.body + ' - <https://www.chatwork.com/#!rid' + payload.webhook_event.room_id + '|詳しくはここをクリック>',
    };

    try {
        await axios.post(config.slack_webhook_url, message);
    }
    catch(e) {
        context.done('Can not send message to slack');
        return;
    }

    context.done();
};

export default queueTrigger;
