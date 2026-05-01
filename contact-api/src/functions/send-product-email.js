'use strict';

const { app } = require('@azure/functions');
const { EmailClient } = require('@azure/communication-email');
const { getTemplate } = require('../email-templates');

app.storageQueue('sendProductEmail', {
    queueName: 'product-emails',
    connection: 'AzureWebJobsStorage',
    handler: async (queueItem, context) => {
        let data;
        try {
            const raw = Buffer.isBuffer(queueItem)
                ? queueItem.toString()
                : typeof queueItem === 'string'
                    ? Buffer.from(queueItem, 'base64').toString()
                    : JSON.stringify(queueItem);
            data = JSON.parse(raw);
        } catch {
            context.error('Failed to parse queue message:', queueItem);
            return;
        }

        const { name, email, product, color, message } = data;
        const tmpl = getTemplate(product);
        if (!tmpl) return;

        const t = tmpl({ name, color, message });
        const client = new EmailClient(process.env.COMMUNICATION_CONNECTION_STRING);
        const poller = await client.beginSend({
            senderAddress: 'DoNotReply@alit.is',
            recipients: { to: [{ address: email, displayName: name }] },
            content: {
                subject: t.subject,
                plainText: t.plainText,
                html: t.html,
            },
        });
        await poller.pollUntilDone();
        context.log(`Product email sent: ${product} → ${email}`);
    },
});
