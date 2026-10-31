'use strict';

const { app } = require('@azure/functions');
const { EmailClient } = require('@azure/communication-email');

const ALLOWED_ORIGINS = new Set(['https://hitt.is', 'https://www.hitt.is', 'https://alit.is', 'http://localhost:1313']);

function esc(s) {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://hitt.is',
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
            const handleText = p.get('handleText')?.trim().slice(0, 40) ?? '';
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
                handleText ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Texti á handfang</td><td>${esc(handleText)}</td></tr>` : '',
            ].filter(Boolean).join('\n');

            const html = `
<h2 style="color:#0055FF;font-family:sans-serif">Ný pöntun — hitt.is</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">${rows}</table>
${message ? `<h3 style="font-family:sans-serif">Skilaboð</h3><p style="font-family:sans-serif;white-space:pre-wrap">${esc(message)}</p>` : ''}
<hr style="margin-top:24px">
<small style="color:#888;font-family:sans-serif">Sent frá kassanum á hitt.is</small>`;

            const plain = [
                `Nafn: ${name}`,
                `Netfang: ${email}`,
                product ? `Vara: ${product}` : '',
                color   ? `Litur: ${color}`   : '',
                handleText ? `Texti á handfang: ${handleText}` : '',
                message ? `\nSkilaboð:\n${message}` : '',
            ].filter(Boolean).join('\n');

            const client = new EmailClient(process.env.COMMUNICATION_CONNECTION_STRING);

            // Kassinn sendir alla pöntunina (vörur, verð, afhendingu) í "message"
            const NEXT = 'Þú færð sendan póst fljótlega með afhendingartíma og greiðsluupplýsingum (millifærsla).';

            const confirmHtml = `
<div style="font-family:sans-serif;max-width:520px">
  <h2 style="color:#0055FF">Takk fyrir kaupin, ${esc(name)}!</h2>
  <p>Pöntunin þín er móttekin og <strong>varan fer nú í framleiðslu</strong>.</p>
  <p>${NEXT}</p>
  ${message ? `<h3>Pöntunin þín</h3><p style="white-space:pre-wrap;font-size:15px">${esc(message)}</p>` : ''}
  <p style="margin-top:24px">Kveðja,<br><strong>hitt.is</strong></p>
  <hr style="margin-top:32px">
  <small style="color:#888">Þetta er sjálfvirk kvittun. Vinsamlegast ekki svara þessum tölvupósti.</small>
</div>`;

            const confirmPlain = [
                `Takk fyrir kaupin, ${name}!`,
                '',
                'Pöntunin þín er móttekin og varan fer nú í framleiðslu.',
                NEXT,
                '',
                message,
                '',
                'Kveðja,\nhitt.is',
            ].join('\n');

            const sends = [
                // 1. Notify you
                client.beginSend({
                    senderAddress: 'DoNotReply@hitt.is',
                    recipients: { to: [{ address: 'bensi@hitt.is', displayName: 'Bensi' }] },
                    replyTo: [{ address: email, displayName: name }],
                    content: {
                        subject: `Pöntun: ${name}${product ? ` — ${product}` : ''}`,
                        plainText: plain,
                        html,
                    },
                }).then(p => p.pollUntilDone()),
                // 2. Kvittun til kaupanda
                client.beginSend({
                    senderAddress: 'DoNotReply@hitt.is',
                    recipients: { to: [{ address: email, displayName: name }] },
                    content: {
                        subject: 'Takk fyrir kaupin — hitt.is',
                        plainText: confirmPlain,
                        html: confirmHtml,
                    },
                }).then(p => p.pollUntilDone()),
            ];

            await Promise.all(sends);

            return { status: 200, headers, body: JSON.stringify({ ok: true }) };
        } catch (err) {
            context.error('contact fn error:', err);
            return { status: 500, headers, body: JSON.stringify({ ok: false, error: 'Eitthvað fór úrskeiðis. Reyndu aftur síðar.' }) };
        }
    },
});
