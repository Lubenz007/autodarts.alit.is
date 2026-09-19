'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Product email templates
//
// Each export is a function that receives { name, color, message }
// and returns { subject, html, plainText }.
//
// A template that still contains [PLACEHOLDER] text is disabled automatically (see getTemplate).
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

${section('Verð', `
${priceTag('8.000 kr.')}
<p style="color:#555;line-height:1.6;margin-top:-8px">Fyrir settið (3 myndavélar). Sendingarkostnaður (Pósturinn eða Dropp) bætist við.</p>`)}

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
            'VERÐ: 8.000 kr. fyrir settið (3 myndavélar). Sendingarkostnaður bætist við.',
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

    'Myndavélafesting':                             (args) => festingTemplate('Myndavélafesting', args),
    'Myndavélafesting með LED hring':               (args) => festingTemplate('Myndavélafesting með LED hring', args),
    'Myndavélafesting með LED hring og bakplötu':   (args) => festingTemplate('Myndavélafesting með LED hring og bakplötu', args),

    // ── Bjórkassi ────────────────────────────────────────────────────────────
    'Bjórkassi með kælingu': (args) => bjorkassiTemplate(args),
    'Bjórkassi með kælingu, sérsniðnum texta og merki': (args) => bjorkassiTemplate(args),

};

// Shared template for the three camera-mount variants
const FESTING_VARIANTS = {
    'Myndavélafesting': {
        heading: 'myndavélafestingu',
        includes: ['3D prentuð festing fyrir þrjár Autodarts myndavélar'],
    },
    'Myndavélafesting með LED hring': {
        heading: 'myndavélafestingu með LED hring',
        includes: ['3D prentuð festing fyrir þrjár Autodarts myndavélar', 'LED hringur sem lýsir jafnt á borðið'],
    },
    'Myndavélafesting með LED hring og bakplötu': {
        heading: 'myndavélafestingu með LED hring og bakplötu',
        includes: ['3D prentuð festing fyrir þrjár Autodarts myndavélar', 'LED hringur sem lýsir jafnt á borðið', 'Bakplata á bak við borðið'],
    },
};

function festingTemplate(product, { name, color }) {
    const v = FESTING_VARIANTS[product];
    const colorNote = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong> — festingin er prentuð í þeim lit sem þú velur.</p>` : '';
    const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á ${v.heading}! Hér eru helstu upplýsingar á meðan ég tek saman nákvæmt verð og afhendingartíma fyrir þig.
</p>

${colorNote}

${section('Um vöruna', `
<p style="color:#555;line-height:1.6">
  Sérsniðin lausn fyrir Autodarts uppsetningu, hönnuð og prentuð af mér á Bambu Lab P1S og H2S — fáanleg í öllum litum.
</p>
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  ${v.includes.map(i => `<li>${i}</li>`).join('\n  ')}
</ul>
<p style="color:#555;line-height:1.6">
  Vantar þig myndavélar líka? Ég sel <strong>GXIVISION OV9732</strong> sett (3 stk., tilbúið fyrir Autodarts) á 8.000 kr. — nefndu það í svari.
</p>`)}

${section('Verð', `
${priceTag('20.000–49.000 kr.')}
<p style="color:#555;line-height:1.6;margin-top:-8px">
  Endanlegt verð fer eftir útfærslu — festing, LED hringur og bakplata. Sendingarkostnaður (Pósturinn eða Dropp) bætist við. Nákvæmt verð kemur í svari frá mér.
</p>`)}

${section('Næstu skref', steps([
    'Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
    'Þú staðfestir útfærslu og lit.',
    'Prentað sérstaklega fyrir þig og sent með Póstinum eða Dropp — eða sótt eftir samkomulagi.',
]))}

<p style="color:#555;line-height:1.6">
  Myndir af uppsetningum: <a href="${BASE_URL}/verslun/darts/myndir/" style="color:${BRAND_COLOR}">alit.is/verslun/darts/myndir</a>
</p>`;

    return {
        subject: `Upplýsingar um ${v.heading} — alit.is`,
        html: layout(name, `${BASE_URL}/images/hero-ring.jpg`, body),
        plainText: [
            `Hæ ${name}!`,
            '',
            `Takk fyrir áhugann á ${v.heading}! Hér eru helstu upplýsingar á meðan ég tek saman nákvæmt verð og afhendingartíma.`,
            '',
            color ? `Litur: ${color}` : null,
            'Verð: 20.000–49.000 kr. eftir útfærslu (festing, LED hringur, bakplata). Sendingarkostnaður bætist við.',
            '',
            'Innifalið:',
            ...v.includes.map(i => `- ${i}`),
            '',
            'Vantar þig myndavélar líka? GXIVISION OV9732 sett (3 stk., tilbúið fyrir Autodarts) á 8.000 kr.',
            '',
            'Næstu skref:',
            '1. Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
            '2. Þú staðfestir útfærslu og lit.',
            '3. Prentað fyrir þig og sent með Póstinum eða Dropp, eða sótt eftir samkomulagi.',
            '',
            `Myndir: ${BASE_URL}/verslun/darts/myndir/`,
            '',
            'Kveðja,',
            'Bensi @ alit.is',
        ].filter(l => l !== null).join('\n'),
    };
}

// Shared template for both Bjórkassi variants
function bjorkassiTemplate({ name, color, handleText }) {
    const colorNote  = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong>. Svartur er til á lager — aðra liti panta ég inn og læt þig vita um afhendingartíma.</p>` : '';
    const handleNote = handleText
        ? `<p style="color:#555">Texti á handfang: <strong>${handleText}</strong> — ég staðfesti í svarinu að hann passi (allt að 14 stafir fer alltaf).</p>`
        : `<p style="color:#555">Ef þú vilt sérsniðinn texta á handfangið (allt að 14 stafir) skaltu senda mér hann í svari við þessum pósti.</p>`;
    const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á bjórkassanum með kælingu! Hér eru helstu upplýsingar á meðan ég tek saman verð og afhendingartíma fyrir þig.
</p>

${colorNote}
${handleNote}

${section('Um vöruna', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  <li><strong>Kæling:</strong> 3 dósa kælikubbur <strong>fylgir með</strong> og situr í miðjunni, á milli dósaraðanna, svo báðar raðir haldast kaldar.</li>
  <li>Pláss fyrir <strong>6 dósir</strong> (330 ml), 3 + 3, með kælikubbinn í miðjunni.</li>
  <li><strong>Sérsniðinn texti</strong> á handfangi og <strong>þitt merki</strong> framan á kassanum.</li>
  <li>Prentaður úr sterku <strong>PETG</strong> sem þolir sól, raka og högg — hentar úti á palli, í útilegu og á vellinum.</li>
  <li>Opið mynstur á hliðum: léttur, og dósirnar sjást.</li>
</ul>`)}

${section('Verð', `
${priceTag('7.900–9.800 kr.')}
<p style="color:#555;line-height:1.6;margin-top:-8px">
  Endanlegt verð fer eftir útfærslu — lit, texta og merki. Sendingarkostnaður (Pósturinn eða Dropp) bætist við. Nákvæmt verð kemur í svari frá mér.
</p>`)}

${section('Merkið þitt', `
<p style="color:#555;line-height:1.6">
  Sendu mér merkið sem þú vilt hafa framan á kassanum með því að <strong>svara þessum pósti</strong> — helst sem PNG eða SVG með gegnsæjum bakgrunni.
  Einfalt merki með fáum litum kemur best út í prentun.
</p>`)}

${section('Næstu skref', steps([
    'Ég sendi þér verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
    'Þú staðfestir lit, texta og merki.',
    'Kassinn er prentaður sérstaklega fyrir þig og sendur með Póstinum eða Dropp — eða sóttur eftir samkomulagi.',
]))}

<p style="color:#555;line-height:1.6">
  Fleiri myndir: <a href="${BASE_URL}/verslun/bjorkassi/myndir/" style="color:${BRAND_COLOR}">alit.is/verslun/bjorkassi/myndir</a>
</p>`;

    return {
        subject: 'Upplýsingar um bjórkassann með kælingu — alit.is',
        html: layout(name, `${BASE_URL}/images/bjorkassi-hero.webp`, body),
        plainText: [
            `Hæ ${name}!`,
            '',
            'Takk fyrir áhugann á bjórkassanum með kælingu! Hér eru helstu upplýsingar á meðan ég tek saman verð og afhendingartíma.',
            '',
            color ? `Litur: ${color} (svartur er til á lager, aðra liti panta ég inn)` : null,
            handleText ? `Texti á handfang: ${handleText}` : 'Sérsniðinn texti á handfang: allt að 14 stafir — sendu mér hann í svari.',
            '',
            'Verð: 7.900–9.800 kr. eftir útfærslu (litur, texti, merki). Sendingarkostnaður bætist við.',
            '',
            'Um vöruna:',
            '- Kæling: 3 dósa kælikubbur fylgir með og situr í miðjunni svo báðar raðir haldast kaldar',
            '- Pláss fyrir 6 dósir (330 ml), 3 + 3',
            '- Sérsniðinn texti á handfangi og þitt merki framan á',
            '- Sterkt PETG sem þolir sól, raka og högg',
            '',
            'Merkið þitt: svaraðu þessum pósti með merkinu (PNG eða SVG með gegnsæjum bakgrunni).',
            '',
            'Næstu skref:',
            '1. Ég sendi þér verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
            '2. Þú staðfestir lit, texta og merki.',
            '3. Kassinn er prentaður fyrir þig og sendur með Póstinum eða Dropp, eða sóttur eftir samkomulagi.',
            '',
            `Fleiri myndir: ${BASE_URL}/verslun/bjorkassi/myndir/`,
            '',
            'Kveðja,',
            'Bensi @ alit.is',
        ].filter(l => l !== null).join('\n'),
    };
}

// Returns the template for the selected product, or null if no template exists
// (null = only the generic "takk" confirmation is sent).
// Templates that still contain [PLACEHOLDER] text are treated as unfinished and
// disabled automatically — finish the text and they switch on by themselves.
function getTemplate(product) {
    const tmpl = templates[product];
    if (!tmpl) return null;
    const probe = tmpl({ name: 'x', color: '', handleText: '', message: '' });
    if (/\[PLACEHOLDER/.test(probe.html + probe.plainText)) return null;
    return tmpl;
}

module.exports = { getTemplate };
