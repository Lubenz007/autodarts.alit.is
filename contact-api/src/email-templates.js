'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Product email templates
//
// Each export is a function that receives { name, color, message }
// and returns { subject, html, plainText }.
//
// Edit the text between the [PLACEHOLDER] markers to add your real content.
// Image URLs point to static/images/ on alit.is — swap in better photos
// by adding them to static/images/ and updating the src= below.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_COLOR = '#0055FF';
const BASE_URL    = 'https://alit.is';

function layout(name, imgSrc, bodyHtml) {
    return `<!DOCTYPE html>
<html lang="is">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">
  <tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;max-width:520px;width:100%">

      <!-- Header -->
      <tr><td style="background:${BRAND_COLOR};padding:24px 32px">
        <a href="${BASE_URL}" style="color:#fff;font-size:22px;font-weight:700;text-decoration:none">alit.is</a>
      </td></tr>

      <!-- Product image -->
      ${imgSrc ? `<tr><td><img src="${imgSrc}" alt="" width="520" style="display:block;width:100%;max-width:520px;height:220px;object-fit:cover"></td></tr>` : ''}

      <!-- Body -->
      <tr><td style="padding:32px">
        <p style="margin:0 0 16px;font-size:17px">Hæ <strong>${name}</strong>!</p>
        ${bodyHtml}
        <p style="margin:24px 0 0">Kveðja,<br><strong>Bensi @ alit.is</strong></p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
        Þetta er sjálfvirk staðfesting. Til að hafa samband: <a href="mailto:bensi@alit.is" style="color:${BRAND_COLOR}">bensi@alit.is</a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

function priceTag(price) {
    return `<p style="font-size:22px;font-weight:700;color:${BRAND_COLOR};margin:16px 0">${price}</p>`;
}

function steps(items) {
    const lis = items.map(s => `<li style="margin-bottom:8px">${s}</li>`).join('');
    return `<ol style="padding-left:20px;margin:8px 0 16px;line-height:1.6">${lis}</ol>`;
}

function section(heading, content) {
    return `<h3 style="margin:24px 0 8px;font-size:15px;color:#333;border-bottom:1px solid #eee;padding-bottom:6px">${heading}</h3>${content}`;
}

// ─────────────────────────────────────────────────────────────────────────────

const templates = {

    'Eingöngu myndavélar': ({ name }) => {
        const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á myndavélum! Hér eru allar upplýsingar um sett sem við bjóðum upp á.
</p>

${section('Um vöruna', `
<p style="color:#555;line-height:1.6">
  Við seljum <strong>GXIVISION OV9732</strong> myndavélar — 3 stk. í setti sem er tilbúið fyrir Autodarts.
  Allar myndavélarnar eru með nýjasta Autodarts DIY Cam fastbúnaðinn (firmware) og hýsingin hefur verið fjarlægð
  svo þær passi beint í festingarnar.
</p>
<p style="color:#555;line-height:1.6">
  <strong>Eitt USB tengi — þrjár myndavélar.</strong> Hér þarf ekkert flókið uppsett,
  allar þrjár ganga í eitt USB tengi (með deili).
</p>`)}

${section('Verð', priceTag('[PLACEHOLDER — verð]'))}

${section('Hvað fylgir með', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  <li>3 × GXIVISION OV9732 myndavélar (32mm × 32mm)</li>
  <li>USB snúrur (2m og 1m fylgja með)</li>
  <li>Autodarts DIY Cam fastbúnaður foruppsettur</li>
  <li>Hýsing fjarlægð — tilbúið til uppsetningar</li>
</ul>`)}

${section('Tæknilegar upplýsingar', `
<table style="border-collapse:collapse;font-size:14px;color:#555;width:100%">
  <tr style="background:#f9f9f9"><td style="padding:6px 10px;font-weight:bold;white-space:nowrap">Skynjari</td><td style="padding:6px 10px">1MP OV9732</td></tr>
  <tr><td style="padding:6px 10px;font-weight:bold">Upplausn</td><td style="padding:6px 10px">1280 × 720 (720p)</td></tr>
  <tr style="background:#f9f9f9"><td style="padding:6px 10px;font-weight:bold">Rammar á sek.</td><td style="padding:6px 10px">MJPG 30fps · YUV 10fps</td></tr>
  <tr><td style="padding:6px 10px;font-weight:bold">Sjónarhorn</td><td style="padding:6px 10px">100° án bjögunar</td></tr>
  <tr style="background:#f9f9f9"><td style="padding:6px 10px;font-weight:bold">Tenging</td><td style="padding:6px 10px">USB · UVC · Plug &amp; Play · OTG</td></tr>
  <tr><td style="padding:6px 10px;font-weight:bold">Stýrikerfi</td><td style="padding:6px 10px">Windows · Mac · Linux · Android · Raspberry Pi</td></tr>
  <tr style="background:#f9f9f9"><td style="padding:6px 10px;font-weight:bold">Stærð</td><td style="padding:6px 10px">32mm × 32mm</td></tr>
</table>`)}

${section('Uppsetning', steps([
    'Tengið USB deili (hub) við tölvuna',
    'Tengið allar þrjár myndavélarnar við deilinn',
    'Opnið Autodarts — myndavélarnar greinast sjálfkrafa (enginn rekill nauðsynlegur)',
    '[PLACEHOLDER — fleiri skref ef við á, t.d. stillingar í Autodarts]',
]))}

<p style="color:#555;line-height:1.6">
  Ekki hika við að hafa samband ef þú hefur frekari spurningar.
</p>
`;

        const plain = [
            `Hæ ${name}!`,
            '',
            'Takk fyrir áhugann á myndavélum! Hér eru upplýsingar um GXIVISION OV9732 sett.',
            '',
            'HVAÐ FYLGIR MEÐ',
            '• 3 × GXIVISION OV9732 myndavél (32mm × 32mm)',
            '• USB snúrur (2m og 1m)',
            '• Autodarts DIY Cam firmware forbrunnið',
            '• Rammi fjarlægður',
            '',
            'TÆKNILEGAR UPPLÝSINGAR',
            '• Skynjari: 1MP OV9732',
            '• Upplausn: 1280×720 (720p) — 30fps MJPG',
            '• Sjónarhorn: 100° án skekju',
            '• Plug & Play, engin driver',
            '• Styður Windows, Mac, Linux, Android, Raspberry Pi',
            '',
            'Kveðja,',
            'Bensi @ alit.is',
        ].join('\n');

        return {
            subject: 'Upplýsingar um myndavélar — alit.is',
            html: layout(name, `${BASE_URL}/images/hero-board.jpg`, body),
            plainText: plain,
        };
    },

    'Myndavélafesting': ({ name, color }) => {
        const colorNote = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong>. Við getum prentað í þeim lit.</p>` : '';
        const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á myndavélafestingu! Hér eru allar upplýsingar.
</p>

${colorNote}

${section('Um vöruna', `
<p style="color:#555;line-height:1.6">
  [PLACEHOLDER — lýstu festingunni: efni, styrkur, hvernig hún passar o.s.frv.]
</p>`)}

${section('Verð', priceTag('[PLACEHOLDER — t.d. 5.500 kr.]'))}

${section('Uppsetning', steps([
    '[PLACEHOLDER — skref 1, t.d. festið festinguna á dartborðið]',
    '[PLACEHOLDER — skref 2, t.d. setjið myndavélina í festinguna]',
    '[PLACEHOLDER — skref 3, t.d. tengið USB snúru]',
]))}

${section('Samhæft við', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  <li>[PLACEHOLDER — t.d. Autodarts]</li>
  <li>[PLACEHOLDER — t.d. Darts for Windows]</li>
</ul>`)}

<p style="color:#555;line-height:1.6">
  Ef þú hefur fleiri spurningar skaltu ekki hika við að hafa samband.
</p>`;

        return {
            subject: 'Upplýsingar um myndavélafestingu — alit.is',
            html: layout(name, `${BASE_URL}/images/hero-board.jpg`, body),
            plainText: `Hæ ${name}!\n\nTakk fyrir áhugann á myndavélafestingu.\n\n[PLACEHOLDER — fylla inn efni]\n\nKveðja,\nBensi @ alit.is`,
        };
    },

    'Myndavélafesting með LED hring': ({ name, color }) => {
        const colorNote = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong>. Við getum prentað í þeim lit.</p>` : '';
        const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á myndavélafestingu með LED hring! Hér eru allar upplýsingar.
</p>

${colorNote}

${section('Um vöruna', `
<p style="color:#555;line-height:1.6">
  [PLACEHOLDER — lýstu festingunni og LED hringnum: birta, litir, hvernig hann eykur nákvæmni kerfisins o.s.frv.]
</p>`)}

${section('Verð', priceTag('[PLACEHOLDER — t.d. 7.500 kr.]'))}

${section('Hvað fylgir með', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  <li>[PLACEHOLDER — t.d. 3D prentuð festing]</li>
  <li>[PLACEHOLDER — t.d. LED hringur]</li>
  <li>[PLACEHOLDER — t.d. USB snúra fyrir LED]</li>
  <li>[PLACEHOLDER — t.d. uppsetningarleiðbeiningar]</li>
</ul>`)}

${section('Uppsetning', steps([
    '[PLACEHOLDER — skref 1]',
    '[PLACEHOLDER — skref 2]',
    '[PLACEHOLDER — skref 3]',
    '[PLACEHOLDER — skref 4, t.d. kveikið á LED hringnum]',
]))}

<p style="color:#555;line-height:1.6">
  Ef þú hefur fleiri spurningar skaltu ekki hika við að hafa samband.
</p>`;

        return {
            subject: 'Upplýsingar um myndavélafestingu með LED hring — alit.is',
            html: layout(name, `${BASE_URL}/images/hero-ring.jpg`, body),
            plainText: `Hæ ${name}!\n\nTakk fyrir áhugann á myndavélafestingu með LED hring.\n\n[PLACEHOLDER — fylla inn efni]\n\nKveðja,\nBensi @ alit.is`,
        };
    },

    'Myndavélafesting með LED hring og bakplötu': ({ name, color }) => {
        const colorNote = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong>. Við getum prentað í þeim lit.</p>` : '';
        const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á fullkominni myndavélafestingu með LED hring og bakplötu! Þetta er flottasta útgáfan okkar.
</p>

${colorNote}

${section('Um vöruna', `
<p style="color:#555;line-height:1.6">
  [PLACEHOLDER — lýstu fullkomna settinu: bakplatan, LED hringurinn, festingin og hvernig þau vinna saman]
</p>`)}

${section('Verð', priceTag('[PLACEHOLDER — t.d. 9.500 kr.]'))}

${section('Hvað fylgir með', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  <li>[PLACEHOLDER — t.d. 3D prentuð festing]</li>
  <li>[PLACEHOLDER — t.d. LED hringur]</li>
  <li>[PLACEHOLDER — t.d. bakplata]</li>
  <li>[PLACEHOLDER — t.d. allar skrúfur og festingar]</li>
  <li>[PLACEHOLDER — t.d. USB snúra]</li>
  <li>[PLACEHOLDER — t.d. uppsetningarleiðbeiningar]</li>
</ul>`)}

${section('Uppsetning', steps([
    '[PLACEHOLDER — skref 1, t.d. festið bakplötuna á dartborðið]',
    '[PLACEHOLDER — skref 2]',
    '[PLACEHOLDER — skref 3]',
    '[PLACEHOLDER — skref 4]',
    '[PLACEHOLDER — skref 5, t.d. prófið í Autodarts]',
]))}

${section('Af hverju bakplata?', `
<p style="color:#555;line-height:1.6">
  [PLACEHOLDER — útskýrðu kosti bakplötunnar: stöðugleiki, útlit, auðveld uppsetning o.s.frv.]
</p>`)}

<p style="color:#555;line-height:1.6">
  Ef þú hefur fleiri spurningar skaltu ekki hika við að hafa samband.
</p>`;

        return {
            subject: 'Upplýsingar um myndavélafestingu með LED hring og bakplötu — alit.is',
            html: layout(name, `${BASE_URL}/images/hero-led.jpg`, body),
            plainText: `Hæ ${name}!\n\nTakk fyrir áhugann á myndavélafestingu með LED hring og bakplötu.\n\n[PLACEHOLDER — fylla inn efni]\n\nKveðja,\nBensi @ alit.is`,
        };
    },

};

// Returns the template for the selected product, or null if no template exists
// (null = only the generic "takk" confirmation is sent)
function getTemplate(product) {
    return templates[product] ?? null;
}

module.exports = { getTemplate };
