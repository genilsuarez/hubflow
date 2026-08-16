export const CATEGORIES = {
  hesitationMarkers: {
    label: '🤔 Hesitation & Consideration',
    items: [
      { term: "Well... I'm not sure that's the best idea.", ipa: "/wɛl aɪm nɒt ʃʊr ðæts ðə bɛst aɪˈdɪə/", es: "Bueno... no estoy seguro de que sea la mejor idea.", meaning: "A drawn-out, falling 'well' with a pause after it signals hesitation or reluctance.", emoji: "🤷" },
      { term: "So, | where were we?", ipa: "/soʊ | wɛr wɜːr wiː/", es: "Entonces, | ¿dónde estábamos?", meaning: "A short, level-toned 'so' followed by a pause signals a return to a topic after a break.", emoji: "🔄" },
      { term: "Um, | let me think about that for a second.", ipa: "/ʌm | lɛt miː θɪŋk əˈbaʊt ðæt fɔːr ə ˈsɛkənd/", es: "Eh, | déjame pensarlo un momento.", meaning: "A flat, held 'um' buys time to formulate a response — normal in fluent speech, not a mistake.", emoji: "💭" },
      { term: "You know, | it's actually more complicated than that.", ipa: "/juː noʊ | ɪts ˈæktʃuəli mɔːr ˌkɒmplɪˈkeɪtɪd ðən ðæt/", es: "Sabes, | en realidad es más complicado que eso.", meaning: "A rising 'you know' here checks the listener is following before adding a nuance.", emoji: "🧠" },
      { term: "I guess... | it could work.", ipa: "/aɪ ɡɛs | ɪt kʊd wɜːrk/", es: "Supongo... | que podría funcionar.", meaning: "A falling, trailing 'I guess' with a pause signals lukewarm, uncertain agreement.", emoji: "😐" },
      { term: "Hmm, | that's a good question.", ipa: "/hm | ðæts ə ɡʊd ˈkwɛstʃən/", es: "Mmm, | esa es una buena pregunta.", meaning: "A rising 'hmm' signals genuine consideration, buying time before answering.", emoji: "🤨" },
      { term: "Look, | I don't want to argue about this.", ipa: "/lʊk | aɪ doʊnt wɒnt tuː ˈɑːrɡjuː əˈbaʊt ðɪs/", es: "Mira, | no quiero discutir sobre esto.", meaning: "A firm, falling 'look' signals the speaker is about to state a position directly, not offer an option.", emoji: "🙅" },
      { term: "Well, | that depends on a few things.", ipa: "/wɛl | ðæt dɪˈpɛndz ɒn ə fjuː θɪŋz/", es: "Bueno, | eso depende de varias cosas.", meaning: "A shorter, level 'well' here softens an answer that isn't a simple yes or no.", emoji: "⚖️" },
      { term: "Actually, | I think you might be right.", ipa: "/ˈæktʃuəli | aɪ θɪŋk juː maɪt biː raɪt/", es: "En realidad, | creo que podrías tener razón.", meaning: "A rising 'actually' followed by a pause softens a change of position, not a correction.", emoji: "🔀" },
      { term: "Anyway, | let's move on to the next point.", ipa: "/ˈɛniweɪ | lɛts muːv ɒn tuː ðə nɛkst pɔɪnt/", es: "En fin, | pasemos al siguiente punto.", meaning: "A falling 'anyway' with a pause signals the speaker is closing a topic to move forward.", emoji: "➡️" },
    ]
  },
  transitionMarkers: {
    label: '🔀 Signaling a Transition',
    items: [
      { term: "So, | to sum up, the project was a success.", ipa: "/soʊ | tuː sʌm ʌp | ðə ˈprɒdʒɛkt wəz ə səkˈsɛs/", es: "Entonces, | para resumir, el proyecto fue un éxito.", meaning: "A rising, emphasized 'so' at the start signals a shift into a conclusion.", emoji: "📝" },
      { term: "Right, | shall we get started?", ipa: "/raɪt | ʃæl wiː ɡɛt ˈstɑːrtɪd/", es: "Bien, | ¿empezamos?", meaning: "A crisp, falling 'right' signals the speaker is closing small talk and moving to business.", emoji: "▶️" },
      { term: "Now, | as for the budget...", ipa: "/naʊ | əz fɔːr ðə ˈbʌdʒɪt/", es: "Ahora, | en cuanto al presupuesto...", meaning: "A rising 'now' signals a shift to a new subtopic within the same conversation.", emoji: "💰" },
      { term: "Anyway, | how was your weekend?", ipa: "/ˈɛniweɪ | haʊ wəz jɔːr ˈwiːkɛnd/", es: "En fin, | ¿cómo estuvo tu fin de semana?", meaning: "A light, quick 'anyway' signals a return to casual conversation after a digression.", emoji: "💬" },
      { term: "That said, | there's still work to do.", ipa: "/ðæt sɛd | ðɛrz stɪl wɜːrk tuː duː/", es: "Dicho eso, | todavía queda trabajo por hacer.", meaning: "A falling 'that said' signals a shift back after a concession, reasserting the main point.", emoji: "⚠️" },
      { term: "Moving on, | let's talk about next steps.", ipa: "/ˈmuːvɪŋ ɒn | lɛts tɔːk əˈbaʊt nɛkst stɛps/", es: "Continuando, | hablemos de los próximos pasos.", meaning: "A brisk, falling tone on 'moving on' signals a deliberate topic change in a meeting.", emoji: "👣" },
      { term: "Meanwhile, | back at the office...", ipa: "/ˈmiːnwaɪl | bæk ət ði ˈɒfɪs/", es: "Mientras tanto, | de vuelta en la oficina...", meaning: "A rising 'meanwhile' signals a shift in time or place within a narrative.", emoji: "🏢" },
      { term: "By the way, | did you hear about the merger?", ipa: "/baɪ ðə weɪ | dɪd juː hɪr əˈbaʊt ðə ˈmɜːrdʒər/", es: "Por cierto, | ¿supiste de la fusión?", meaning: "A rising 'by the way' signals a related but slightly off-topic addition.", emoji: "💡" },
      { term: "Alright, | let's wrap this up.", ipa: "/ɔːlˈraɪt | lɛtsræp ðɪs ʌp/", es: "Bien, | terminemos con esto.", meaning: "A firm, falling 'alright' signals the speaker is initiating a closing.", emoji: "🏁" },
      { term: "So then, | what happened next?", ipa: "/soʊ ðɛn | wɒt ˈhæpənd nɛkst/", es: "Entonces, | ¿qué pasó después?", meaning: "A rising 'so then' prompts the listener to continue a story.", emoji: "❓" },
    ]
  },
  clarificationMarkers: {
    label: '💡 Clarifying & Rephrasing',
    items: [
      { term: "I mean, | it's not that simple.", ipa: "/aɪ miːn | ɪts nɒt ðæt ˈsɪmpəl/", es: "Digo, | no es tan simple.", meaning: "A falling 'I mean' signals the speaker is about to rephrase or add nuance to what was just said.", emoji: "🔍" },
      { term: "What I'm trying to say is, | we need more time.", ipa: "/wɒt aɪm ˈtraɪɪŋ tuː seɪ ɪz | wiː niːd mɔːr taɪm/", es: "Lo que trato de decir es, | necesitamos más tiempo.", meaning: "A level tone through this whole phrase signals the speaker is building up to a clearer restatement.", emoji: "🎯" },
      { term: "In other words, | we're starting over.", ipa: "/ɪn ˈʌðər wɜːrdz | wɪər ˈstɑːrtɪŋ ˈoʊvər/", es: "En otras palabras, | estamos empezando de nuevo.", meaning: "A falling 'in other words' signals a simpler restatement of a complex point.", emoji: "🔄" },
      { term: "That is, | the version we saw last week.", ipa: "/ðæt ɪz | ðə ˈvɜːrʒən wiː sɔː lɑːst wiːk/", es: "Es decir, | la versión que vimos la semana pasada.", meaning: "A quick, falling 'that is' adds a precise clarification right after a vague reference.", emoji: "📎" },
      { term: "To put it another way, | it's a risk worth taking.", ipa: "/tuː pʊt ɪt əˈnʌðər weɪ | ɪts ə rɪsk wɜːrθ ˈteɪkɪŋ/", es: "Dicho de otra forma, | es un riesgo que vale la pena tomar.", meaning: "A rising then falling tone signals a fresh angle on the same idea, not new information.", emoji: "🔀" },
      { term: "Basically, | we're out of options.", ipa: "/ˈbeɪsɪkli | wɪər aʊt ʌv ˈɒpʃənz/", es: "Básicamente, | no tenemos más opciones.", meaning: "A falling 'basically' signals the speaker is boiling a complex situation down to its core.", emoji: "⬇️" },
      { term: "Sorry, | let me rephrase that.", ipa: "/ˈsɒri | lɛt miː riːˈfreɪz ðæt/", es: "Perdón, | déjame reformular eso.", meaning: "A quick, apologetic 'sorry' signals self-correction, not an apology for wrongdoing.", emoji: "😅" },
      { term: "What I meant was, | I'll be a bit late.", ipa: "/wɒt aɪ mɛnt wəz | aɪl biː ə bɪt leɪt/", es: "Lo que quise decir fue, | llegaré un poco tarde.", meaning: "A level tone signals a gentle correction of a possible misunderstanding.", emoji: "🕓" },
      { term: "Or rather, | it was mostly my idea.", ipa: "/ɔːr ˈræðər | ɪt wəz ˈmoʊstli maɪ aɪˈdɪə/", es: "O más bien, | fue mayormente idea mía.", meaning: "A rising 'or rather' signals an on-the-spot self-correction mid-sentence.", emoji: "✏️" },
      { term: "Put simply, | the plan failed.", ipa: "/pʊt ˈsɪmpli | ðə plæn feɪld/", es: "Dicho de forma simple, | el plan fracasó.", meaning: "A falling 'put simply' signals a blunt, condensed summary is coming.", emoji: "📌" },
    ]
  },
  agreementCheckMarkers: {
    label: '✅ Checking & Confirming',
    items: [
      { term: "Right?", ipa: "/raɪt/", es: "¿Verdad?", meaning: "A sharply rising 'right?' at the end of a sentence checks the listener agrees.", emoji: "❓" },
      { term: "That makes sense, | right?", ipa: "/ðæt meɪks sɛns | raɪt/", es: "Eso tiene sentido, | ¿verdad?", meaning: "A rising tag 'right?' after a pause invites confirmation from the listener.", emoji: "🤝" },
      { term: "You see what I mean?", ipa: "/juː siː wɒt aɪ miːn/", es: "¿Ves lo que quiero decir?", meaning: "A rising tone throughout checks understanding, not just agreement.", emoji: "👀" },
      { term: "OK? | Shall we continue?", ipa: "/oʊˈkeɪ | ʃæl wiː kənˈtɪnjuː/", es: "¿Bien? | ¿Continuamos?", meaning: "A rising 'OK?' pauses to make sure the listener is following before moving on.", emoji: "▶️" },
      { term: "It's fine, | isn't it?", ipa: "/ɪts faɪn | ˈɪzənt ɪt/", es: "Está bien, | ¿no?", meaning: "A rising tag question softens a statement into a request for agreement.", emoji: "😊" },
      { term: "We're all set then, | yeah?", ipa: "/wɪər ɔːl sɛt ðɛn | jɛə/", es: "Entonces ya quedamos, | ¿sí?", meaning: "A casual, rising 'yeah?' confirms a shared understanding before ending a conversation.", emoji: "👍" },
      { term: "You know what I'm saying?", ipa: "/juː noʊ wɒt aɪm ˈseɪɪŋ/", es: "¿Entiendes lo que digo?", meaning: "A rising tone throughout this whole phrase checks the listener is following the point.", emoji: "🗣️" },
      { term: "Does that sound fair to you?", ipa: "/dʌz ðæt saʊnd fɛr tuː juː/", es: "¿Te parece justo eso?", meaning: "A gently rising question checks agreement without pressuring the listener.", emoji: "⚖️" },
      { term: "Am I making sense?", ipa: "/æm aɪ ˈmeɪkɪŋ sɛns/", es: "¿Me estoy explicando bien?", meaning: "A rising tone checks the listener's comprehension, often used mid-explanation.", emoji: "🧩" },
      { term: "We're on the same page, | aren't we?", ipa: "/wɪər ɒn ðə seɪm peɪdʒ | ˈɑːrənt wiː/", es: "Estamos de acuerdo, | ¿no?", meaning: "A rising tag confirms mutual understanding before proceeding.", emoji: "📖" },
    ]
  }
};
