'use strict';

const { app } = require('@azure/functions');
const { EmailClient } = require('@azure/communication-email');

const ALLOWED_ORIGINS = new Set(['https://alit.is', 'http://localhost:1313']);

function esc(s) {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://alit.is',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
    };
}

app.http('contact', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const origin = request.headers.get('origin') ?? '';
        const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

        if (request.method === 'OPTIONS') {
            return { status: 204, headers };
        }

        try {
            const text = await request.text();
            const p = new URLSearchParams(text);

            // Honeypot — bots fill this hidden field, humans never see it
            if (p.get('_honey')) {
                return { status: 200, headers, body: JSON.stringify({ ok: true }) };
            }

            const name    = p.get('name')?.trim()    ?? '';
            const email   = p.get('email')?.trim()   ?? '';
            const product = p.get('product')          ?? '';
            const color   = p.get('color')?.trim()   ?? '';
            const message = p.get('message')?.trim() ?? '';

            if (!name || !email) {
                return { status: 400, headers, body: JSON.stringify({ ok: false, error: 'Nafn og netfang eru nauðsynleg.' }) };
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return { status: 400, headers, body: JSON.stringify({ ok: false, error: 'Ógilt netfang.' }) };
            }

            const rows = [
                `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Nafn</td><td>${esc(name)}</td></tr>`,
                `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Netfang</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>`,
                product ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Vara</td><td>${esc(product)}</td></tr>` : '',
                color   ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Litur</td><td>${esc(color)}</td></tr>` : '',
            ].filter(Boolean).join('\n');

            const html = `
<h2 style="color:#0055FF;font-family:sans-serif">Ný fyrirspurn — alit.is</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">${rows}</table>
${message ? `<h3 style="font-family:sans-serif">Skilaboð</h3><p style="font-family:sans-serif;white-space:pre-wrap">${esc(message)}</p>` : ''}
<hr style="margin-top:24px">
<small style="color:#888;font-family:sans-serif">Sent frá alit.is hafðu samband formi</small>`;

            const plain = [
                `Nafn: ${name}`,
                `Netfang: ${email}`,
                product ? `Vara: ${product}` : '',
                color   ? `Litur: ${color}`   : '',
                message ? `\nSkilaboð:\n${message}` : '',
            ].filter(Boolean).join('\n');

            const client = new EmailClient(process.env.COMMUNICATION_CONNECTION_STRING);

            const poller = await client.beginSend({
                senderAddress: `DoNotReply@alit.is`,
                recipients: { to: [{ address: 'bensi@alit.is', displayName: 'Bensi' }] },
                replyTo: [{ address: email, displayName: name }],
                content: {
                    subject: `Fyrirspurn: ${name}${product ? ` — ${product}` : ''}`,
                    plainText: plain,
                    html,
                },
            });
            await poller.pollUntilDone();

            return { status: 200, headers, body: JSON.stringify({ ok: true }) };
        } catch (err) {
            context.error('contact fn error:', err);
            return { status: 500, headers, body: JSON.stringify({ ok: false, error: 'Eitthvað fór úrskeiðis. Reyndu aftur síðar.' }) };
        }
    },
});
