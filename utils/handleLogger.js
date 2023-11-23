import { IncomingWebhook } from "@slack/webhook";

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
  },
};
export default loggerStream;
