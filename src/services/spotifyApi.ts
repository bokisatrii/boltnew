// Spotify servis za podcast epizode - koristi mock podatke umesto API poziva
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