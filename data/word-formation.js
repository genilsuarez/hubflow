/**
 * Word Formation Data — build the correct derived form
 * Each item: { root, sentence (with ___), correct, explain }
 * Categories: Nouns, Adjectives, Verbs, Mixed
 */

export const CATEGORIES = {
  nouns: {
    label: 'Make Nouns',
    icon: '📦',
    items: [
      { root: 'happy', sentence: 'Money doesn\'t always bring ___.', correct: 'happiness', explain: 'happy → happiness (suffix -ness for abstract nouns)' },
      { root: 'decide', sentence: 'We need to make a ___ soon.', correct: 'decision', explain: 'decide → decision (verb → noun, suffix -sion)' },
      { root: 'achieve', sentence: 'Winning the award was a great ___.', correct: 'achievement', explain: 'achieve → achievement (suffix -ment)' },
      { root: 'differ', sentence: 'There is a big ___ between the two.', correct: 'difference', explain: 'differ → difference (suffix -ence)' },
      { root: 'perform', sentence: 'Her ___ in the exam was excellent.', correct: 'performance', explain: 'perform → performance (suffix -ance)' },
      { root: 'develop', sentence: 'The ___ of new technology takes time.', correct: 'development', explain: 'develop → development (suffix -ment)' },
      { root: 'educate', sentence: '___ is the key to a better future.', correct: 'Education', explain: 'educate → education (suffix -tion)' },
      { root: 'free', sentence: '___ of speech is a basic right.', correct: 'Freedom', explain: 'free → freedom (suffix -dom)' },
      { root: 'weak', sentence: 'His main ___ is lack of confidence.', correct: 'weakness', explain: 'weak → weakness (suffix -ness)' },
      { root: 'argue', sentence: 'They had a terrible ___ last night.', correct: 'argument', explain: 'argue → argument (suffix -ment, drop -e)' },
      { root: 'invite', sentence: 'Did you get an ___ to the party?', correct: 'invitation', explain: 'invite → invitation (suffix -ation)' },
      { root: 'know', sentence: 'He has a lot of ___ about history.', correct: 'knowledge', explain: 'know → knowledge (irregular derivation)' }
    ]
  },
  adjectives: {
    label: 'Make Adjectives',
    icon: '🎨',
    items: [
      { root: 'beauty', sentence: 'What a ___ day!', correct: 'beautiful', explain: 'beauty → beautiful (suffix -ful)' },
      { root: 'danger', sentence: 'Swimming here is very ___.', correct: 'dangerous', explain: 'danger → dangerous (suffix -ous)' },
      { root: 'care', sentence: 'Be ___ when you cross the road.', correct: 'careful', explain: 'care → careful (suffix -ful)' },
      { root: 'use', sentence: 'This tool is very ___.', correct: 'useful', explain: 'use → useful (suffix -ful)' },
      { root: 'comfort', sentence: 'This chair is very ___.', correct: 'comfortable', explain: 'comfort → comfortable (suffix -able)' },
      { root: 'create', sentence: 'She is a very ___ person.', correct: 'creative', explain: 'create → creative (suffix -ive)' },
      { root: 'hope', sentence: 'The situation looks ___.', correct: 'hopeless', explain: 'hope → hopeless (suffix -less = without)' },
      { root: 'nature', sentence: 'It looks completely ___.', correct: 'natural', explain: 'nature → natural (suffix -al)' },
      { root: 'child', sentence: 'His behaviour was very ___.', correct: 'childish', explain: 'child → childish (suffix -ish = like a child, negative)' },
      { root: 'rely', sentence: 'She is a very ___ person.', correct: 'reliable', explain: 'rely → reliable (suffix -able, y → i)' },
      { root: 'expense', sentence: 'That restaurant is too ___.', correct: 'expensive', explain: 'expense → expensive (suffix -ive)' },
      { root: 'tradition', sentence: 'It is a ___ dish in this region.', correct: 'traditional', explain: 'tradition → traditional (suffix -al)' }
    ]
  },
  negatives: {
    label: 'Negatives',
    icon: '🚫',
    items: [
      { root: 'possible', sentence: 'That is completely ___.', correct: 'impossible', explain: 'possible → impossible (prefix im- before p/b/m)' },
      { root: 'happy', sentence: 'She was very ___ with the result.', correct: 'unhappy', explain: 'happy → unhappy (prefix un-)' },
      { root: 'agree', sentence: 'I strongly ___ with that opinion.', correct: 'disagree', explain: 'agree → disagree (prefix dis-)' },
      { root: 'legal', sentence: 'Downloading pirated films is ___.', correct: 'illegal', explain: 'legal → illegal (prefix il- before l)' },
      { root: 'regular', sentence: 'The verb "go" is ___.', correct: 'irregular', explain: 'regular → irregular (prefix ir- before r)' },
      { root: 'patient', sentence: 'He gets ___ when he has to wait.', correct: 'impatient', explain: 'patient → impatient (prefix im- before p)' },
      { root: 'honest', sentence: 'It was ___ of him to lie.', correct: 'dishonest', explain: 'honest → dishonest (prefix dis-)' },
      { root: 'responsible', sentence: 'It was very ___ to drive so fast.', correct: 'irresponsible', explain: 'responsible → irresponsible (prefix ir- before r)' },
      { root: 'comfortable', sentence: 'These shoes are really ___.', correct: 'uncomfortable', explain: 'comfortable → uncomfortable (prefix un-)' },
      { root: 'visible', sentence: 'The stars were ___ due to clouds.', correct: 'invisible', explain: 'visible → invisible (prefix in- → before v)' },
      { root: 'polite', sentence: 'It is ___ to talk with your mouth full.', correct: 'impolite', explain: 'polite → impolite (prefix im- before p)' },
      { root: 'appear', sentence: 'The rabbit seemed to ___ into thin air.', correct: 'disappear', explain: 'appear → disappear (prefix dis-)' }
    ]
  },
  mixed: {
    label: 'Mixed',
    icon: '🔀',
    items: [
      { root: 'employ', sentence: 'The company has 500 ___.', correct: 'employees', explain: 'employ → employee (suffix -ee = person who is employed) + plural' },
      { root: 'success', sentence: 'She is a very ___ businesswoman.', correct: 'successful', explain: 'success → successful (suffix -ful)' },
      { root: 'science', sentence: 'He is a famous ___.', correct: 'scientist', explain: 'science → scientist (suffix -ist = person)' },
      { root: 'wide', sentence: 'We need to ___ the road.', correct: 'widen', explain: 'wide → widen (suffix -en = make/become)' },
      { root: 'strong', sentence: 'Exercise will ___ your muscles.', correct: 'strengthen', explain: 'strong → strengthen (suffix -en = make/become)' },
      { root: 'long', sentence: 'What is the ___ of this room?', correct: 'length', explain: 'long → length (irregular noun form)' },
      { root: 'advise', sentence: 'Can you give me some ___?', correct: 'advice', explain: 'advise (verb) → advice (noun). Note: s → c.' },
      { root: 'breath', sentence: 'I need to ___ deeply.', correct: 'breathe', explain: 'breath (noun) → breathe (verb). Add -e.' },
      { root: 'high', sentence: 'The ___ of the building is 50 metres.', correct: 'height', explain: 'high → height (irregular noun form)' },
      { root: 'popular', sentence: 'The ___ of that song is incredible.', correct: 'popularity', explain: 'popular → popularity (suffix -ity)' },
      { root: 'imagine', sentence: 'Children have a wonderful ___.', correct: 'imagination', explain: 'imagine → imagination (suffix -ation)' },
      { root: 'simple', sentence: 'Let me ___ the explanation.', correct: 'simplify', explain: 'simple → simplify (suffix -ify = make)' }
    ]
  }
};
