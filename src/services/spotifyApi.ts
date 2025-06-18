// Spotify API servis za dohvaćanje podcast epizoda
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SHOW_ID = '3bkhQToL2N4YJ5I2jSopfZ';

// Cache za access token
let accessTokenCache: {
  token: string;
  expiresAt: number;
} | null = null;

// Cache za epizode (5 minuta)
let episodesCache: {
  data: SpotifyEpisode[];
  timestamp: number;
} | null = null;

const EPISODES_CACHE_DURATION = 5 * 60 * 1000; // 5 minuta

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

interface SpotifyEpisodesResponse {
  items: SpotifyEpisode[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Dobijanje access tokena koristeći Client Credentials Flow
const getAccessToken = async (): Promise<string> => {
  // Proverava cache
  if (accessTokenCache && Date.now() < accessTokenCache.expiresAt) {
    return accessTokenCache.token;
  }

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify Client ID i Client Secret nisu konfigurisani');
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Spotify auth error: ${response.status}`);
    }

    const data: SpotifyTokenResponse = await response.json();
    
    // Sačuvaj u cache (expires_in je u sekundama)
    accessTokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // 1 minut ranije za sigurnost
    };

    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

// Dohvaćanje epizoda za dati show
export const fetchSpotifyEpisodes = async (limit: number = 5): Promise<SpotifyEpisode[]> => {
  // Proverava cache
  if (episodesCache && Date.now() - episodesCache.timestamp < EPISODES_CACHE_DURATION) {
    console.log('📦 Vraćam keširane Spotify epizode');
    return episodesCache.data.slice(0, limit);
  }

  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(
      `${SPOTIFY_API_BASE}/shows/${SHOW_ID}/episodes?market=RS&limit=${Math.max(limit, 10)}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data: SpotifyEpisodesResponse = await response.json();
    
    // Sačuvaj u cache
    episodesCache = {
      data: data.items,
      timestamp: Date.now(),
    };

    console.log(`✅ Učitano ${data.items.length} Spotify epizoda`);
    return data.items.slice(0, limit);

  } catch (error) {
    console.error('Error fetching Spotify episodes:', error);
    
    // Fallback na mock podatke
    return getMockEpisodes().slice(0, limit);
  }
};

// Mock podaci za fallback
const getMockEpisodes = (): SpotifyEpisode[] => [
  {
    id: 'mock-1',
    name: 'Trojka iz Ćoška - Epizoda 1',
    description: 'Dobrodošli u prvi podcast o košarci iz našeg kraja! U ovoj epizodi razgovaramo o najnovijim dešavanjima u NBA ligi, analiziramo performanse naših igrača i delimo naše prognoze za predstojeću sezonu.',
    release_date: '2025-01-15',
    duration_ms: 3600000, // 1 sat
    external_urls: {
      spotify: `https://open.spotify.com/episode/mock-1`,
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

// Brisanje cache-a (za debug)
export const clearSpotifyCache = (): void => {
  accessTokenCache = null;
  episodesCache = null;
  console.log('🗑️ Spotify cache obrisan');
};