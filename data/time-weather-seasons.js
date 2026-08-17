export const CATEGORIES = {
  timeOfDay: {
    label: "🌅 Time of Day",
    hasOrder: true,
    items: [
      { term: "Dawn", ipa: "/dɔːn/", es: "Alba", time: "4:00–6:00 AM", meaning: "First light before sunrise", emoji: "🌅", order: 1, example: "We left the house before dawn." },
      { term: "Sunrise", ipa: "/ˈsʌnraɪz/", es: "Amanecer", time: "6:00–8:00 AM", meaning: "The sun appears above the horizon", emoji: "🌄", order: 2, example: "The sunrise over the sea was beautiful." },
      { term: "Morning", ipa: "/ˈmɔːrnɪŋ/", es: "Mañana", time: "8:00–10:00 AM", meaning: "Early part of the day", emoji: "☀️", order: 3, example: "I run every morning before breakfast." },
      { term: "Forenoon", ipa: "/ˌfɔːrˈnuːn/", es: "Media mañana", time: "10:00 AM–12 PM", meaning: "Late morning, before noon", emoji: "🌤️", order: 4, example: "The meeting is set for the forenoon." },
      { term: "Noon", ipa: "/nuːn/", es: "Mediodía", time: "12:00–1:00 PM", meaning: "Midday, sun at its highest", emoji: "☀️", order: 5, example: "Let's meet at noon for lunch." },
      { term: "Afternoon", ipa: "/ˌæftərˈnuːn/", es: "Tarde", time: "1:00–4:00 PM", meaning: "Between noon and evening", emoji: "🌇", order: 6, example: "She sleeps for an hour every afternoon." },
      { term: "Dusk", ipa: "/dʌsk/", es: "Anochecer", time: "4:00–6:00 PM", meaning: "Sky darkens as the sun sets", emoji: "🌆", order: 7, example: "The birds return to the trees at dusk." },
      { term: "Twilight", ipa: "/ˈtwaɪlaɪt/", es: "Crepúsculo", time: "6:00–8:00 PM", meaning: "Faint light after sunset", emoji: "🌇", order: 8, example: "We walked home in the twilight." },
      { term: "Evening", ipa: "/ˈiːvnɪŋ/", es: "Noche", time: "8:00–10:00 PM", meaning: "Late part of the day", emoji: "🌃", order: 9, example: "We watch a film every evening." },
      { term: "Night", ipa: "/naɪt/", es: "Noche cerrada", time: "10:00 PM–12 AM", meaning: "Dark hours, most people sleep", emoji: "🌙", order: 10, example: "The city is very quiet at night." },
    ]
  },
  weather: {
    label: "🌤️ Weather",
    items: [
      { term: "Sunny", ipa: "/ˈsʌni/", es: "Soleado", meaning: "Clear sky, bright sunshine", emoji: "☀️", example: "It's sunny today, wear sunscreen!" },
      { term: "Cloudy", ipa: "/ˈklaʊdi/", es: "Nublado", meaning: "Sky covered with clouds, no rain", emoji: "☁️", example: "A cloudy afternoon with no sun." },
      { term: "Overcast", ipa: "/ˌoʊvərˈkæst/", es: "Cubierto", meaning: "Completely covered by thick grey clouds", emoji: "🌥️", example: "The sky is overcast — looks like rain." },
      { term: "Foggy", ipa: "/ˈfɒɡi/", es: "Con niebla", meaning: "Low visibility due to thick mist", emoji: "🌫️", example: "Be careful driving, it's very foggy." },
      { term: "Rainy", ipa: "/ˈreɪni/", es: "Lluvioso", meaning: "Water falling from clouds", emoji: "🌧️", example: "It's been rainy all week." },
      { term: "Drizzle", ipa: "/ˈdrɪzəl/", es: "Llovizna", meaning: "Very light, fine rain", emoji: "🌦️", example: "Just a drizzle, no umbrella needed." },
      { term: "Stormy", ipa: "/ˈstɔːrmi/", es: "Tormentoso", meaning: "Heavy rain with thunder and lightning", emoji: "⛈️", example: "A stormy night with loud thunder." },
      { term: "Windy", ipa: "/ˈwɪndi/", es: "Ventoso", meaning: "Strong air movement", emoji: "💨", example: "Hold your hat — it's really windy!" },
      { term: "Breezy", ipa: "/ˈbriːzi/", es: "Con brisa", meaning: "Light, pleasant wind", emoji: "🍃", example: "A breezy afternoon by the coast." },
      { term: "Snowy", ipa: "/ˈsnoʊi/", es: "Nevado", meaning: "Snow falling from the sky", emoji: "🌨️", example: "It's snowy — let's make a snowman!" },
      { term: "Humid", ipa: "/ˈhjuːmɪd/", es: "Húmedo", meaning: "High moisture in the air, feels sticky", emoji: "💦", example: "It's so humid today, I'm sweating." },
      { term: "Hail", ipa: "/heɪl/", es: "Granizo", meaning: "Small balls of ice falling from the sky", emoji: "🧊", example: "The hail damaged some car windows." },
      { term: "Thunder", ipa: "/ˈθʌndər/", es: "Trueno", meaning: "Loud sound after lightning", emoji: "⚡", example: "I heard thunder in the distance." },
      { term: "Frosty", ipa: "/ˈfrɒsti/", es: "Con escarcha", meaning: "Cold enough for ice crystals to form", emoji: "❄️", example: "A frosty morning — the grass was white." },
      { term: "Muggy", ipa: "/ˈmʌɡi/", es: "Bochornoso", meaning: "Uncomfortably warm and humid", emoji: "🥵", example: "It's muggy tonight, hard to sleep." },
    ]
  },
  seasons: {
    label: "🍂 Seasons",
    items: [
      { term: "Spring", ipa: "/sprɪŋ/", es: "Primavera", meaning: "Season of new growth, flowers bloom", emoji: "🌸", extra: "March – May", example: "The garden looks best in spring." },
      { term: "Summer", ipa: "/ˈsʌmər/", es: "Verano", meaning: "Warmest season, longest days", emoji: "☀️", extra: "June – August", example: "We go to the beach every summer." },
      { term: "Autumn", ipa: "/ˈɔːtəm/", es: "Otoño", meaning: "Leaves fall, temperatures cool (Fall)", emoji: "🍂", extra: "Sep – November", example: "The leaves turn red in autumn." },
      { term: "Winter", ipa: "/ˈwɪntər/", es: "Invierno", meaning: "Coldest season, shortest days", emoji: "❄️", extra: "Dec – February", example: "Winter here is cold and very long." },
      { term: "Dry season", ipa: "/draɪ ˈsiːzən/", es: "Temporada seca", meaning: "Period with little to no rainfall", emoji: "🏜️", extra: "Tropical climates", example: "Rivers get low in the dry season." },
      { term: "Wet season", ipa: "/wɛt ˈsiːzən/", es: "Temporada lluviosa", meaning: "Period of heavy rainfall", emoji: "🌊", extra: "Tropical climates", example: "Roads flood during the wet season." },
      { term: "Solstice", ipa: "/ˈsɒlstɪs/", es: "Solsticio", meaning: "Longest or shortest day of the year", emoji: "🌞", extra: "~Jun 21 / ~Dec 21", example: "The summer solstice is the longest day." },
      { term: "Equinox", ipa: "/ˈiːkwɪnɒks/", es: "Equinoccio", meaning: "Day and night are equal length", emoji: "⚖️", extra: "~Mar 20 / ~Sep 22", example: "Day and night are equal at the equinox." },
      { term: "Harvest", ipa: "/ˈhɑːrvɪst/", es: "Cosecha", meaning: "The time when crops are gathered", emoji: "🌾", extra: "Late summer/autumn", example: "The harvest starts in late September." },
      { term: "Frost", ipa: "/frɒst/", es: "Escarcha", meaning: "Thin ice crystals that form on cold surfaces", emoji: "🥶", extra: "Winter mornings", example: "There was frost on the car windows." },
      { term: "Monsoon", ipa: "/mɒnˈsuːn/", es: "Monzón", meaning: "Seasonal heavy rains in South Asia", emoji: "🌧️", extra: "Summer months", example: "The monsoon brings rain for weeks." },
      { term: "Blossom", ipa: "/ˈblɒsəm/", es: "Florecer / flor", meaning: "Flowers opening in spring", emoji: "🌷", extra: "Early spring", example: "The cherry trees are in blossom." },
      { term: "Foliage", ipa: "/ˈfoʊliɪdʒ/", es: "Follaje", meaning: "Leaves of trees, especially in autumn colors", emoji: "🍁", extra: "Autumn", example: "Tourists come to see the autumn foliage." },
      { term: "Thaw", ipa: "/θɔː/", es: "Deshielo", meaning: "Ice or snow melting as it gets warmer", emoji: "🌡️", extra: "Late winter", example: "The thaw turned the snow into water." },
      { term: "Bloom", ipa: "/bluːm/", es: "Floración", meaning: "The period when flowers are open", emoji: "🌼", extra: "Spring", example: "The roses are in full bloom." },
    ]
  },
};
