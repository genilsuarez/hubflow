/**
 * HubFlow — Register Switch Data
 * Categories: toFormal (B1-B2), toInformal (B1-B2)
 * Each entry: { source, correct: string[], hint, explain }
 * The user rewrites `source` in the opposite register; `correct` holds every
 * acceptable rewrite (checked with normalized fuzzy matching, not exact-only).
 */

export const CATEGORIES = {
  toFormal: {
    label: 'Informal → Formal',
    icon: '🎩',
    level: 'B1–B2',
    items: [
      { source: "Can you send me the file?", correct: ["Could you please send me the file?", "Would you mind sending me the file?"], hint: "Use a polite modal instead of 'can'", explain: "Formal requests avoid direct 'can' and use 'could' or 'would you mind'." },
      { source: "I wanna ask you something.", correct: ["I would like to ask you something.", "I'd like to ask you something."], hint: "Avoid contractions like 'wanna'", explain: "'Wanna' is informal; formal register uses 'would like to'." },
      { source: "Thanks a lot for your help!", correct: ["Thank you very much for your help.", "I am very grateful for your help."], hint: "Avoid casual thanks", explain: "'Thanks a lot' is casual; 'thank you very much' is more formal." },
      { source: "Sorry, I can't make it.", correct: ["I apologize, but I am unable to attend.", "I regret that I cannot attend."], hint: "Use a formal apology and 'unable to'", explain: "'Can't make it' becomes 'unable to attend' in formal writing." },
      { source: "Let me know if you need anything.", correct: ["Please do not hesitate to contact me should you require any assistance.", "Please let me know should you require any assistance."], hint: "Use 'should you require' instead of 'if you need'", explain: "Formal English often replaces 'if' with 'should' for offers of help." },
      { source: "That's a great idea!", correct: ["That is an excellent suggestion.", "That is a very good idea."], hint: "Avoid the contraction 'that's'", explain: "Formal writing avoids contractions like 'that's'." },
      { source: "I'll get back to you soon.", correct: ["I will respond to you shortly.", "I will get back to you as soon as possible."], hint: "Expand the contraction 'I'll'", explain: "Formal register expands contractions: 'I'll' → 'I will'." },
      { source: "Can I ask you a favor?", correct: ["May I ask you a favor?", "Would it be possible to ask you a favor?"], hint: "'May I' is more formal than 'can I'", explain: "'May I' is the polite, formal equivalent of 'can I'." },
      { source: "I think you're wrong.", correct: ["I believe you may be mistaken.", "With respect, I disagree."], hint: "Soften the disagreement", explain: "Formal register softens direct disagreement with hedging language." },
      { source: "Don't worry about it.", correct: ["Please do not be concerned.", "There is no need for concern."], hint: "Avoid the imperative 'don't'", explain: "Formal writing avoids blunt imperatives like 'don't worry'." },
      { source: "We need to talk about this.", correct: ["We need to discuss this matter.", "I would like to discuss this matter with you."], hint: "'Discuss' sounds more formal than 'talk about'", explain: "'Discuss' is the more formal verb for 'talk about'." },
      { source: "I got your email.", correct: ["I received your email.", "I have received your email."], hint: "'Received' is more formal than 'got'", explain: "'Got' is informal for 'received'." },
      { source: "Can you fix this ASAP?", correct: ["Could you resolve this as soon as possible?", "Would you be able to address this promptly?"], hint: "Avoid the abbreviation 'ASAP'", explain: "Formal writing spells out 'as soon as possible' instead of 'ASAP'." },
      { source: "That's not my problem.", correct: ["I am afraid that falls outside my responsibility.", "Unfortunately, that is not within my remit."], hint: "Use indirect, polite phrasing", explain: "Formal register avoids blunt refusals like 'not my problem'." },
      { source: "See you later!", correct: ["I look forward to seeing you soon.", "Until we meet again."], hint: "Avoid casual farewells", explain: "'See you later' is casual; formal farewells are more elaborate." },
    ],
  },
  toInformal: {
    label: 'Formal → Informal',
    icon: '👋',
    level: 'B1–B2',
    items: [
      { source: "I would be grateful if you could assist me.", correct: ["Could you help me out?", "Can you give me a hand?"], hint: "Use a casual request", explain: "Informal English prefers short, direct requests like 'help me out'." },
      { source: "I regret to inform you that the meeting has been cancelled.", correct: ["Sorry, but the meeting's off.", "Bad news — the meeting got cancelled."], hint: "Use everyday, direct phrasing", explain: "'I regret to inform you' is formal; informally we just say 'sorry, but...'." },
      { source: "Please do not hesitate to contact me.", correct: ["Just give me a shout.", "Feel free to hit me up."], hint: "Use a casual phrasal expression", explain: "'Do not hesitate to contact me' becomes casual phrases like 'give me a shout'." },
      { source: "I would like to express my gratitude.", correct: ["Thanks a lot!", "I really appreciate it."], hint: "Use a short, everyday thank-you", explain: "'Express my gratitude' is formal; informally we just say 'thanks a lot'." },
      { source: "We are currently experiencing technical difficulties.", correct: ["We're having some tech issues right now.", "Things are a bit glitchy at the moment."], hint: "Use contractions and casual vocabulary", explain: "'Experiencing technical difficulties' becomes 'having tech issues' informally." },
      { source: "I am writing to inquire about your services.", correct: ["I wanted to ask about your services.", "Just checking what services you offer."], hint: "Use a simple, direct opener", explain: "'I am writing to inquire' is formal email language; informally we just ask directly." },
      { source: "It would be advisable to reconsider your decision.", correct: ["You might wanna rethink that.", "Maybe think it over again."], hint: "Use casual modal phrasing", explain: "'It would be advisable' becomes casual suggestions like 'you might wanna'." },
      { source: "I apologize for the inconvenience caused.", correct: ["Sorry for the hassle!", "My bad for the trouble."], hint: "Use a short, casual apology", explain: "'Apologize for the inconvenience' becomes 'sorry for the hassle' informally." },
      { source: "Kindly complete the attached form.", correct: ["Just fill out the form, please.", "Can you fill this out?"], hint: "Use a direct, friendly request", explain: "'Kindly complete' is formal; informally we just say 'fill out'." },
      { source: "I am pleased to inform you that your application was successful.", correct: ["Good news — you got in!", "Great news, you're accepted!"], hint: "Use an exclamatory, casual announcement", explain: "Formal acceptance letters become short, excited announcements informally." },
      { source: "Should you have any questions, feel free to reach out.", correct: ["Got questions? Just ask!", "Hit me up if you have questions."], hint: "Use a casual conditional", explain: "'Should you have' is formal inversion; informally we just say 'got questions?'." },
      { source: "We regret any inconvenience this may cause.", correct: ["Sorry about any trouble this causes.", "My apologies for any hassle."], hint: "Use everyday vocabulary for 'inconvenience'", explain: "'Inconvenience' becomes 'trouble' or 'hassle' in informal speech." },
      { source: "I would appreciate your prompt response.", correct: ["Let me know soon, please!", "Hope to hear back soon!"], hint: "Use a short, friendly closer", explain: "'Prompt response' becomes casual closers like 'let me know soon'." },
      { source: "The event has been rescheduled to a later date.", correct: ["The event got pushed back.", "They moved the event to later."], hint: "Use a phrasal verb", explain: "'Rescheduled' becomes the phrasal verb 'pushed back' informally." },
      { source: "I concur with your assessment.", correct: ["I agree with you.", "Yeah, I think so too."], hint: "Use everyday agreement phrasing", explain: "'Concur' is formal for 'agree'." },
    ],
  },
};
