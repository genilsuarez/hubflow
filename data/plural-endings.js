/**
 * Plural Endings Data — pronunciation of the plural -s: /s/ /z/ /ɪz/
 */

export const CATEGORIES = {
  pluralSound: {
    label: 'Which sound?',
    icon: '🔊',
    options: ['/s/', '/z/', '/ɪz/'],
    items: [
      { sentence: 'cats', correct: '/s/', explain: 'After voiceless consonants (p, t, k, f) → /s/.' },
      { sentence: 'dogs', correct: '/z/', explain: 'After voiced consonants and vowels → /z/.' },
      { sentence: 'buses', correct: '/ɪz/', explain: 'After sibilant sounds (s, z, sh, ch, ge) → an extra /ɪz/ syllable.' },
      { sentence: 'books', correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: 'cars', correct: '/z/', explain: '"R" is voiced → /z/.' },
      { sentence: 'watches', correct: '/ɪz/', explain: '"Ch" is a sibilant sound → /ɪz/.' },
      { sentence: 'cups', correct: '/s/', explain: '"P" is voiceless → /s/.' },
      { sentence: 'boys', correct: '/z/', explain: 'Vowel + voiced glide → /z/.' },
      { sentence: 'kisses', correct: '/ɪz/', explain: '"S" is a sibilant sound → /ɪz/.' },
      { sentence: 'chairs', correct: '/z/', explain: '"R" is voiced → /z/.' },
      { sentence: 'months', correct: '/s/', explain: '"Th" (voiceless) → /s/.' },
      { sentence: 'judges', correct: '/ɪz/', explain: '"Ge" is a sibilant sound → /ɪz/.' },
      { sentence: 'dreams', correct: '/z/', explain: '"M" is voiced → /z/.' },
      { sentence: 'plates', correct: '/s/', explain: '"T" is voiceless → /s/.' },
      { sentence: 'roses', correct: '/ɪz/', explain: '"S" is a sibilant sound → /ɪz/.' },
      { sentence: 'laughs', correct: '/s/', explain: '"Gh" (pronounced /f/, voiceless) → /s/.' },
      { sentence: 'clocks', correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: 'trees', correct: '/z/', explain: 'Vowel + voiced ending → /z/.' },
      { sentence: 'balls', correct: '/z/', explain: '"L" is voiced → /z/.' },
      { sentence: 'pages', correct: '/ɪz/', explain: '"Ge" is a sibilant sound → /ɪz/.' }
    ]
  }
};
