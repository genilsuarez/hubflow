export const CATEGORIES = {
  'make-do': {
    label: "Make / Do",
    icon: "🔨",
    pairs: ["make","do"],
    items: [
      { sentence: "I need to ___ my homework before dinner.", correct: "do", explain: "'Do' is used for tasks and chores: do homework, do the dishes." },
      { sentence: "She wants to ___ a cake for her birthday.", correct: "make", explain: "'Make' is used for creating or producing something: make a cake, make dinner." },
      { sentence: "Can you ___ me a favor?", correct: "do", explain: "Fixed expression: do a favour." },
      { sentence: "He always ___ his bed in the morning.", correct: "makes", explain: "'Make the bed' — fixed expression with 'make'." },
      { sentence: "They ___ a lot of money last year.", correct: "made", explain: "'Make money' = to earn money. Always with 'make'." },
      { sentence: "I ___ the laundry every Saturday.", correct: "do", explain: "'Do the laundry' — household chores take 'do'." },
      { sentence: "Let me ___ a phone call first.", correct: "make", explain: "'Make a phone call' — fixed expression." },
      { sentence: "She ___ her best to pass the exam.", correct: "did", explain: "'Do your best' = to try as hard as you can." },
      { sentence: "We need to ___ a decision soon.", correct: "make", explain: "'Make a decision' — fixed expression." },
      { sentence: "He ___ the shopping on Fridays.", correct: "does", explain: "'Do the shopping' — activities take 'do'." },
    ]
  },
  'say-tell': {
    label: "Say / Tell",
    icon: "🗣️",
    pairs: ["say","tell"],
    items: [
      { sentence: "She ___ me the truth.", correct: "told", explain: "'Tell' always takes an indirect object (me, him, her, us, them)." },
      { sentence: "What did he ___?", correct: "say", explain: "'Say' does not require an indirect object." },
      { sentence: "Can you ___ me the time, please?", correct: "tell", explain: "'Tell me' = decirme. Tell + persona." },
      { sentence: "___ hello to your mother for me.", correct: "Say", explain: "'Say hello/goodbye/sorry' — fixed expressions with 'say'." },
      { sentence: "He ___ a lie to his teacher.", correct: "told", explain: "'Tell a lie' — fixed expression with 'tell'." },
      { sentence: "They ___ that the weather will improve.", correct: "say", explain: "'Say that...' reports general information." },
      { sentence: "Don't ___ anyone about this.", correct: "tell", explain: "'Tell someone' = decirle a alguien. Tell + persona." },
      { sentence: "He ___ 'I'm sorry' and left.", correct: "said", explain: "'Say' for direct quotes: He said '...'." },
      { sentence: "Can you ___ the difference?", correct: "tell", explain: "'Tell the difference' = to notice the difference. Fixed expression." },
      { sentence: "She ___ goodbye and walked away.", correct: "said", explain: "'Say goodbye' — social expressions always take 'say'." },
    ]
  },
  'bring-take': {
    label: "Bring / Take",
    icon: "📦",
    pairs: ["bring","take"],
    items: [
      { sentence: "Can you ___ me a glass of water?", correct: "bring", explain: "'Bring' = movement towards the speaker." },
      { sentence: "Don't forget to ___ your umbrella.", correct: "take", explain: "'Take' = movement away from the speaker." },
      { sentence: "She ___ her laptop to work every day.", correct: "takes", explain: "Carrying something to a place away from here → 'take'." },
      { sentence: "He ___ flowers when he visits.", correct: "brings", explain: "Bringing something to where you are → 'bring'." },
      { sentence: "I'll ___ the kids to school tomorrow.", correct: "take", explain: "Llevar personas a otro lugar → take." },
      { sentence: "Please ___ your books to class.", correct: "bring", explain: "The speaker is in the class → 'bring' (towards me)." },
      { sentence: "She always ___ homemade cookies to the party.", correct: "brings", explain: "If the speaker is at the party → 'bring'." },
      { sentence: "I need to ___ the car to the mechanic.", correct: "take", explain: "Llevar lejos → take." },
      { sentence: "Can you ___ some snacks when you come?", correct: "bring", explain: "'When you come' implies movement towards me → 'bring'." },
      { sentence: "He ___ his dog for a walk every evening.", correct: "takes", explain: "'Take for a walk' — fixed expression with 'take'." },
    ]
  },
  'borrow-lend': {
    label: "Borrow / Lend",
    icon: "🤝",
    pairs: ["borrow","lend"],
    items: [
      { sentence: "Can I ___ your pen for a moment?", correct: "borrow", explain: "'Borrow' = pedir prestado (yo recibo)." },
      { sentence: "Could you ___ me ten dollars?", correct: "lend", explain: "'Lend' = to give something temporarily. Lend me = give it to me for a while." },
      { sentence: "I ___ the book from the library.", correct: "borrowed", explain: "Receiving something temporarily → 'borrow from'." },
      { sentence: "She ___ me her notes for the exam.", correct: "lent", explain: "Ella me dio temporalmente → lent (past de lend)." },
      { sentence: "He never ___ money to friends.", correct: "lends", explain: "Dar prestado → lend. Él da a otros." },
      { sentence: "Can I ___ your car this weekend?", correct: "borrow", explain: "Yo quiero usar algo tuyo → borrow." },
      { sentence: "The bank ___ them money to buy a house.", correct: "lent", explain: "The bank is the giver → 'lend'." },
      { sentence: "I ___ a ladder from my neighbor.", correct: "borrowed", explain: "I am the one receiving, from my neighbour → 'borrow'." },
      { sentence: "She doesn't like to ___ her things.", correct: "lend", explain: "He is the one giving his things → 'lend'." },
      { sentence: "May I ___ your charger?", correct: "borrow", explain: "Yo quiero usar algo temporalmente → borrow." },
    ]
  },
  'watch-look-see': {
    label: "Watch / Look / See",
    icon: "👁️",
    pairs: ["watch","look","see"],
    items: [
      { sentence: "I ___ a movie last night.", correct: "watched", explain: "'Watch' = to look attentively at something that moves or changes." },
      { sentence: "___ at that beautiful sunset!", correct: "Look", explain: "'Look at' = to direct your eyes deliberately, at one moment." },
      { sentence: "Did you ___ the accident?", correct: "see", explain: "'See' = to perceive with your eyes, without effort." },
      { sentence: "She ___ TV for three hours every day.", correct: "watches", explain: "'Watch TV' — following something moving over a period of time." },
      { sentence: "I can ___ the mountains from my window.", correct: "see", explain: "'See' = visual ability / passive perception." },
      { sentence: "He ___ both ways before crossing the street.", correct: "looked", explain: "'Look' = to turn your eyes deliberately." },
      { sentence: "Let me ___ if there are seats available.", correct: "see", explain: "'Let me see' / 'I'll see' = verificar/comprobar." },
      { sentence: "___ out! There's a car coming!", correct: "Watch", explain: "'Watch out!' = be careful. Fixed expression." },
      { sentence: "I haven't ___ her since last week.", correct: "seen", explain: "'See someone' = to meet or catch sight of someone." },
      { sentence: "Can you ___ after my bag?", correct: "look", explain: "'Look after' = to take care of. Phrasal verb with 'look'." },
    ]
  },
};
