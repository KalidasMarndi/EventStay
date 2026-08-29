/**
 * Centralized Destination Data
 * ─────────────────────────────
 * Single source of truth for all destination content across the platform.
 * Used by: Home carousel, /destinations grid, navbar, detail pages.
 */

export interface Destination {
  id: string;
  name: string;
  country: string;
  location: string;
  image: string;
  heroImage: string;
  description: string;
  tagline: string;
  category: string;
  bestTime: string;
  activities: string[];
  gallery: string[];
  rating: string;
  idealFor: string;
  duration: string;
  groupSize: string;
}

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    location: "Cyclades, Aegean Sea",
    tagline: "Whitewashed cliffs above the Aegean",
    category: "Island Escape",
    idealFor: "Destination Weddings",
    duration: "3–5 days",
    groupSize: "30–150 guests",
    bestTime: "May–October",
    rating: "4.9",
    description:
      "Volcanic sunsets, cobalt domes, and cliffside villas make this the ultimate Mediterranean dream. Perfect for intimate destination weddings and luxury group celebrations overlooking the caldera.",
    activities: ["Sunset catamaran cruise", "Wine tasting in Oia", "Volcanic hot springs", "Private villa dinner"],
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    location: "Kansai Region",
    tagline: "Ancient temples, timeless beauty",
    category: "Cultural Heritage",
    idealFor: "Corporate Offsites",
    duration: "4–6 days",
    groupSize: "20–80 guests",
    bestTime: "March–May, October–November",
    rating: "4.8",
    description:
      "Bamboo groves, golden pavilions, and centuries of tradition in Japan's spiritual heart. An inspiring backdrop for leadership retreats and cultural team experiences.",
    activities: ["Bamboo grove walk", "Tea ceremony", "Temple meditation", "Kaiseki dinner"],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    location: "Graubünden, Valais",
    tagline: "Where peaks touch the sky",
    category: "Mountain Adventure",
    idealFor: "Incentive Travel",
    duration: "3–5 days",
    groupSize: "20–100 guests",
    bestTime: "June–September, December–March",
    rating: "4.9",
    description:
      "Pristine glaciers, wildflower meadows, and world-class alpine experiences above the clouds. Perfect for high-altitude conferences and breathtaking winter celebrations.",
    activities: ["Alpine hiking", "Glacier excursion", "Fondue evening", "Scenic rail journey"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "cappadocia",
    name: "Cappadocia",
    country: "Turkey",
    location: "Nevşehir Province",
    tagline: "Hot air balloons over fairy chimneys",
    category: "Unique Landscape",
    idealFor: "Luxury Experiences",
    duration: "2–4 days",
    groupSize: "20–80 guests",
    bestTime: "April–June, September–November",
    rating: "4.7",
    description:
      "Surreal rock formations, ancient cave dwellings, and dawn balloon flights you will never forget. A once-in-a-lifetime setting for exclusive group events.",
    activities: ["Hot air balloon ride", "Cave hotel stay", "Valley hike", "Turkish pottery workshop"],
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642002312098-0cfb6a6f0b7c?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    location: "Lesser Sunda Islands",
    tagline: "Island of gods and green terraces",
    category: "Tropical Retreat",
    idealFor: "Corporate Offsites",
    duration: "4–7 days",
    groupSize: "20–150 guests",
    bestTime: "April–October",
    rating: "4.8",
    description:
      "Sacred temples, emerald rice paddies, and a spiritual warmth that draws the world. Ideal for team retreats seeking inspiration and transformation.",
    activities: ["Rice terrace walk", "Surf lesson", "Temple ceremony", "Balinese cooking class"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    location: "Alberta, Canadian Rockies",
    tagline: "Turquoise lakes cradled by Rockies",
    category: "Wilderness",
    idealFor: "Incentive Travel",
    duration: "3–5 days",
    groupSize: "20–100 guests",
    bestTime: "June–September",
    rating: "4.9",
    description:
      "Mirror-still lakes, towering peaks, and the raw majesty of the Canadian Rockies. Perfect for leadership retreats that inspire greatness.",
    activities: ["Lake Louise canoe", "Gondola ride", "Bear-watching safari", "Hot springs soak"],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    location: "Campania, Southern Italy",
    tagline: "Dramatic cliffs meet the Mediterranean",
    category: "Coastal Luxury",
    idealFor: "Destination Weddings",
    duration: "3–5 days",
    groupSize: "30–200 guests",
    bestTime: "May–September",
    rating: "4.8",
    description:
      "Pastel villages cling to cliffs above azure waters along Italy's most iconic coastline. A timeless setting for romantic celebrations and elegant corporate gatherings.",
    activities: ["Positano boat tour", "Limoncello tasting", "Cooking class", "Coastal hike"],
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff90e?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1533104816931-20fa691ff90e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1533104816931-20fa691ff90e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    location: "Marrakech-Safi Region",
    tagline: "A tapestry of color and spice",
    category: "Cultural Immersion",
    idealFor: "Group Celebrations",
    duration: "3–5 days",
    groupSize: "30–200 guests",
    bestTime: "March–May, September–November",
    rating: "4.6",
    description:
      "Ancient medinas, intricate mosaics, and the intoxicating rhythm of North African life. A sensory feast for unforgettable group events.",
    activities: ["Medina walking tour", "Riad cooking class", "Sahara excursion", "Hammam spa"],
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    location: "Indian Ocean",
    tagline: "Overwater villas in endless blue",
    category: "Beach Paradise",
    idealFor: "Luxury Experiences",
    duration: "4–7 days",
    groupSize: "20–80 guests",
    bestTime: "November–April",
    rating: "4.9",
    description:
      "Crystal lagoons, private sandbanks, and the purest turquoise water on Earth. The ultimate setting for exclusive retreats and honeymoon celebrations.",
    activities: ["Snorkeling safari", "Sunset dolphin cruise", "Private sandbank dinner", "Diving"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Chile",
    location: "Southern Chile & Argentina",
    tagline: "The edge of the world",
    category: "Epic Wilderness",
    idealFor: "Adventure Groups",
    duration: "5–7 days",
    groupSize: "10–60 guests",
    bestTime: "October–March",
    rating: "4.7",
    description:
      "Jagged granite towers, ancient glaciers, and raw wilderness at the bottom of the Americas. For groups seeking the extraordinary.",
    activities: ["Torres del Paine trek", "Glacier kayaking", "Horse riding", "Stargazing"],
    image: "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "iceland",
    name: "Iceland",
    country: "Iceland",
    location: "North Atlantic",
    tagline: "Fire, ice, and northern lights",
    category: "Adventure",
    idealFor: "Incentive Travel",
    duration: "4–6 days",
    groupSize: "15–80 guests",
    bestTime: "June–August, September–March (Aurora)",
    rating: "4.8",
    description:
      "Volcanic landscapes, glacial rivers, and the ethereal dance of the aurora borealis. An otherworldly canvas for transformative group experiences.",
    activities: ["Northern lights hunt", "Glacier walk", "Blue Lagoon", "Whale watching"],
    image: "https://images.unsplash.com/photo-1520638531121-7eec00cffc16?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1520638531121-7eec00cffc16?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1520638531121-7eec00cffc16?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    location: "Persian Gulf",
    tagline: "Futuristic skylines in the desert",
    category: "City & Conference",
    idealFor: "MICE & Conferences",
    duration: "2–4 days",
    groupSize: "30–500 guests",
    bestTime: "November–March",
    rating: "4.7",
    description:
      "Record-breaking architecture, luxury resorts, and limitless ambition rising from golden sands. The world's premier destination for high-impact business events.",
    activities: ["Desert safari", "Burj Khalifa experience", "Yacht charter", "Souq exploration"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    location: "South Island, Otago",
    tagline: "Adventure capital of the south",
    category: "Adventure",
    idealFor: "Corporate Offsites",
    duration: "4–6 days",
    groupSize: "15–100 guests",
    bestTime: "December–March, June–August (Skiing)",
    rating: "4.9",
    description:
      "Emerald lakes, snow-capped peaks, and adrenaline-fueled experiences in Middle-earth. The perfect blend of adventure and luxury for driven teams.",
    activities: ["Bungee jumping", "Milford Sound cruise", "Jet boating", "Wine trail tour"],
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "yosemite",
    name: "Yosemite",
    country: "USA",
    location: "California, Sierra Nevada",
    tagline: "Granite monoliths and ancient sequoias",
    category: "National Park",
    idealFor: "Adventure Groups",
    duration: "3–5 days",
    groupSize: "15–80 guests",
    bestTime: "May–October",
    rating: "4.8",
    description:
      "El Capitan, Half Dome, and waterfalls thundering through one of America's greatest valleys. A transformative setting for groups that value nature's grandeur.",
    activities: ["Half Dome hike", "Rock climbing", "Stargazing program", "Photography tour"],
    image: "https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    location: "Île-de-France",
    tagline: "The city of light and love",
    category: "City & Culture",
    idealFor: "Luxury Experiences",
    duration: "3–5 days",
    groupSize: "20–200 guests",
    bestTime: "April–June, September–October",
    rating: "4.8",
    description:
      "Iconic landmarks, world-class cuisine, and an effortless elegance that never fades. The gold standard for refined events and sophisticated gatherings.",
    activities: ["Private Louvre tour", "Seine river cruise", "Michelin dinner", "Champagne day trip"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "bora-bora",
    name: "Bora Bora",
    country: "French Polynesia",
    location: "Leeward Islands, South Pacific",
    tagline: "The jewel of the South Pacific",
    category: "Luxury Island",
    idealFor: "Destination Weddings",
    duration: "5–7 days",
    groupSize: "10–60 guests",
    bestTime: "May–October",
    rating: "4.9",
    description:
      "A dormant volcano ringed by a turquoise lagoon and the world's most exclusive overwater bungalows. The pinnacle of luxury for intimate celebrations.",
    activities: ["Lagoon snorkeling", "Jet ski tour", "Polynesian dance show", "Overwater spa"],
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "norwegian-fjords",
    name: "Norwegian Fjords",
    country: "Norway",
    location: "Western Norway",
    tagline: "Carved by ice, crowned by mist",
    category: "Natural Wonder",
    idealFor: "Incentive Travel",
    duration: "4–6 days",
    groupSize: "15–80 guests",
    bestTime: "May–September",
    rating: "4.8",
    description:
      "Sheer cliffs plunge into deep blue fjords beneath the ethereal glow of the midnight sun. A majestic setting for groups seeking awe and inspiration.",
    activities: ["Fjord cruise", "Trolltunga hike", "Kayaking", "Northern lights viewing"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520681279154-51b3fb4ea0f7?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    country: "India",
    location: "Northwest India",
    tagline: "Land of kings and golden deserts",
    category: "Heritage & Culture",
    idealFor: "Destination Weddings",
    duration: "3–5 days",
    groupSize: "50–400 guests",
    bestTime: "October–March",
    rating: "4.7",
    description:
      "Majestic forts, vibrant bazaars, and Thar Desert sunsets that set the horizon ablaze. India's most celebrated canvas for grand celebrations.",
    activities: ["Palace tour", "Desert safari", "Elephant ride", "Traditional feast"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
    ],
  },
];

/** Get a single destination by slug id */
export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

/** Get destinations filtered by category */
export function getDestinationsByCategory(category: string): Destination[] {
  return destinations.filter((d) => d.category === category);
}

/** Get unique categories */
export function getCategories(): string[] {
  return [...new Set(destinations.map((d) => d.category))];
}
