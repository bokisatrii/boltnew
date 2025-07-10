// Spotify servis za podcast epizode - koristi mock podatke umesto API poziva

/*
export interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  html_description?: string;
  explicit: boolean;
  audio_preview_url?: string;
}

// Dohvaćanje epizoda - koristi mock podatke
export const fetchSpotifyEpisodes = async (limit: number = 5): Promise<SpotifyEpisode[]> => {
  // Simulira API poziv sa kratkim delay-om
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`✅ Učitano ${limit} podcast epizoda (mock podaci)`);
  return getMockEpisodes().slice(0, limit);
};

// Mock podaci za epizode
const getMockEpisodes = (): SpotifyEpisode[] => [
  {
    id: 'mock-1',
    name: 'Derrick Rose - Bajka koja nije imala srećan kraj',
    description: 'Momenat kada je 2012 D-Rose kleknuo posle polaganja jednostavno sam znao da je gotovo. Kao neko ko je prošao kroz istu povredu 3 godine ranije, još uvek mi je sve bilo sveže. Karijera koja je mogla da bude označena kao jedna od najboljih na toj poziciji...bajka bez srećnog kraja.',
    release_date: '2025-01-15',
    duration_ms: 3600000, // 1 sat
    external_urls: {
      spotify: `https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ?si=68ac090cbb514b29`,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        height: 640,
        width: 640,
      },
    ],
    explicit: false,
  },
  {
    id: 'mock-2',
    name: 'Trojka iz Ćoška - Epizoda 2',
    description: 'U drugoj epizodi se fokusiramo na evropsku košarku. Analiziramo EuroLigu, razgovaramo o našim reprezentativcima i delimo utiske sa poslednjeg Mundobasketa.',
    release_date: '2025-01-08',
    duration_ms: 4200000, // 1 sat 10 minuta
    external_urls: {
      spotify: `https://open.spotify.com/episode/mock-2`,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        height: 640,
        width: 640,
      },
    ],
    explicit: false,
  },
  {
    id: 'mock-3',
    name: 'Trojka iz Ćoška - Epizoda 3',
    description: 'Specijalna epizoda posvećena fantasy košarci! Delimo savete, strategije i analiziramo najbolje pickove za vašu fantasy ekipu.',
    release_date: '2025-01-01',
    duration_ms: 3300000, // 55 minuta
    external_urls: {
      spotify: `https://open.spotify.com/episode/mock-3`,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        height: 640,
        width: 640,
      },
    ],
    explicit: false,
  },
  {
    id: 'mock-4',
    name: 'Trojka iz Ćoška - Epizoda 4',
    description: 'Razgovaramo o mladim talentima u košarci. Ko su buduće zvezde koje treba pratiti i kako se razvija košarka u našoj zemlji.',
    release_date: '2024-12-25',
    duration_ms: 3900000, // 1 sat 5 minuta
    external_urls: {
      spotify: `https://open.spotify.com/episode/mock-4`,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        height: 640,
        width: 640,
      },
    ],
    explicit: false,
  },
  {
    id: 'mock-5',
    name: 'Trojka iz Ćoška - Epizoda 5',
    description: 'Specijalni gost u studiju! Razgovaramo sa bivšim profesionalnim igračem o njegovoj karijeri i savetima za mlade košarkaše.',
    release_date: '2024-12-18',
    duration_ms: 4800000, // 1 sat 20 minuta
    external_urls: {
      spotify: `https://open.spotify.com/episode/mock-5`,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        height: 640,
        width: 640,
      },
    ],
    explicit: false,
  },
];

// Formatiranje trajanja iz milisekundi u čitljiv format
export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}min`;
  }
  return `${minutes}min`;
};

// Formatiranje datuma
export const formatReleaseDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('sr-RS', options);
};

// Spotify embed URL za show
export const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/show/3bkhQToL2N4YJ5I2jSopfZ/video?utm_source=generator';