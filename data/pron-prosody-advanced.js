export const CATEGORIES = {
  listIntonation: {
    label: "📋 List Intonation",
    items: [
      { term: "I need eggs, ↗milk, ↗bread, and ↘butter.", ipa: "/aɪ niːd ɛɡz mɪlk brɛd ənd ˈbʌtər/", es: "Necesito huevos, leche, pan y mantequilla.", meaning: "Pitch rises on each item except the last, which falls to signal the end of the list", emoji: "🛒" },
      { term: "We visited Paris, ↗Rome, ↗Berlin, and ↘Madrid.", ipa: "/wi ˈvɪzɪtɪd ˈpɛrɪs roʊm bərˈlɪn ənd məˈdrɪd/", es: "Visitamos París, Roma, Berlín y Madrid.", meaning: "Rising pitch on each city except the last", emoji: "✈️" },
      { term: "She speaks English, ↗French, ↗Spanish, and ↘German.", ipa: "/ʃi spiːks ˈɪŋɡlɪʃ frɛntʃ ˈspænɪʃ ənd ˈdʒɜːrmən/", es: "Habla inglés, francés, español y alemán.", meaning: "Rising pitch on each language except the last", emoji: "🌍" },
      { term: "You can pay by card, ↗cash, ↗check, or ↘transfer.", ipa: "/ju kæn peɪ baɪ kɑːrd kæʃ tʃɛk ɔːr trænsˈfɜːr/", es: "Puedes pagar con tarjeta, efectivo, cheque o transferencia.", meaning: "Rising pitch on each option except the last", emoji: "💳" },
      { term: "The menu has soup, ↗salad, ↗pasta, and ↘steak.", ipa: "/ðə ˈmɛnjuː hæz suːp ˈsæləd ˈpɑːstə ənd steɪk/", es: "El menú tiene sopa, ensalada, pasta y bistec.", meaning: "Rising pitch on each item except the last", emoji: "🍽️" },
      { term: "He plays guitar, ↗piano, ↗drums, and ↘violin.", ipa: "/hi pleɪz ɡɪˈtɑːr piˈænoʊ drʌmz ənd ˌvaɪəˈlɪn/", es: "Toca guitarra, piano, batería y violín.", meaning: "Rising pitch on each instrument except the last", emoji: "🎸" },
      { term: "We need paper, ↗pens, ↗folders, and ↘staplers.", ipa: "/wi niːd ˈpeɪpər pɛnz ˈfoʊldərz ənd ˈsteɪplərz/", es: "Necesitamos papel, plumas, carpetas y engrapadoras.", meaning: "Rising pitch on each item except the last", emoji: "📎" },
      { term: "I like reading, ↗swimming, ↗cooking, and ↘hiking.", ipa: "/aɪ laɪk ˈriːdɪŋ ˈswɪmɪŋ ˈkʊkɪŋ ənd ˈhaɪkɪŋ/", es: "Me gusta leer, nadar, cocinar y hacer senderismo.", meaning: "Rising pitch on each activity except the last", emoji: "📚" },
      { term: "The store sells shoes, ↗bags, ↗hats, and ↘belts.", ipa: "/ðə stɔːr sɛlz ʃuːz bæɡz hæts ənd bɛlts/", es: "La tienda vende zapatos, bolsos, sombreros y cinturones.", meaning: "Rising pitch on each item except the last", emoji: "👜" },
      { term: "She studied biology, ↗chemistry, ↗physics, and ↘math.", ipa: "/ʃi ˈstʌdid baɪˈɑːlədʒi ˈkɛmɪstri ˈfɪzɪks ənd mæθ/", es: "Estudió biología, química, física y matemáticas.", meaning: "Rising pitch on each subject except the last", emoji: "🔬" },
    ]
  },
  tagQuestionIntonation: {
    label: "❓ Tag Question Intonation",
    items: [
      { term: "It's cold today, isn't it? ↗", ipa: "/ɪts koʊld təˈdeɪ ˈɪzənt ɪt/", es: "Hace frío hoy, ¿no? (pregunta genuina)", meaning: "Rising tag = genuinely unsure, really asking", emoji: "❄️" },
      { term: "It's cold today, isn't it? ↘", ipa: "/ɪts koʊld təˈdeɪ ˈɪzənt ɪt/", es: "Hace frío hoy, ¿verdad? (buscando acuerdo)", meaning: "Falling tag = fairly sure, expecting agreement", emoji: "❄️" },
      { term: "You're coming, aren't you? ↗", ipa: "/jʊr ˈkʌmɪŋ ɑːrənt ju/", es: "Vienes, ¿no? (pregunta genuina)", meaning: "Rising tag = genuinely unsure, really asking", emoji: "🚶" },
      { term: "You're coming, aren't you? ↘", ipa: "/jʊr ˈkʌmɪŋ ɑːrənt ju/", es: "Vienes, ¿verdad? (buscando acuerdo)", meaning: "Falling tag = fairly sure, expecting agreement", emoji: "🚶" },
      { term: "She's nice, isn't she? ↘", ipa: "/ʃiz naɪs ˈɪzənt ʃi/", es: "Es amable, ¿verdad?", meaning: "Falling tag = fairly sure, expecting agreement", emoji: "😊" },
      { term: "That was fun, wasn't it? ↘", ipa: "/ðæt wəz fʌn ˈwʌzənt ɪt/", es: "Fue divertido, ¿verdad?", meaning: "Falling tag = fairly sure, expecting agreement", emoji: "🎉" },
      { term: "He didn't call, did he? ↗", ipa: "/hi ˈdɪdənt kɔːl dɪd hi/", es: "No llamó, ¿verdad? (pregunta genuina)", meaning: "Rising tag = genuinely unsure, really asking", emoji: "📞" },
      { term: "You haven't seen it, have you? ↗", ipa: "/ju ˈhævənt siːn ɪt hæv ju/", es: "No lo has visto, ¿verdad? (pregunta genuina)", meaning: "Rising tag = genuinely unsure, really asking", emoji: "👀" },
      { term: "This is right, isn't it? ↘", ipa: "/ðɪs ɪz raɪt ˈɪzənt ɪt/", es: "Esto está bien, ¿verdad?", meaning: "Falling tag = fairly sure, expecting agreement", emoji: "✅" },
      { term: "We're late, aren't we? ↗", ipa: "/wɪr leɪt ɑːrənt wi/", es: "Estamos tarde, ¿verdad? (pregunta genuina)", meaning: "Rising tag = genuinely unsure, really asking", emoji: "⏰" },
    ]
  },
  politeVsDirectIntonation: {
    label: "🙏 Polite vs Direct Tone",
    items: [
      { term: "Could you close the door? ↗", ipa: "/kʊd ju kloʊz ðə dɔːr/", es: "¿Podrías cerrar la puerta? (cortés)", meaning: "Rising, gentle tone softens a request", emoji: "🚪" },
      { term: "Close the door. ↘", ipa: "/kloʊz ðə dɔːr/", es: "Cierra la puerta. (directo)", meaning: "Flat, falling tone sounds like a direct command", emoji: "🚪" },
      { term: "Would you mind waiting a moment? ↗", ipa: "/wʊd ju maɪnd ˈweɪtɪŋ ə ˈmoʊmənt/", es: "¿Te importaría esperar un momento? (cortés)", meaning: "Rising, gentle tone softens a request", emoji: "⏳" },
      { term: "Wait here. ↘", ipa: "/weɪt hɪr/", es: "Espera aquí. (directo)", meaning: "Flat, falling tone sounds like a direct command", emoji: "⏳" },
      { term: "Could I possibly borrow your pen? ↗", ipa: "/kʊd aɪ ˈpɑːsəbli ˈbɑːroʊ jər pɛn/", es: "¿Podría tomar prestada tu pluma? (cortés)", meaning: "Rising, gentle tone softens a request", emoji: "🖊️" },
      { term: "Give me your pen. ↘", ipa: "/ɡɪv mi jər pɛn/", es: "Dame tu pluma. (directo)", meaning: "Flat, falling tone sounds blunt or rude", emoji: "🖊️" },
      { term: "Would you like some help? ↗", ipa: "/wʊd ju laɪk sʌm hɛlp/", es: "¿Te gustaría ayuda? (oferta cortés)", meaning: "Rising tone signals a warm, genuine offer", emoji: "🤝" },
      { term: "I'll help you. ↘", ipa: "/aɪl hɛlp ju/", es: "Te ayudaré. (afirmación directa)", meaning: "Falling tone states a fact plainly", emoji: "🤝" },
      { term: "Do you think you could send that today? ↗", ipa: "/duː ju θɪŋk ju kʊd sɛnd ðæt təˈdeɪ/", es: "¿Crees que podrías enviarlo hoy? (cortés)", meaning: "Rising, gentle tone softens a request", emoji: "📧" },
      { term: "Send that today. ↘", ipa: "/sɛnd ðæt təˈdeɪ/", es: "Envía eso hoy. (directo)", meaning: "Flat, falling tone sounds like a direct command", emoji: "📧" },
    ]
  },
  surpriseAndSarcasmTone: {
    label: "😲 Surprise vs Sarcasm",
    items: [
      { term: "Oh, REALLY? ↗", ipa: "/oʊ ˈriːli/", es: "¿En serio? (sorpresa genuina)", meaning: "High rising pitch shows genuine surprise", emoji: "😲" },
      { term: "Oh, really. ↘", ipa: "/oʊ ˈriːli/", es: "Ah, en serio. (sarcástico)", meaning: "Flat, falling tone sounds unimpressed or sarcastic", emoji: "🙄" },
      { term: "That's SO interesting! ↗", ipa: "/ðæts soʊ ˈɪntrəstɪŋ/", es: "¡Eso es tan interesante! (entusiasmo genuino)", meaning: "High, energetic pitch shows genuine enthusiasm", emoji: "🤩" },
      { term: "That's so interesting. ↘", ipa: "/ðæts soʊ ˈɪntrəstɪŋ/", es: "Qué interesante. (sarcástico, aburrido)", meaning: "Flat, falling tone sounds bored or sarcastic", emoji: "🙄" },
      { term: "Wow, GREAT job! ↗", ipa: "/waʊ ɡreɪt dʒɑːb/", es: "¡Wow, gran trabajo! (elogio genuino)", meaning: "High, warm pitch shows genuine praise", emoji: "🎉" },
      { term: "Wow, great job. ↘", ipa: "/waʊ ɡreɪt dʒɑːb/", es: "Vaya, gran trabajo. (sarcástico)", meaning: "Flat, falling tone sounds like sarcastic criticism", emoji: "🙄" },
      { term: "You don't SAY! ↗", ipa: "/ju doʊnt seɪ/", es: "¡No me digas! (sorpresa genuina)", meaning: "High rising pitch shows genuine surprise", emoji: "😲" },
      { term: "You don't say. ↘", ipa: "/ju doʊnt seɪ/", es: "No me digas. (sarcástico, sin sorpresa)", meaning: "Flat, falling tone sounds sarcastic and unsurprised", emoji: "🙄" },
      { term: "How WONDERFUL! ↗", ipa: "/haʊ ˈwʌndərfəl/", es: "¡Qué maravilloso! (deleite genuino)", meaning: "High, warm pitch shows genuine delight", emoji: "🤩" },
      { term: "How wonderful. ↘", ipa: "/haʊ ˈwʌndərfəl/", es: "Qué maravilla. (sarcástico)", meaning: "Flat, falling tone sounds sarcastic", emoji: "🙄" },
    ]
  },
};
