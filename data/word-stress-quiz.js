/**
 * Word Stress Quiz Data — commonly mispronounced words by Spanish speakers
 */

export const CATEGORIES = {
  commonWords: {
    label: 'Everyday Words',
    icon: '🗣️',
    options: ['1st syllable', '2nd syllable', '3rd syllable'],
    items: [
      { sentence: 'comfortable', correct: '1st syllable', explain: 'COM-fter-ble — many learners wrongly stress the 2nd syllable.' },
      { sentence: 'especially', correct: '2nd syllable', explain: 'es-PESH-ally.' },
      { sentence: 'photography', correct: '2nd syllable', explain: 'pho-TOG-ra-phy (compare: PHOto, photoGRAPHic — stress moves!).' },
      { sentence: 'necessary', correct: '1st syllable', explain: 'NEC-es-sary.' },
      { sentence: 'development', correct: '2nd syllable', explain: 'de-VEL-op-ment.' },
      { sentence: 'vegetable', correct: '1st syllable', explain: 'VEDGE-ta-ble (only 3 syllables in fast speech).' },
      { sentence: 'interesting', correct: '1st syllable', explain: 'IN-tres-ting.' },
      { sentence: 'temperature', correct: '1st syllable', explain: 'TEM-pra-ture.' },
      { sentence: 'understand', correct: '3rd syllable', explain: 'un-der-STAND.' },
      { sentence: 'afternoon', correct: '3rd syllable', explain: 'af-ter-NOON.' },
      { sentence: 'engineer', correct: '3rd syllable', explain: 'en-gi-NEER.' },
      { sentence: 'important', correct: '2nd syllable', explain: 'im-POR-tant.' },
      { sentence: 'banana', correct: '2nd syllable', explain: 'ba-NA-na.' },
      { sentence: 'colleague', correct: '1st syllable', explain: 'COL-league.' },
      { sentence: 'guarantee', correct: '3rd syllable', explain: 'gua-ran-TEE.' },
      { sentence: 'chocolate', correct: '1st syllable', explain: 'CHOC-lit (only 2 syllables in fast speech).' },
      { sentence: 'computer', correct: '2nd syllable', explain: 'com-PU-ter.' },
      { sentence: 'establish', correct: '2nd syllable', explain: 'es-TAB-lish.' },
      { sentence: 'recommend', correct: '3rd syllable', explain: 're-com-MEND.' },
      { sentence: 'disagree', correct: '3rd syllable', explain: 'dis-a-GREE.' }
    ]
  },
  shiftingStress: {
    label: 'Stress-Shifting Families',
    icon: '🔀',
    options: ['1st syllable', '2nd syllable', '3rd syllable'],
    items: [
      { sentence: 'photograph', correct: '1st syllable', explain: 'PHO-to-graph — the root keeps the stress.' },
      { sentence: 'photographic', correct: '3rd syllable', explain: 'pho-to-GRAPH-ic — the "-ic" suffix pulls the stress onto itself.' },
      { sentence: 'economy', correct: '2nd syllable', explain: 'e-CON-o-my.' },
      { sentence: 'economic', correct: '3rd syllable', explain: 'e-co-NOM-ic — "-ic" shifts the stress forward.' },
      { sentence: 'democracy', correct: '2nd syllable', explain: 'de-MOC-ra-cy.' },
      { sentence: 'democratic', correct: '3rd syllable', explain: 'de-mo-CRAT-ic — "-ic" shifts the stress forward.' },
      { sentence: 'history', correct: '1st syllable', explain: 'HIS-to-ry.' },
      { sentence: 'historic', correct: '2nd syllable', explain: 'his-TOR-ic — "-ic" shifts the stress forward.' },
      { sentence: 'politics', correct: '1st syllable', explain: 'POL-i-tics.' },
      { sentence: 'political', correct: '2nd syllable', explain: 'po-LIT-i-cal — "-ical" shifts the stress forward.' },
      { sentence: 'industry', correct: '1st syllable', explain: 'IN-dus-try.' },
      { sentence: 'industrial', correct: '2nd syllable', explain: 'in-DUS-tri-al — "-ial" shifts the stress forward.' },
      { sentence: 'origin', correct: '1st syllable', explain: 'OR-i-gin.' },
      { sentence: 'original', correct: '2nd syllable', explain: 'o-RIG-i-nal — "-al" shifts the stress forward.' },
      { sentence: 'advantage', correct: '2nd syllable', explain: 'ad-VAN-tage.' },
      { sentence: 'advantageous', correct: '3rd syllable', explain: 'ad-van-TA-geous — "-eous" shifts the stress forward.' },
      { sentence: 'magic', correct: '1st syllable', explain: 'MA-gic.' },
      { sentence: 'magician', correct: '2nd syllable', explain: 'ma-GI-cian — "-ian" shifts the stress forward.' },
      { sentence: 'product', correct: '1st syllable', explain: 'PROD-uct.' },
      { sentence: 'production', correct: '2nd syllable', explain: 'pro-DUC-tion — "-ion" shifts the stress forward.' }
    ]
  },
  verbNounPairs: {
    label: 'Verb–Noun Stress Pairs',
    icon: '🔁',
    options: ['1st syllable', '2nd syllable'],
    items: [
      { sentence: 'record (noun)', correct: '1st syllable', explain: 'REC-ord (noun) — stress on first syllable.' },
      { sentence: 'record (verb)', correct: '2nd syllable', explain: 're-CORD (verb) — stress on second syllable.' },
      { sentence: 'permit (noun)', correct: '1st syllable', explain: 'PER-mit (noun) — the thing that allows you.' },
      { sentence: 'permit (verb)', correct: '2nd syllable', explain: 'per-MIT (verb) — to allow something.' },
      { sentence: 'present (noun/adj)', correct: '1st syllable', explain: 'PRE-sent — a gift, or being here.' },
      { sentence: 'present (verb)', correct: '2nd syllable', explain: 'pre-SENT — to give or show formally.' },
      { sentence: 'conflict (noun)', correct: '1st syllable', explain: 'CON-flict — a disagreement.' },
      { sentence: 'conflict (verb)', correct: '2nd syllable', explain: 'con-FLICT — to clash or contradict.' },
      { sentence: 'object (noun)', correct: '1st syllable', explain: 'OB-ject — a thing.' },
      { sentence: 'object (verb)', correct: '2nd syllable', explain: 'ob-JECT — to disagree or protest.' },
      { sentence: 'increase (noun)', correct: '1st syllable', explain: 'IN-crease — a rise in amount.' },
      { sentence: 'increase (verb)', correct: '2nd syllable', explain: 'in-CREASE — to make something larger.' },
      { sentence: 'export (noun)', correct: '1st syllable', explain: 'EX-port — goods sent abroad.' },
      { sentence: 'export (verb)', correct: '2nd syllable', explain: 'ex-PORT — to send goods abroad.' },
      { sentence: 'protest (noun)', correct: '1st syllable', explain: 'PRO-test — a demonstration.' },
      { sentence: 'protest (verb)', correct: '2nd syllable', explain: 'pro-TEST — to demonstrate against something.' },
      { sentence: 'impact (noun)', correct: '1st syllable', explain: 'IM-pact — an effect or collision.' },
      { sentence: 'impact (verb)', correct: '2nd syllable', explain: 'im-PACT — to affect or hit.' },
      { sentence: 'update (noun)', correct: '1st syllable', explain: 'UP-date — new information.' },
      { sentence: 'update (verb)', correct: '2nd syllable', explain: 'up-DATE — to bring something current.' }
    ]
  }
};
