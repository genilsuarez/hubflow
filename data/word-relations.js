/**
 * Word Relations — Data adapted for FlashcardEngine
 * Transforms opposites/synonyms pairs into the CATEGORIES format.
 * Each pair produces 2 flashcard items (a→b, b→a) for study variety,
 * but the `meaning` field holds the clean counterpart word so the
 * Match mode can pair term↔meaning correctly.
 */
import { PAIRS, SYNONYMS } from './opposites.js';

function pairsToItems(pairs, relation) {
  const symbol = relation === 'Opposite' ? '↔' : '≈';
  return pairs.flatMap(p => [
    { term: p.a, meaning: p.b, emoji: p.ea, pairEmoji: p.eb, pairTerm: p.b, relation: symbol, es: p.es, extra: `${relation}: ${p.a} ${symbol} ${p.b}` },
    { term: p.b, meaning: p.a, emoji: p.eb, pairEmoji: p.ea, pairTerm: p.a, relation: symbol, es: p.es, extra: `${relation}: ${p.a} ${symbol} ${p.b}` },
  ]);
}

export const CATEGORIES = {
  opposites: {
    label: '↔ Opposites',
    items: pairsToItems(PAIRS, 'Opposite'),
  },
  synonyms: {
    label: '≈ Synonyms',
    items: pairsToItems(SYNONYMS, 'Synonym'),
  },
};
