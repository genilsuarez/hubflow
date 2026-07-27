/**
 * Plural Endings Data — pronunciation of the -s/-'s ending: /s/ /z/ /ɪz/
 * The same voicing rule governs plural nouns, third-person verbs, and possessives.
 */

export const CATEGORIES = {
  pluralNouns: {
    label: 'Plural Nouns',
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
  },
  thirdPersonVerbs: {
    label: 'Third-Person Verbs',
    icon: '🏃',
    options: ['/s/', '/z/', '/ɪz/'],
    items: [
      { sentence: 'he stops', correct: '/s/', explain: '"P" is voiceless → /s/.' },
      { sentence: 'she runs', correct: '/z/', explain: '"N" is voiced → /z/.' },
      { sentence: 'it watches', correct: '/ɪz/', explain: '"Ch" is a sibilant sound → /ɪz/.' },
      { sentence: 'he talks', correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: 'she plays', correct: '/z/', explain: 'Vowel + voiced ending → /z/.' },
      { sentence: 'it pushes', correct: '/ɪz/', explain: '"Sh" is a sibilant sound → /ɪz/.' },
      { sentence: 'he works', correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: 'she reads', correct: '/z/', explain: '"D" is voiced → /z/.' },
      { sentence: 'it teaches', correct: '/ɪz/', explain: '"Ch" is a sibilant sound → /ɪz/.' },
      { sentence: 'he laughs', correct: '/s/', explain: '"Gh" (pronounced /f/, voiceless) → /s/.' },
      { sentence: 'she sings', correct: '/z/', explain: '"Ng" is voiced → /z/.' },
      { sentence: 'it kisses', correct: '/ɪz/', explain: '"S" is a sibilant sound → /ɪz/.' },
      { sentence: 'he sleeps', correct: '/s/', explain: '"P" is voiceless → /s/.' },
      { sentence: 'she drives', correct: '/z/', explain: '"V" is voiced → /z/.' },
      { sentence: 'it fixes', correct: '/ɪz/', explain: '"X" ends in a sibilant /ks/ sound → /ɪz/.' },
      { sentence: 'he helps', correct: '/s/', explain: '"P" is voiceless → /s/.' },
      { sentence: 'she loves', correct: '/z/', explain: '"V" is voiced → /z/.' },
      { sentence: 'it changes', correct: '/ɪz/', explain: '"Ge" is a sibilant sound → /ɪz/.' },
      { sentence: 'he walks', correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: 'she calls', correct: '/z/', explain: '"L" is voiced → /z/.' }
    ]
  },
  possessives: {
    label: "Possessive 's",
    icon: '🔑',
    options: ['/s/', '/z/', '/ɪz/'],
    items: [
      { sentence: "the cat's toy", correct: '/s/', explain: '"T" is voiceless → /s/.' },
      { sentence: "the dog's bone", correct: '/z/', explain: '"G" is voiced → /z/.' },
      { sentence: "the boss's office", correct: '/ɪz/', explain: '"Ss" is a sibilant sound → /ɪz/.' },
      { sentence: "the book's cover", correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: "the girl's bag", correct: '/z/', explain: '"L" is voiced → /z/.' },
      { sentence: "the judge's decision", correct: '/ɪz/', explain: '"Ge" is a sibilant sound → /ɪz/.' },
      { sentence: "the cook's hat", correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: "the teacher's desk", correct: '/z/', explain: '"R" is voiced → /z/.' },
      { sentence: "the church's bell", correct: '/ɪz/', explain: '"Ch" is a sibilant sound → /ɪz/.' },
      { sentence: "the duck's feathers", correct: '/s/', explain: '"K" is voiceless → /s/.' },
      { sentence: "the car's engine", correct: '/z/', explain: '"R" is voiced → /z/.' },
      { sentence: "the prince's crown", correct: '/ɪz/', explain: '"Ce" is a sibilant sound → /ɪz/.' },
      { sentence: "the pilot's uniform", correct: '/s/', explain: '"T" is voiceless → /s/.' },
      { sentence: "the bird's nest", correct: '/z/', explain: '"D" is voiced → /z/.' },
      { sentence: "the horse's tail", correct: '/ɪz/', explain: '"Se" is a sibilant sound → /ɪz/.' },
      { sentence: "the shirt's color", correct: '/s/', explain: '"T" is voiceless → /s/.' },
      { sentence: "the queen's crown", correct: '/z/', explain: '"N" is voiced → /z/.' },
      { sentence: "the fox's den", correct: '/ɪz/', explain: '"X" ends in a sibilant /ks/ sound → /ɪz/.' },
      { sentence: "the chief's plan", correct: '/s/', explain: '"F" is voiceless → /s/.' },
      { sentence: "the king's castle", correct: '/z/', explain: '"Ng" is voiced → /z/.' }
    ]
  }
};
