export const CATEGORIES = {
  teensVsTens: {
    label: "🔢 Teens vs Tens",
    items: [
      { term: "thirteen", ipa: "/ˌθɜːrˈtiːn/", es: "13", meaning: "Stress on the 2nd syllable (-TEEN)", emoji: "1️⃣3️⃣" },
      { term: "thirty", ipa: "/ˈθɜːrti/", es: "30", meaning: "Stress on the 1st syllable (THIR-)", emoji: "3️⃣0️⃣" },
      { term: "fourteen", ipa: "/ˌfɔːrˈtiːn/", es: "14", meaning: "Stress on the 2nd syllable (-TEEN)", emoji: "1️⃣4️⃣" },
      { term: "forty", ipa: "/ˈfɔːrti/", es: "40", meaning: "Stress on the 1st syllable (FOR-)", emoji: "4️⃣0️⃣" },
      { term: "fifteen", ipa: "/ˌfɪfˈtiːn/", es: "15", meaning: "Stress on the 2nd syllable (-TEEN)", emoji: "1️⃣5️⃣" },
      { term: "fifty", ipa: "/ˈfɪfti/", es: "50", meaning: "Stress on the 1st syllable (FIF-)", emoji: "5️⃣0️⃣" },
      { term: "sixteen", ipa: "/ˌsɪkˈstiːn/", es: "16", meaning: "Stress on the 2nd syllable (-TEEN)", emoji: "1️⃣6️⃣" },
      { term: "sixty", ipa: "/ˈsɪksti/", es: "60", meaning: "Stress on the 1st syllable (SIX-)", emoji: "6️⃣0️⃣" },
      { term: "seventeen", ipa: "/ˌsɛvənˈtiːn/", es: "17", meaning: "Stress on the 2nd syllable (-TEEN)", emoji: "1️⃣7️⃣" },
      { term: "seventy", ipa: "/ˈsɛvənti/", es: "70", meaning: "Stress on the 1st syllable (SEV-)", emoji: "7️⃣0️⃣" },
    ]
  },
  datesPrices: {
    label: "📅 Dates & Prices",
    items: [
      { term: "1990", ipa: "/naɪnˈtiːn ˈnaɪnti/", es: "1990", meaning: "Years split into two 2-digit numbers: nineteen ninety", emoji: "📅" },
      { term: "2005", ipa: "/tuː ˈθaʊzənd ənd faɪv/", es: "2005", meaning: "Years 2000-2009: 'two thousand and five'", emoji: "📅" },
      { term: "$19.99", ipa: "/naɪnˈtiːn ˈnaɪnti naɪn ˈdɒlərz/", es: "$19.99", meaning: "Prices: dollars, then cents as a 2-digit number", emoji: "💵" },
      { term: "3rd", ipa: "/θɜːrd/", es: "3ro/a", meaning: "Ordinal number: third", emoji: "🥉" },
      { term: "21st", ipa: "/ˌtwɛnti ˈfɜːrst/", es: "21ro/a", meaning: "Ordinal: twenty-first", emoji: "🏅" },
      { term: "½", ipa: "/ə hɑːf/", es: "un medio", meaning: "Fraction: a half / one half", emoji: "➗" },
      { term: "100", ipa: "/ə ˈhʌndrəd/", es: "cien", meaning: "'A hundred' or 'one hundred' — no plural -s", emoji: "💯" },
      { term: "1,000,000", ipa: "/ə ˈmɪljən/", es: "un millón", meaning: "'A million' — no 'of' needed before a noun", emoji: "🤑" },
      { term: "0.5", ipa: "/ˈzɪəroʊ pɔɪnt faɪv/", es: "0.5", meaning: "Decimals use 'point', not a comma", emoji: "🔢" },
      { term: "2024", ipa: "/ˈtwɛnti ˈtwɛnti fɔːr/", es: "2024", meaning: "Modern years are often said as two 2-digit chunks", emoji: "📅" },
    ]
  },
  specialNumbers: {
    label: "🔣 Special Number Patterns",
    items: [
      { term: "0 (zero)", ipa: "/ˈzɪərəʊ/", es: "cero", meaning: "US: 'zero'. UK: also 'nought' /nɔːt/ or 'oh' /oʊ/ in phone numbers", emoji: "0️⃣", example: "My PIN is 4-0-2-1: 'four oh two one'." },
      { term: "1st floor", ipa: "UK vs US", es: "planta baja vs primer piso", meaning: "UK: ground floor = 0, 1st floor = 1. US: 1st floor = ground level", emoji: "🏢", example: "The shop is on the first floor (US: ground level)." },
      { term: "Phone numbers", ipa: "digit by digit", es: "teléfonos", meaning: "Read digit by digit; 0 = 'oh'; double digits said as 'double X'", emoji: "📞", example: "07700 → 'oh-seven-seven-oh-oh' or 'oh-double-seven-double-oh'." },
      { term: "1,000,000,000", ipa: "/ə ˈbɪljən/", es: "mil millones (UK/US)", esSpeak: "mil millones", meaning: "US/modern UK: billion = 10⁹. Old UK: billion = 10¹²", emoji: "💰", example: "A billion dollars = 1,000,000,000." },
      { term: "Nought / Nil / Zero", ipa: "/nɔːt/ /nɪl/ /ˈzɪərəʊ/", es: "cero (contextos)", meaning: "Maths: nought/zero. Football scores: nil. Tennis: love", emoji: "⚽", example: "Two-nil (football); love-fifteen (tennis); 0.5 = nought point five." },
      { term: "Fractions: ¾", ipa: "/ˌθriː ˈfɔːrθs/", es: "tres cuartos", meaning: "Numerator = cardinal; denominator = ordinal (plural if >1)", emoji: "➗", example: "¾ = three-fourths / three-quarters. ⅔ = two-thirds." },
      { term: "Percentages", ipa: "/pərˈsɛnt/", es: "porcentajes", meaning: "Always 'percent' — never 'percents'; the symbol % is read aloud", emoji: "💯", example: "35% → 'thirty-five percent'." },
      { term: "Negative numbers", ipa: "/ˈmʌɪnəs/", es: "números negativos", meaning: "UK: 'minus five'. US: also 'negative five'", emoji: "❄️", example: "−5°C → 'minus five degrees'." },
      { term: "Decades", ipa: "/ðə ˈnaɪntiz/", es: "décadas", meaning: "Decades take 'the' + plural: the nineties, the 1990s", emoji: "📼", example: "In the 90s → 'in the nineties'." },
      { term: "Roman numerals", ipa: "read as cardinals", es: "números romanos", meaning: "Read as regular ordinals for monarchs and popes", emoji: "👑", example: "Henry VIII → 'Henry the Eighth'. Chapter IV → 'Chapter Four'." },
    ]
  },
};
