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
    items: [
      { source: "Can you send me the file?", correct: ["Could you please send me the file?", "Would you mind sending me the file?"], hint: "Use a polite modal instead of 'can'", explain: "Formal requests avoid direct 'can' and use 'could' or 'would you mind'." },
      { source: "I wanna ask you something.", correct: ["I would like to ask you something.", "I'd like to ask you something."], hint: "Avoid contractions like 'wanna'", explain: "'Wanna' is informal; formal register uses 'would like to'." },
      { source: "Thanks a lot for your help!", correct: ["Thank you very much for your help.", "I am very grateful for your help."], hint: "Avoid casual thanks", explain: "'Thanks a lot' is casual; 'thank you very much' is more formal." },
      { source: "Sorry, I can't make it.", correct: ["I apologize, but I am unable to attend.", "I regret that I cannot attend."], hint: "Use a formal apology and 'unable to'", explain: "'Can't make it' becomes 'unable to attend' in formal writing." },
      { source: "Let me know if you need anything.", correct: ["Please do not hesitate to contact me should you require any assistance.", "Please let me know should you require any assistance."], hint: "Use 'should you require' instead of 'if you need'", explain: "Formal English often replaces 'if' with 'should' for offers of help." },
      { source: "That's a great idea!", correct: ["That is an excellent suggestion.", "That is a very good idea."], hint: "Avoid the contraction 'that's'", explain: "Formal writing avoids contractions like 'that's'." },
      { source: "I'll get back to you soon.", correct: ["I will respond to you shortly.", "I will get back to you as soon as possible."], hint: "Expand the contraction 'I'll'", explain: "Formal register expands contractions: 'I'll' → 'I will'." },
      { source: "I think you're wrong.", correct: ["I believe you may be mistaken.", "With respect, I disagree."], hint: "Soften the disagreement", explain: "Formal register softens direct disagreement with hedging language." },
      { source: "We need to talk about this.", correct: ["We need to discuss this matter.", "I would like to discuss this matter with you."], hint: "'Discuss' sounds more formal than 'talk about'", explain: "'Discuss' is the more formal verb for 'talk about'." },
      { source: "Can you fix this ASAP?", correct: ["Could you resolve this as soon as possible?", "Would you be able to address this promptly?"], hint: "Avoid the abbreviation 'ASAP'", explain: "Formal writing spells out 'as soon as possible' instead of 'ASAP'." },
      { source: "I gotta go now.", correct: ["I have to leave now.", "I must leave now."], hint: "Avoid 'gotta'", explain: "'Gotta' is informal; formal register uses 'have to' or 'must'." },
      { source: "No worries, it's fine.", correct: ["There is no need for concern.", "It is not a problem at all."], hint: "Avoid casual reassurance", explain: "'No worries' is casual; formal register uses more measured reassurance." },
      { source: "You should check it out.", correct: ["I would recommend that you review it.", "You may wish to examine it."], hint: "Use a formal recommendation", explain: "'Check it out' becomes a formal recommendation like 'review it'." },
      { source: "I'm gonna call you later.", correct: ["I will telephone you later.", "I will contact you at a later time."], hint: "Avoid 'gonna'", explain: "'Gonna' is informal; formal register expands it to 'am going to' or 'will'." },
    ],
  },
  toInformal: {
    label: 'Formal → Informal',
    icon: '👋',
    items: [
      { source: "I would be grateful if you could assist me.", correct: ["Could you help me out?", "Can you give me a hand?"], hint: "Use a casual request", explain: "Informal English prefers short, direct requests like 'help me out'." },
      { source: "I regret to inform you that the meeting has been cancelled.", correct: ["Sorry, but the meeting's off.", "Bad news — the meeting got cancelled."], hint: "Use everyday, direct phrasing", explain: "'I regret to inform you' is formal; informally we just say 'sorry, but...'." },
      { source: "Please do not hesitate to contact me.", correct: ["Just give me a shout.", "Feel free to hit me up."], hint: "Use a casual phrasal expression", explain: "'Do not hesitate to contact me' becomes casual phrases like 'give me a shout'." },
      { source: "I would like to express my gratitude.", correct: ["Thanks a lot!", "I really appreciate it."], hint: "Use a short, everyday thank-you", explain: "'Express my gratitude' is formal; informally we just say 'thanks a lot'." },
      { source: "We are currently experiencing technical difficulties.", correct: ["We're having some tech issues right now.", "Things are a bit glitchy at the moment."], hint: "Use contractions and casual vocabulary", explain: "'Experiencing technical difficulties' becomes 'having tech issues' informally." },
      { source: "It would be advisable to reconsider your decision.", correct: ["You might wanna rethink that.", "Maybe think it over again."], hint: "Use casual modal phrasing", explain: "'It would be advisable' becomes casual suggestions like 'you might wanna'." },
      { source: "I apologize for the inconvenience caused.", correct: ["Sorry for the hassle!", "My bad for the trouble."], hint: "Use a short, casual apology", explain: "'Apologize for the inconvenience' becomes 'sorry for the hassle' informally." },
      { source: "I am pleased to inform you that your application was successful.", correct: ["Good news — you got in!", "Great news, you're accepted!"], hint: "Use an exclamatory, casual announcement", explain: "Formal acceptance letters become short, excited announcements informally." },
      { source: "Should you have any questions, feel free to reach out.", correct: ["Got questions? Just ask!", "Hit me up if you have questions."], hint: "Use a casual conditional", explain: "'Should you have' is formal inversion; informally we just say 'got questions?'." },
      { source: "We regret any inconvenience this may cause.", correct: ["Sorry about any trouble this causes.", "My apologies for any hassle."], hint: "Use everyday vocabulary for 'inconvenience'", explain: "'Inconvenience' becomes 'trouble' or 'hassle' in informal speech." },
      { source: "I would appreciate a prompt response.", correct: ["Get back to me soon, please!", "Let me know ASAP!"], hint: "Use a casual, direct request", explain: "'Appreciate a prompt response' becomes 'get back to me soon' informally." },
      { source: "Kindly refrain from making noise after 10 PM.", correct: ["Please keep it down after 10, okay?", "Can you be quiet after 10pm?"], hint: "Use everyday, friendly phrasing", explain: "'Kindly refrain from' is formal; informally we just ask people to 'keep it down'." },
      { source: "The event has been postponed until further notice.", correct: ["The event's been put off for now.", "They pushed the event back — no new date yet."], hint: "Use casual phrasal verbs", explain: "'Postponed until further notice' becomes 'put off' or 'pushed back' informally." },
    ],
  },
  toNeutral: {
    label: 'Adjust the Tone',
    icon: '⚖️',
    items: [
      { source: "You're totally wrong about this.", correct: ["I think there may be a misunderstanding.", "I believe your information might be incorrect."], hint: "Soften the accusation — use hedging", explain: "'Totally wrong' is blunt; neutral register hedges with 'may be' or 'I believe'." },
      { source: "I hereby request the immediate resolution of the aforementioned matter.", correct: ["I am writing to ask you to resolve this matter.", "I would like this matter resolved as soon as possible."], hint: "Remove legal-sounding words", explain: "'Hereby', 'aforementioned' are very formal/legal; standard professional writing avoids them." },
      { source: "Yo, can you hook me up with those docs?", correct: ["Could you please send me those documents?", "Would it be possible to share those documents with me?"], hint: "Replace slang with standard phrasing", explain: "'Yo' and 'hook me up' are informal slang; professional tone uses polite requests." },
      { source: "The team must comply with all regulations henceforth.", correct: ["From now on, the team should follow all regulations.", "The team is expected to follow all regulations going forward."], hint: "Replace 'henceforth' with everyday phrasing", explain: "'Henceforth' is archaic; modern professional writing uses 'from now on' or 'going forward'." },
      { source: "She literally died of embarrassment in the meeting.", correct: ["She was very embarrassed in the meeting.", "She found the meeting extremely embarrassing."], hint: "Remove the literal hyperbole", explain: "'Literally died' is colloquial hyperbole; neutral register describes the feeling directly." },
      { source: "Pursuant to your request, please find enclosed the relevant documentation.", correct: ["As requested, please find the relevant documents attached.", "I've attached the documents you asked for."], hint: "Replace the legal phrase 'pursuant to'", explain: "'Pursuant to' is overly legalistic; 'as requested' works for all professional contexts." },
      { source: "Sounds good! I'll totally get that sorted ASAP.", correct: ["I will take care of this as soon as possible.", "I'll address this promptly."], hint: "Remove 'totally' and 'ASAP' from professional writing", explain: "'Totally' and 'ASAP' are too casual; neutral register uses 'will' and 'as soon as possible'." },
      { source: "Your proposal is fundamentally flawed and fails to address key considerations.", correct: ["Your proposal has some areas that could be strengthened.", "There are a few aspects of your proposal that may benefit from further consideration."], hint: "Soften the criticism with constructive framing", explain: "Direct criticism becomes softer, constructive feedback in neutral/diplomatic register." },
      { source: "It has come to our attention that you have failed to fulfil your contractual obligations.", correct: ["We have noticed that some aspects of the agreement have not been met.", "We wanted to flag that the agreed terms have not been fully fulfilled."], hint: "Replace 'failed to fulfil' with less accusatory phrasing", explain: "Legal language ('failed to fulfil contractual obligations') becomes more collaborative in standard professional tone." },
      { source: "This is a massive opportunity — we'd be crazy to pass it up!", correct: ["This is a significant opportunity that we should seriously consider.", "This opportunity has considerable potential and deserves our attention."], hint: "Remove the exclamation and casual intensifiers", explain: "'Massive' and 'crazy' are casual; neutral register uses 'significant' and measured language." },
      { source: "Honestly, this plan is a total disaster.", correct: ["This plan has some significant issues.", "This plan needs considerable improvement."], hint: "Remove the blunt judgment", explain: "'Total disaster' is blunt; neutral register describes problems more measuredly." },
      { source: "Kindly be advised that the aforementioned deadline remains in full effect.", correct: ["Please note that the deadline has not changed.", "This is to confirm that the deadline remains the same."], hint: "Remove legal-sounding phrasing", explain: "'Kindly be advised' and 'aforementioned' are overly formal; standard professional writing is more direct." },
      { source: "OMG this is the best idea ever, let's do it!!!", correct: ["This is a great idea; I think we should proceed.", "I strongly support this idea and recommend moving forward."], hint: "Remove exclamations and internet abbreviations", explain: "'OMG' and multiple exclamation marks are too casual for professional writing." },
    ],
  },
};
