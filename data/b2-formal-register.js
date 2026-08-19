// `studyCards` enseña la REGLA de registro antes de examinarla en Quiz.
// Antes Study mostraba las mismas 10 frases del Quiz con la respuesta
// detrás — el examen disfrazado de flashcard. Mismo patrón que
// a1-plurals-possessives.js.
export const CATEGORIES = {
  getObtainReceive: {
    label: 'Get / Obtain / Receive',
    icon: '📥',
    options: ['get', 'obtain', 'receive'],
    studyCards: [
      { front: 'get', back: 'informal, cotidiano', detail: "Can you get me a coffee? · I'll get the tickets online." },
      { front: 'obtain', back: 'formal, requisitos oficiales', detail: 'Candidates must obtain a valid certificate.' },
      { front: 'receive', back: 'neutral-formal, comunicación oficial', detail: 'You should receive them by email shortly.' },
      { front: 'Regla rápida', back: 'informal → get · trámite/requisito → obtain · llega algo a ti → receive', detail: 'Los tres significan "conseguir/recibir" pero el registro cambia con el contexto.' },
    ],
    items: [
      { sentence: 'Please find attached the documents; you should ___ them by email shortly.', correct: 'receive', explain: '"Receive" is the neutral-formal choice for official communication.' },
      { sentence: "Can you ___ me a coffee while you're up?", correct: 'get', explain: '"Get" is the everyday, informal choice.' },
      { sentence: 'All candidates must ___ a valid certificate before applying.', correct: 'obtain', explain: '"Obtain" is the formal choice, common in official requirements.' },
      { sentence: "I'll ___ the tickets online later today.", correct: 'get', explain: '"Get" is the everyday, informal choice.' },
      { sentence: 'Applicants are required to ___ approval from their manager.', correct: 'obtain', explain: '"Obtain" is the formal choice, common in official requirements.' },
      { sentence: 'Did you ___ my email yesterday?', correct: 'get', explain: '"Get" is the everyday, informal choice.' },
      { sentence: 'The company aims to ___ formal certification within the next year.', correct: 'obtain', explain: '"Obtain" is the formal choice, common in official requirements.' },
      { sentence: 'You will ___ a confirmation email once your order ships.', correct: 'receive', explain: '"Receive" is the neutral-formal choice for official communication.' },
      { sentence: 'Hey, can you ___ that for me from the shelf?', correct: 'get', explain: '"Get" is the everyday, informal choice.' },
      { sentence: 'New employees must ___ security clearance before starting.', correct: 'obtain', explain: '"Obtain" is the formal choice, common in official requirements.' },
    ]
  },
  askRequestInquire: {
    label: 'Ask / Request / Inquire',
    icon: '❔',
    options: ['ask', 'request', 'inquire'],
    studyCards: [
      { front: 'ask', back: 'informal, neutral', detail: "Can I ask you a question? · Don't be afraid to ask for help." },
      { front: 'request', back: 'formal, negocios/oficial', detail: 'We would like to request further information.' },
      { front: 'inquire', back: 'formal, alternativa escrita a "ask"', detail: "I'm writing to inquire about the status of my application." },
      { front: 'Regla rápida', back: 'hablado/informal → ask · escrito/negocios → request o inquire', detail: 'inquire suele ir con "about"; request suele llevar objeto directo.' },
    ],
    items: [
      { sentence: 'Can I ___ you a question?', correct: 'ask', explain: '"Ask" is the everyday, neutral choice.' },
      { sentence: 'We would like to ___ further information regarding your proposal.', correct: 'request', explain: '"Request" is the formal choice, common in business writing.' },
      { sentence: "I'm writing to ___ about the status of my application.", correct: 'inquire', explain: '"Inquire" is a formal alternative to "ask", common in written English.' },
      { sentence: 'Hey, can I ___ you something real quick?', correct: 'ask', explain: '"Ask" is the everyday, informal choice.' },
      { sentence: 'Guests are kindly asked to ___ assistance from staff if needed.', correct: 'request', explain: '"Request" is the formal choice, common in official signs and notices.' },
      { sentence: 'She called to ___ about job openings.', correct: 'inquire', explain: '"Inquire" is a formal alternative to "ask".' },
      { sentence: "Don't be afraid to ___ for help.", correct: 'ask', explain: '"Ask" is the everyday, neutral choice.' },
      { sentence: 'Please ___ a refund through our online portal.', correct: 'request', explain: '"Request" is the formal choice, common in customer service language.' },
      { sentence: 'He wanted to ___ about the meeting time.', correct: 'inquire', explain: '"Inquire" is a formal alternative to "ask".' },
      { sentence: 'Can you ___ him to call me back?', correct: 'ask', explain: '"Ask" is the everyday, neutral choice.' },
    ]
  },
  contactReachOut: {
    label: 'Contact / Reach Out',
    icon: '📞',
    options: ['get in touch', 'contact', 'reach out'],
    studyCards: [
      { front: 'contact', back: 'formal, neutral, verbo transitivo', detail: 'Please contact our support team. (contact + objeto directo, sin preposición)' },
      { front: 'get in touch (with)', back: 'semi-formal, cotidiano', detail: "I'll get in touch with you. (necesita 'with' antes de la persona)" },
      { front: 'reach out (to)', back: 'business-casual, tono cálido', detail: "She decided to reach out to an old friend. (necesita 'to' antes de la persona)" },
      { front: 'Trampa de preposición', back: "'get in touch' y 'reach out' necesitan with/to", detail: "'Contact' no lleva preposición (contact her), pero 'get in touch WITH her' y 'reach out TO her' sí." },
    ],
    items: [
      { sentence: 'Please feel free to ___ our support team at any time.', correct: 'contact', explain: '"Contact" is the formal, neutral choice for official communication.' },
      { sentence: "I'll ___ with you as soon as I have news.", correct: 'get in touch', explain: '"Get in touch" is a common, semi-formal way to say you will contact someone.' },
      { sentence: "We'd like to ___ to discuss a potential partnership.", correct: 'reach out', explain: '"Reach out" is a common business-casual way to initiate contact.' },
      { sentence: 'For further assistance, please ___ our office.', correct: 'contact', explain: '"Contact" is the formal, neutral choice for official communication.' },
      { sentence: 'Just ___ if you need anything!', correct: 'reach out', explain: '"Reach out" has a warm, casual tone.' },
      { sentence: "I've been trying to ___ with you all week.", correct: 'get in touch', explain: '"Get in touch with" is common in everyday, semi-formal contexts — needs "with" before the person.' },
      { sentence: 'Kindly ___ the HR department for more details.', correct: 'contact', explain: '"Contact" is the formal, neutral choice for official communication.' },
      { sentence: 'She decided to ___ to an old friend.', correct: 'reach out', explain: '"Reach out" has a warm, personal tone.' },
      { sentence: 'Please ___ us via the form below.', correct: 'contact', explain: '"Contact" is the formal, neutral choice for official communication.' },
      { sentence: "I'll ___ once I land.", correct: 'get in touch', explain: '"Get in touch" is common in everyday, semi-formal contexts.' },
    ]
  },
  buyPurchaseAcquire: {
    label: 'Buy / Purchase / Acquire',
    icon: '🛍️',
    options: ['buy', 'purchase', 'acquire'],
    studyCards: [
      { front: 'buy', back: 'informal, cotidiano', detail: 'I need to buy some milk. · Where did you buy that jacket?' },
      { front: 'purchase', back: 'formal, orientado a negocios', detail: 'Customers can purchase tickets online.' },
      { front: 'acquire', back: 'formal, empresas/activos valiosos, implica esfuerzo', detail: 'The company plans to acquire a smaller competitor.' },
      { front: 'Regla rápida', back: 'cosas del día a día → buy · transacciones formales → purchase · empresas/activos → acquire', detail: '"Acquire" casi nunca se usa para compras pequeñas cotidianas.' },
    ],
    items: [
      { sentence: 'Customers can ___ tickets online or at the box office.', correct: 'purchase', explain: '"Purchase" is the formal, business-oriented choice.' },
      { sentence: 'I need to ___ some milk on my way home.', correct: 'buy', explain: '"Buy" is the everyday, informal choice.' },
      { sentence: 'The company plans to ___ a smaller competitor next year.', correct: 'acquire', explain: '"Acquire" is the formal, business term for buying a company or asset.' },
      { sentence: 'Where did you ___ that jacket? I love it!', correct: 'buy', explain: '"Buy" is the everyday, informal choice.' },
      { sentence: 'You can ___ extra insurance when you book your flight.', correct: 'purchase', explain: '"Purchase" is the formal, business-oriented choice.' },
      { sentence: 'He managed to ___ a rare vintage car.', correct: 'acquire', explain: '"Acquire" often implies effort or achievement in obtaining something.' },
      { sentence: "Let's ___ some snacks for the movie.", correct: 'buy', explain: '"Buy" is the everyday, informal choice.' },
      { sentence: 'The museum is planning to ___ several new paintings this year.', correct: 'acquire', explain: '"Acquire" is common for formal, valuable additions.' },
      { sentence: 'Can you ___ some bread from the store?', correct: 'buy', explain: '"Buy" is the everyday, informal choice.' },
      { sentence: 'Investors hope to ___ significant shares in the company.', correct: 'acquire', explain: '"Acquire" is the formal, business term.' },
    ]
  },
  kidsChildren: {
    label: 'Kids / Children',
    icon: '🧒',
    options: ['kids', 'children', 'offspring'],
    studyCards: [
      { front: 'kids', back: 'informal, cálido, cotidiano', detail: 'The kids were playing in the yard. · My kids love the park.' },
      { front: 'children', back: 'neutral, formal, oficial', detail: 'This program is for children aged 5-12. · The school reported that all children passed.' },
      { front: 'Regla rápida', back: 'conversación casual → kids · documentos/reglas/informes → children', detail: 'En un aviso oficial o formulario, siempre "children"; hablando con amigos, "kids" suena natural.' },
    ],
    items: [
      { sentence: 'How many ___ do you have?', correct: 'children', explain: '"Children" is the neutral, standard word.' },
      { sentence: 'The ___ were playing in the yard all afternoon.', correct: 'kids', explain: '"Kids" is the informal, everyday word.' },
      { sentence: 'This program is designed for ___ aged 5 to 12.', correct: 'children', explain: '"Children" is used in formal or official descriptions.' },
      { sentence: 'My ___ love going to the park.', correct: 'kids', explain: '"Kids" is the informal, everyday word.' },
      { sentence: 'The school reported that all ___ passed the exam.', correct: 'children', explain: '"Children" is used in formal reports and official language.' },
      { sentence: "Hey, get the ___ ready, we're leaving soon!", correct: 'kids', explain: '"Kids" is the informal, everyday word.' },
      { sentence: 'Parents must accompany ___ under the age of 10.', correct: 'children', explain: '"Children" is used in formal rules and notices.' },
      { sentence: 'Look at those ___ playing over there.', correct: 'kids', explain: '"Kids" is the informal, everyday word.' },
      { sentence: 'The charity supports vulnerable ___ around the world.', correct: 'children', explain: '"Children" is used in formal, official contexts.' },
      { sentence: 'I love spending time with my ___ on weekends.', correct: 'kids', explain: '"Kids" has a warm, casual tone.' },
    ]
  },
};
