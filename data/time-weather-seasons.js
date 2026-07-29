export const CATEGORIES = {
  timeOfDay: {
    label: "🌅 Time of Day",
    hasOrder: true,
    items: [
      { term: "Dawn", ipa: "/dɔːn/", time: "4:00–6:00 AM", meaning: "First light before sunrise", emoji: "🌅", order: 1 },
      { term: "Sunrise", ipa: "/ˈsʌnraɪz/", time: "6:00–8:00 AM", meaning: "The sun appears above the horizon", emoji: "🌄", order: 2 },
      { term: "Morning", ipa: "/ˈmɔːrnɪŋ/", time: "8:00–10:00 AM", meaning: "Early part of the day", emoji: "☀️", order: 3 },
      { term: "Forenoon", ipa: "/ˌfɔːrˈnuːn/", time: "10:00 AM–12 PM", meaning: "Late morning, before noon", emoji: "🌤️", order: 4 },
      { term: "Noon", ipa: "/nuːn/", time: "12:00–1:00 PM", meaning: "Midday, sun at its highest", emoji: "☀️", order: 5 },
      { term: "Afternoon", ipa: "/ˌæftərˈnuːn/", time: "1:00–4:00 PM", meaning: "Between noon and evening", emoji: "🌇", order: 6 },
      { term: "Dusk", ipa: "/dʌsk/", time: "4:00–6:00 PM", meaning: "Sky darkens as the sun sets", emoji: "🌆", order: 7 },
      { term: "Twilight", ipa: "/ˈtwaɪlaɪt/", time: "6:00–8:00 PM", meaning: "Faint light after sunset", emoji: "🌇", order: 8 },
      { term: "Evening", ipa: "/ˈiːvnɪŋ/", time: "8:00–10:00 PM", meaning: "Late part of the day", emoji: "🌃", order: 9 },
      { term: "Night", ipa: "/naɪt/", time: "10:00 PM–12 AM", meaning: "Dark hours, most people sleep", emoji: "🌙", order: 10 },
      { term: "Midnight", ipa: "/ˈmɪdnaɪt/", time: "12:00–4:00 AM", meaning: "Middle of the night", emoji: "🌑", order: 11 },
      { term: "The Small Hours", ipa: "/ðə smɔːl ˈaʊərz/", es: "La madrugada", meaning: "The hours just after midnight", emoji: "🕐", example: "We talked into the small hours." },
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
      { term: "Humid", ipa: "/ˈhjuːmɪd/", es: "Húmedo", meaning: "A lot of moisture in the air, feels sticky", emoji: "💧", example: "It's so humid I'm sweating." },
      { term: "Freezing", ipa: "/ˈfriːzɪŋ/", es: "Helado", meaning: "Extremely cold, below 0°C", emoji: "🥶", example: "It's freezing — the pond has ice!" },
      { term: "Scorching", ipa: "/ˈskɔːrtʃɪŋ/", es: "Abrasador", meaning: "Extremely hot", emoji: "🔥", example: "A scorching 40°C day in August." },
    ]
  },
  seasons: {
    label: "🍂 Seasons",
    items: [
      { term: "Spring", ipa: "/sprɪŋ/", es: "Primavera", meaning: "Season of new growth, flowers bloom", emoji: "🌸", extra: "March – May" },
      { term: "Summer", ipa: "/ˈsʌmər/", es: "Verano", meaning: "Warmest season, longest days", emoji: "☀️", extra: "June – August" },
      { term: "Autumn", ipa: "/ˈɔːtəm/", es: "Otoño", meaning: "Leaves fall, temperatures cool (Fall)", emoji: "🍂", extra: "Sep – November" },
      { term: "Winter", ipa: "/ˈwɪntər/", es: "Invierno", meaning: "Coldest season, shortest days", emoji: "❄️", extra: "Dec – February" },
      { term: "Dry season", ipa: "/draɪ ˈsiːzən/", es: "Temporada seca", meaning: "Period with little to no rainfall", emoji: "🏜️", extra: "Tropical climates" },
      { term: "Wet season", ipa: "/wɛt ˈsiːzən/", es: "Temporada lluviosa", meaning: "Period of heavy rainfall", emoji: "🌊", extra: "Tropical climates" },
      { term: "Solstice", ipa: "/ˈsɒlstɪs/", es: "Solsticio", meaning: "Longest or shortest day of the year", emoji: "🌞", extra: "~Jun 21 / ~Dec 21" },
      { term: "Equinox", ipa: "/ˈiːkwɪnɒks/", es: "Equinoccio", meaning: "Day and night are equal length", emoji: "⚖️", extra: "~Mar 20 / ~Sep 22" },
      { term: "Harvest", ipa: "/ˈhɑːrvɪst/", es: "Cosecha", meaning: "The time when crops are gathered", emoji: "🌾", extra: "Late summer/autumn" },
      { term: "Frost", ipa: "/frɒst/", es: "Escarcha", meaning: "Thin ice crystals that form on cold surfaces", emoji: "🥶", extra: "Winter mornings" },
      { term: "Bloom", ipa: "/bluːm/", es: "Floración", meaning: "When flowers open in spring", emoji: "🌸", extra: "Spring event" },
      { term: "Heatwave", ipa: "/ˈhiːtweɪv/", es: "Ola de calor", meaning: "A prolonged period of abnormally hot weather", emoji: "🥵", extra: "Summer extreme" },
      { term: "Monsoon", ipa: "/mɒnˈsuːn/", es: "Monzón", meaning: "Seasonal wind bringing heavy rain", emoji: "🌧️", extra: "Tropical regions" },
    ]
  },
};
