export const CATEGORIES = {
  modalHedges: {
    label: 'Modal Hedges',
    icon: '🌫️',
    options: ['might', 'will', 'must'],
    items: [
      { sentence: "This ___ be a slight overstatement, but I think it's worth considering.", correct: 'might', explain: "'Might' softens a claim, making it less direct and more tentative." },
      { sentence: "It ___ be argued that the data is inconclusive.", correct: 'could', explain: "'Could' softens an argument, presenting it as one possible view.", options: ['could', 'will', 'must'] },
      { sentence: "The results ___ suggest a correlation, though further study is needed.", correct: 'may', explain: "'May' softens a claim, hedging against overstating certainty.", options: ['may', 'will', 'must'] },
      { sentence: "This approach ___ not be suitable for every case.", correct: 'might', explain: "'Might not' softens a negative claim.", options: ['might', 'will', 'does'] },
      { sentence: "One ___ say that the policy has had mixed results.", correct: 'could', explain: "'Could say' is a hedging phrase that softens an opinion.", options: ['could', 'will', 'must'] },
      { sentence: "The findings ___ indicate a trend worth exploring.", correct: 'could', explain: "'Could' softens a claim about the findings.", options: ['could', 'will', 'must'] },
      { sentence: "This ___ well be the case, though it remains unproven.", correct: 'may', explain: "'May well be' is a hedging phrase softening a probable claim.", options: ['may', 'will', 'must'] },
      { sentence: "It ___ perhaps be more accurate to say the results are mixed.", correct: 'might', explain: "'Might perhaps' doubly softens the claim.", options: ['might', 'will', 'does'] },
      { sentence: "The evidence ___ point to a different conclusion.", correct: 'could', explain: "'Could' softens the claim about what the evidence shows.", options: ['could', 'will', 'must'] },
      { sentence: "This interpretation ___ not be entirely accurate.", correct: 'may', explain: "'May not' softens a negative claim.", options: ['may', 'will', 'does'] },
    ]
  },
  tentativeLanguage: {
    label: 'Tentative Language',
    icon: '🤔',
    options: ['it seems that', 'it is', 'it must be'],
    items: [
      { sentence: "___ the plan needs some adjustments.", correct: 'It seems that', explain: "'It seems that' softens a statement, presenting it as an impression rather than a fact." },
      { sentence: "___ this could be improved.", correct: 'It appears that', explain: "'It appears that' softens a statement as a tentative observation.", options: ['It appears that', 'It is that', 'It must be'] },
      { sentence: "___ there might be a better solution.", correct: 'I would suggest that', explain: "'I would suggest that' is a tentative way to propose an idea.", options: ['I would suggest that', 'I demand that', 'I know that'] },
      { sentence: "___ this is not the ideal outcome.", correct: 'I would argue that', explain: "'I would argue that' softens an opinion, presenting it as a viewpoint.", options: ['I would argue that', 'I know that', 'It is certain that'] },
      { sentence: "___ the results could have been different.", correct: 'It is possible that', explain: "'It is possible that' softens a claim as one possibility among others.", options: ['It is possible that', 'It is certain that', 'It is obvious that'] },
      { sentence: "___ we should reconsider the timeline.", correct: 'It might be worth considering that', explain: "This phrase tentatively proposes an idea without being forceful.", options: ['It might be worth considering that', 'We must', 'It is a fact that'] },
      { sentence: "___ this approach has some limitations.", correct: 'It could be said that', explain: "'It could be said that' softens a critical statement.", options: ['It could be said that', 'It is proven that', 'Everyone knows that'] },
      { sentence: "___ a different strategy would work better.", correct: 'I tend to think that', explain: "'I tend to think that' is a tentative way to express an opinion.", options: ['I tend to think that', 'I insist that', 'It is a fact that'] },
      { sentence: "___ the project timeline is unrealistic.", correct: 'It would seem that', explain: "'It would seem that' softens a claim as a tentative impression.", options: ['It would seem that', 'It is certain that', 'Everyone agrees that'] },
      { sentence: "___ there's room for improvement here.", correct: 'One could argue that', explain: "'One could argue that' presents an opinion tentatively.", options: ['One could argue that', 'It is a fact that', 'Nobody doubts that'] },
    ]
  },
  softeningAdverbs: {
    label: 'Softening Adverbs',
    icon: '🕊️',
    options: ['somewhat', 'extremely', 'completely'],
    items: [
      { sentence: "The results were ___ disappointing.", correct: 'somewhat', explain: "'Somewhat' softens an adjective, making the statement less absolute." },
      { sentence: "This is ___ a valid concern.", correct: 'arguably', explain: "'Arguably' softens a claim, presenting it as debatable rather than certain.", options: ['arguably', 'definitely', 'undeniably'] },
      { sentence: "The plan seems ___ flawed.", correct: 'somewhat', explain: "'Somewhat' softens the criticism.", options: ['somewhat', 'utterly', 'completely'] },
      { sentence: "This is ___ the most effective method.", correct: 'perhaps', explain: "'Perhaps' softens a strong claim about the best method.", options: ['perhaps', 'definitely', 'certainly'] },
      { sentence: "The proposal is ___ unrealistic given the timeline.", correct: 'somewhat', explain: "'Somewhat' softens the criticism of the proposal.", options: ['somewhat', 'utterly', 'completely'] },
      { sentence: "This might ___ explain the discrepancy.", correct: 'partly', explain: "'Partly' softens a causal claim, acknowledging it's not the full explanation.", options: ['partly', 'entirely', 'completely'] },
      { sentence: "The data is ___ inconclusive.", correct: 'rather', explain: "'Rather' softens the description, making it less absolute.", options: ['rather', 'entirely', 'undeniably'] },
      { sentence: "This approach is ___ more efficient.", correct: 'arguably', explain: "'Arguably' softens the comparative claim.", options: ['arguably', 'definitely', 'undoubtedly'] },
      { sentence: "The outcome was ___ unexpected.", correct: 'somewhat', explain: "'Somewhat' softens the description.", options: ['somewhat', 'utterly', 'completely'] },
      { sentence: "This explanation seems ___ plausible.", correct: 'fairly', explain: "'Fairly' softens the claim about plausibility.", options: ['fairly', 'absolutely', 'completely'] },
    ]
  },
  indirectDisagreement: {
    label: 'Indirect Disagreement',
    icon: '🙅‍♀️',
    options: ["I see your point, but", "You're wrong because", "That's completely false"],
    items: [
      { sentence: "___ I'm not sure I fully agree.", correct: "I see your point, but", explain: "This phrase softens disagreement by acknowledging the other person's view first." },
      { sentence: "___ have you considered the alternative?", correct: "That's an interesting idea, but", explain: "This phrase softens disagreement by validating the idea before questioning it.", options: ["That's an interesting idea, but", "You're wrong, so", "That's absurd, but"] },
      { sentence: "___ there might be another way to look at this.", correct: "With all due respect,", explain: "This phrase softens disagreement by showing respect before disagreeing.", options: ["With all due respect,", "Frankly,", "Obviously,"] },
      { sentence: "___ I wonder if we should look at this from a different angle.", correct: "I understand where you're coming from, but", explain: "This phrase softens disagreement by acknowledging the other view first.", options: ["I understand where you're coming from, but", "You're mistaken, so", "That's not true, so"] },
      { sentence: "___ I'm not entirely convinced.", correct: "That's a fair point, but", explain: "This phrase softens disagreement by validating the point first.", options: ["That's a fair point, but", "That's wrong, so", "Obviously not, since"] },
      { sentence: "___ could we perhaps explore other options?", correct: "While I respect your view,", explain: "This phrase softens disagreement by showing respect for the other's opinion.", options: ["While I respect your view,", "Frankly speaking,", "Clearly,"] },
      { sentence: "___ I'm inclined to think otherwise.", correct: "That said,", explain: "'That said' softens a shift into disagreement after acknowledging something.", options: ["That said,", "Wrong,", "No,"] },
      { sentence: "___ it might be worth reconsidering.", correct: "I take your point, but", explain: "This phrase softens disagreement by acknowledging the argument first.", options: ["I take your point, but", "You're incorrect, so", "That's not right, so"] },
      { sentence: "___ I'd like to offer a different perspective.", correct: "If I may,", explain: "'If I may' is a polite, softening way to introduce disagreement.", options: ["If I may,", "Listen,", "Actually, no,"] },
      { sentence: "___ I'm not sure that's the whole picture.", correct: "To some extent, yes, but", explain: "This phrase softens disagreement by partially agreeing first.", options: ["To some extent, yes, but", "Absolutely not, because", "That's false, since"] },
    ]
  }
};
