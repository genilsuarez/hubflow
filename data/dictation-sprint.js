/**
 * HubFlow — Dictation Sprint Data
 * Categories: Everyday (A2), Work & Travel (B1), Opinions & News (B1-B2), Academic (B2)
 *
 * Each entry:
 *   sentence: string — the correct sentence (what TTS will read)
 *   keywords: string[] — critical words for partial scoring (bonus if all correct)
 *   hint: string — optional context clue shown before listening
 */

export const CATEGORIES = {
  everyday: {
    label: 'Everyday',
    icon: '🏠',
    level: 'A2',
    rate: 0.9,
    items: [
      { sentence: "I usually wake up at seven o'clock and have breakfast with my family.", keywords: ["usually", "wake", "seven", "breakfast", "family"], hint: "Daily routine" },
      { sentence: "Could you please turn off the lights before you leave the room?", keywords: ["please", "turn", "lights", "before", "leave"], hint: "Polite request" },
      { sentence: "She doesn't like coffee, but she drinks a lot of green tea.", keywords: ["doesn't", "coffee", "drinks", "green", "tea"], hint: "Preferences" },
      { sentence: "We're going to the supermarket because we need to buy some vegetables.", keywords: ["going", "supermarket", "because", "need", "vegetables"], hint: "Shopping" },
      { sentence: "The weather was terrible yesterday, so we stayed at home all day.", keywords: ["weather", "terrible", "yesterday", "stayed", "home"], hint: "Weather" },
      { sentence: "My brother is taller than me, but I'm faster than him.", keywords: ["brother", "taller", "than", "faster", "him"], hint: "Comparisons" },
      { sentence: "There are three bedrooms, a kitchen, and a small garden in our house.", keywords: ["three", "bedrooms", "kitchen", "garden", "house"], hint: "Home description" },
      { sentence: "We had a wonderful time at the beach last weekend.", keywords: ["wonderful", "time", "beach", "last", "weekend"], hint: "Past event" },
      { sentence: "He's been working at the same company since he finished university.", keywords: ["been", "working", "same", "since", "finished"], hint: "Work history" },
      { sentence: "I need to go to the pharmacy to buy some medicine for my headache.", keywords: ["need", "pharmacy", "buy", "medicine", "headache"], hint: "Health" }
    ]
  },
  work: {
    label: 'Work & Travel',
    icon: '💼',
    level: 'B1',
    rate: 0.85,
    items: [
      { sentence: "The meeting has been postponed until next Thursday because the director is travelling.", keywords: ["meeting", "postponed", "Thursday", "director", "travelling"], hint: "Schedule change" },
      { sentence: "I'd like to book a return flight to Barcelona, departing on the fifteenth of March.", keywords: ["book", "return", "flight", "departing", "fifteenth"], hint: "Travel booking" },
      { sentence: "Could you send me the report by Friday? I need to review it before the presentation.", keywords: ["send", "report", "Friday", "review", "presentation"], hint: "Work deadline" },
      { sentence: "We've been experiencing some technical difficulties with the system since this morning.", keywords: ["experiencing", "technical", "difficulties", "system", "morning"], hint: "IT problem" },
      { sentence: "The flight was delayed by two hours due to bad weather conditions.", keywords: ["flight", "delayed", "hours", "weather", "conditions"], hint: "Travel disruption" },
      { sentence: "She was promoted to senior manager after working there for just three years.", keywords: ["promoted", "senior", "manager", "working", "three"], hint: "Career" },
      { sentence: "The deadline for submitting the proposal has been extended until the end of the month.", keywords: ["deadline", "submitting", "proposal", "extended", "month"], hint: "Work update" },
      { sentence: "Passengers are advised to arrive at the airport at least two hours before departure.", keywords: ["passengers", "advised", "airport", "hours", "departure"], hint: "Travel advice" },
      { sentence: "I've attached the revised budget to this email for your approval.", keywords: ["attached", "revised", "budget", "email", "approval"], hint: "Email language" },
      { sentence: "Unfortunately, the position has already been filled by another candidate.", keywords: ["unfortunately", "position", "filled", "another", "candidate"], hint: "Job application" }
    ]
  },
  opinions: {
    label: 'Opinions & News',
    icon: '📰',
    level: 'B1–B2',
    rate: 0.82,
    items: [
      { sentence: "In my opinion, social media has both positive and negative effects on young people.", keywords: ["opinion", "social", "media", "positive", "negative"], hint: "Expressing views" },
      { sentence: "According to recent studies, regular exercise can significantly improve mental health.", keywords: ["according", "studies", "exercise", "significantly", "mental"], hint: "Research findings" },
      { sentence: "I strongly believe that education should be accessible to everyone regardless of income.", keywords: ["strongly", "believe", "education", "accessible", "regardless"], hint: "Social issue" },
      { sentence: "Although many people disagree, I think remote working is more productive than office work.", keywords: ["although", "disagree", "remote", "productive", "office"], hint: "Work debate" },
      { sentence: "Scientists have warned that climate change could lead to more extreme weather events.", keywords: ["scientists", "warned", "climate", "extreme", "weather"], hint: "Environment" },
      { sentence: "On the one hand, technology makes life easier; on the other hand, it can be addictive.", keywords: ["one", "hand", "technology", "other", "addictive"], hint: "Balanced argument" },
      { sentence: "The survey revealed that the majority of respondents support stricter environmental regulations.", keywords: ["survey", "revealed", "majority", "support", "regulations"], hint: "Poll results" },
      { sentence: "It's widely accepted that learning a second language improves cognitive abilities.", keywords: ["widely", "accepted", "learning", "language", "cognitive"], hint: "Language learning" },
      { sentence: "Despite the economic downturn, unemployment rates have actually decreased this quarter.", keywords: ["despite", "economic", "unemployment", "decreased", "quarter"], hint: "Economic news" },
      { sentence: "Many experts argue that artificial intelligence will transform the job market within a decade.", keywords: ["experts", "argue", "artificial", "intelligence", "transform"], hint: "Technology future" },
    ]
  },
  academic: {
    label: 'Academic',
    icon: '🎓',
    level: 'B2',
    rate: 0.78,
    items: [
      { sentence: "The findings of this research indicate a strong correlation between sleep deprivation and poor academic performance.", keywords: ["findings", "research", "correlation", "deprivation", "performance"], hint: "Research conclusion" },
      { sentence: "It is essential that all participants sign the consent form before the experiment begins.", keywords: ["essential", "participants", "consent", "form", "experiment"], hint: "Research ethics" },
      { sentence: "The author argues convincingly that economic growth alone does not guarantee social progress.", keywords: ["argues", "convincingly", "economic", "guarantee", "progress"], hint: "Critical analysis" },
      { sentence: "Further investigation is required to determine whether these results can be replicated.", keywords: ["investigation", "required", "determine", "results", "replicated"], hint: "Research limitation" },
      { sentence: "One of the main limitations of this study is the relatively small sample size.", keywords: ["limitations", "study", "relatively", "small", "sample"], hint: "Methodology" },
      { sentence: "The hypothesis was rejected because the experimental results did not support the initial predictions.", keywords: ["hypothesis", "rejected", "experimental", "results", "predictions"], hint: "Scientific method" },
      { sentence: "In conclusion, the evidence overwhelmingly supports the implementation of preventive measures.", keywords: ["conclusion", "evidence", "overwhelmingly", "implementation", "preventive"], hint: "Paper conclusion" },
      { sentence: "The results demonstrate a statistically significant difference between the two treatment conditions.", keywords: ["results", "demonstrate", "statistically", "significant", "conditions"], hint: "Statistical analysis" },
      { sentence: "It is worth noting that these conclusions are based on a limited geographical sample.", keywords: ["worth", "noting", "conclusions", "limited", "geographical"], hint: "Hedging" },
      { sentence: "This theory has been widely criticised for its lack of empirical evidence and methodological rigour.", keywords: ["theory", "criticised", "lack", "empirical", "rigour"], hint: "Academic critique" }
    ]
  }
};
