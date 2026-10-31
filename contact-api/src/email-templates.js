'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Product email templates
//
// Each export is a function that receives { name, color, message }
// and returns { subject, html, plainText }.
//
// A template that still contains [PLACEHOLDER] text is disabled automatically (see getTemplate).
// Image URLs point to static/images/ on hitt.is — swap in better photos
// by adding them to static/images/ and updating the src= below.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_COLOR = '#0055FF';
const BASE_URL    = 'https://hitt.is';

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
        <a href="${BASE_URL}" style="color:#fff;font-size:22px;font-weight:700;text-decoration:none">hitt.is</a>
      </td></tr>

      <!-- Product image -->
      ${imgSrc ? `<tr><td><img src="${imgSrc}" alt="" width="520" style="display:block;width:100%;max-width:520px;height:220px;object-fit:cover"></td></tr>` : ''}

      <!-- Body -->
      <tr><td style="padding:32px">
        <p style="margin:0 0 16px;font-size:17px">Hæ <strong>${name}</strong>!</p>
        ${bodyHtml}
        <p style="margin:24px 0 0">Kveðja,<br><strong>Bensi @ hitt.is</strong></p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
        Þetta er sjálfvirk staðfesting. Til að hafa samband: <a href="mailto:bensi@hitt.is" style="color:${BRAND_COLOR}">bensi@hitt.is</a>
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
            'Bensi @ hitt.is',
        ].join('\n');

        return {
            subject: 'Upplýsingar um myndavélar — hitt.is',
            html: layout(name, `${BASE_URL}/images/hero-board.jpg`, body),
            plainText: plain,
        };
    },

    'Standur með myndavélafestingum':   (args) => festingTemplate('Standur með myndavélafestingum', args),
    'Hvítur ljósahringur':              (args) => festingTemplate('Hvítur ljósahringur', args),
    'WLED veggljós':                    (args) => festingTemplate('WLED veggljós', args),

    // ── Fullbúið Autodarts sett ──────────────────────────────────────────────
    'Fullbúið sett án myndavéla':      (args) => settTemplate(true, args),
    'Fullbúið sett með 3 myndavélum':  (args) => settTemplate(true, args),
    'Fullbúið sett án WLED':           (args) => settTemplate(false, args),

    // ── Bjórkassi ────────────────────────────────────────────────────────────
    'Bjórkassi með kælingu': (args) => bjorkassiTemplate(args),
    'Bjórkassi með kælingu, sérsniðnum texta og merki': (args) => bjorkassiTemplate(args),

};

// Shared template for the single parts of the Autodarts set
const FESTING_VARIANTS = {
    'Standur með myndavélafestingum': {
        heading: 'standinum með 3 myndavélum',
        subj: 'standinn með 3 myndavélum',
        price: '19.900 kr.',
        includes: ['3 standar með myndavélafestingum fyrir Autodarts', '3 × GXIVISION OV9732 myndavélar, tilbúnar fyrir Autodarts', 'Festast á ljósahringinn — passa á flesta ljósahringi', 'Allar skrúfur fylgja'],
    },
    'Hvítur ljósahringur': {
        heading: 'hvíta ljósahringnum',
        subj: 'hvíta ljósahringinn',
        price: '15.000 kr.',
        includes: ['Ljósahringur (6000K) sem lýsir spjaldið jafnt upp', 'Festist á myndavélafestingarnar', '12V aflgjafi fylgir'],
    },
    'WLED veggljós': {
        heading: 'WLED veggljósinu',
        subj: 'WLED veggljósið',
        price: '18.000 kr.',
        includes: ['RGB ljósahringur (WS2815) á bakvið standinn', 'WLED stýring — stýrt úr símanum', '12V aflgjafi fylgir'],
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
  Hluti af Autodarts settinu mínu, hannaður og prentaður af mér á Bambu Lab P1S og H2S — fáanlegur í öllum litum, víraður og prófaður. Samsettur ef þú sækir, annars sendur með samsetningarleiðbeiningum. Passar við aðra hluta settsins svo þú getur bætt við seinna.
</p>
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  ${v.includes.map(i => `<li>${i}</li>`).join('\n  ')}
</ul>`)}

${section('Verð', `
${priceTag(v.price)}
<p style="color:#555;line-height:1.6;margin-top:-8px">
  Ef þú tekur fleiri en einn hlut saman deila þeir einum aflgjafa og verðið lækkar. Sendingarkostnaður (Pósturinn eða Dropp) bætist við. Nákvæmt verð kemur í svari frá mér.
</p>`)}

${section('Næstu skref', steps([
    'Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
    'Þú staðfestir útfærslu og lit.',
    'Prentað og prófað fyrir þig — sótt samsett eftir samkomulagi, eða sent ósamsett með leiðbeiningum með Póstinum eða Dropp.',
]))}

<p style="color:#555;line-height:1.6">
  Myndir af uppsetningum: <a href="${BASE_URL}/verslun/darts/myndir/" style="color:${BRAND_COLOR}">hitt.is/verslun/darts/myndir</a>
</p>`;

    return {
        subject: `Upplýsingar um ${v.subj} — hitt.is`,
        html: layout(name, `${BASE_URL}/images/darts-sett/01-upplyst-spjald-800.webp`, body),
        plainText: [
            `Hæ ${name}!`,
            '',
            `Takk fyrir áhugann á ${v.heading}! Hér eru helstu upplýsingar á meðan ég tek saman nákvæmt verð og afhendingartíma.`,
            '',
            color ? `Litur: ${color}` : null,
            `Verð: ${v.price} Fleiri hlutar saman deila einum aflgjafa og verðið lækkar. Sendingarkostnaður bætist við.`,
            '',
            'Innifalið:',
            ...v.includes.map(i => `- ${i}`),
            '',
            'Næstu skref:',
            '1. Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
            '2. Þú staðfestir útfærslu og lit.',
            '3. Prentað fyrir þig og sent með Póstinum eða Dropp, eða sótt eftir samkomulagi.',
            '',
            `Myndir: ${BASE_URL}/verslun/darts/myndir/`,
            '',
            'Kveðja,',
            'Bensi @ hitt.is',
        ].filter(l => l !== null).join('\n'),
    };
}

// Shared template for the complete, assembled Autodarts set (cameras always included, with or without WLED)
function settTemplate(withWled, { name, color }) {
    const price = withWled ? 'frá 49.900 kr.' : 'frá 45.000 kr.';
    const variant = withWled ? 'með 3 myndavélum' : 'án WLED, með 3 myndavélum';
    const includes = [
        'Standur með 3 myndavélafestingum fyrir Autodarts',
        'Hvítur ljósahringur (6000K) sem lýsir spjaldið jafnt upp',
        ...(withWled ? ['WLED RGB veggljós (WS2815, 12V) á bakvið — stýrt úr WLED appinu', '12V aflgjafi, WLED stýring og allar skrúfur'] : ['12V aflgjafi og allar skrúfur']),
        '3 × GXIVISION OV9732 myndavélar, tilbúnar fyrir Autodarts',
    ];
    const colorNote = color ? `<p style="color:#555">Þú óskaðir eftir lit: <strong>${color}</strong> — settið er prentað í þeim lit sem þú velur.</p>` : '';
    const body = `
<p style="margin:0 0 16px;color:#555;line-height:1.6">
  Takk fyrir áhugann á fullbúna Autodarts settinu (${variant})! Hér eru helstu upplýsingar á meðan ég tek saman nákvæmt verð og afhendingartíma fyrir þig.
</p>

${colorNote}

${section('Hvað fylgir með', `
<ul style="padding-left:20px;margin:8px 0 16px;color:#555;line-height:1.6">
  ${includes.map(i => `<li>${i}</li>`).join('\n  ')}
</ul>
<p style="color:#555;line-height:1.6">
  Settið kemur <strong>vírað og prófað</strong>. Ef þú sækir það er það samsett — þú skrúfar það á vegginn með 4 skrúfum og tengir í innstungu. Ef það er sent kemur það ósamsett með <a href="${BASE_URL}/verslun/darts/samsetning/" style="color:${BRAND_COLOR}">samsetningarleiðbeiningum</a> — bara skrúfur og tengi, engin lóðun.
</p>`)}

${section('Verð', `
${priceTag(price)}
<p style="color:#555;line-height:1.6;margin-top:-8px">
  Sendingarkostnaður (Pósturinn eða Dropp) bætist við, eða sótt eftir samkomulagi. Nákvæmt verð kemur í svari frá mér.
</p>`)}

${section('Næstu skref', steps([
    'Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
    'Þú staðfestir útfærslu og lit.',
    'Settið er prentað, vírað og prófað — sótt samsett eftir samkomulagi, eða sent ósamsett með leiðbeiningum með Póstinum eða Dropp.',
]))}

<p style="color:#555;line-height:1.6">
  Myndir og myndband: <a href="${BASE_URL}/verslun/darts/fullbuid-sett/" style="color:${BRAND_COLOR}">hitt.is/verslun/darts/fullbuid-sett</a>
</p>`;

    return {
        subject: `Upplýsingar um fullbúið Autodarts sett — hitt.is`,
        html: layout(name, `${BASE_URL}/images/darts-sett/01-upplyst-spjald-800.webp`, body),
        plainText: [
            `Hæ ${name}!`,
            '',
            `Takk fyrir áhugann á fullbúna Autodarts settinu (${variant})! Hér eru helstu upplýsingar á meðan ég tek saman nákvæmt verð og afhendingartíma.`,
            '',
            color ? `Litur: ${color}` : null,
            `Verð: ${price} Sendingarkostnaður bætist við.`,
            '',
            'Hvað fylgir með:',
            ...includes.map(i => `- ${i}`),
            '',
            `Settið kemur vírað og prófað. Sótt: samsett, skrúfað á vegginn með 4 skrúfum. Sent: ósamsett með leiðbeiningum (${BASE_URL}/verslun/darts/samsetning/).`,
            '',
            'Næstu skref:',
            '1. Ég sendi þér nákvæmt verð og áætlaðan afhendingartíma, yfirleitt innan 1–2 daga.',
            '2. Þú staðfestir útfærslu og lit.',
            '3. Settið er prentað, vírað og prófað — sótt samsett, eða sent ósamsett með leiðbeiningum með Póstinum eða Dropp.',
            '',
            `Myndir og myndband: ${BASE_URL}/verslun/darts/fullbuid-sett/`,
            '',
            'Kveðja,',
            'Bensi @ hitt.is',
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
  Fleiri myndir: <a href="${BASE_URL}/verslun/bjorkassi/myndir/" style="color:${BRAND_COLOR}">hitt.is/verslun/bjorkassi/myndir</a>
</p>`;

    return {
        subject: 'Upplýsingar um bjórkassann með kælingu — hitt.is',
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
            'Bensi @ hitt.is',
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
