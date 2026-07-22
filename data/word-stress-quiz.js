/**
 * Word Stress Quiz Data — commonly mispronounced words by Spanish speakers
 */

export const CATEGORIES = {
  stress: {
    label: 'Which syllable is stressed?',
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
  }
};
