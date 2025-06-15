import { YahooFantasyTeam, ProcessedTeam } from '../types';

// Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxngaU0WBZEjrz7DC7P9Vb3Oi2PlUczOlRgPlBOtv-yU-SwytTCqSx1Ds3-BPrpCa3p/exec';

// Keširanje podataka (3 minuta - kraće od SheetBest zbog brže ažuriranja)
const CACHE_DURATION = 3 * 60 * 1000;

interface CacheEntry {
  data: ProcessedTeam[];
  timestamp: number;
}

interface GoogleAppsScriptResponse {
  success: boolean;
  data: YahooFantasyTeam[];
  count: number;
  timestamp: string;
  source: string;
  error?: string;
}

let cache: CacheEntry | null = null;

// Glavna funkcija za dohvat podataka sa Google Apps Script API-ja
export const fetchYahooFantasyData = async (): Promise<ProcessedTeam[]> => {
  // ✅ Ako imamo keširane podatke i nisu istekli, vrati ih
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('📦 Vraćam keširane podatke (Google Sheets cache)');
    return cache.data;
  }

  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.warn('⚠️ Google Apps Script URL nije postavljen! Koristim statičke podatke.');
      return getStaticTeamsData();
    }

    console.log('🌐 Učitavam podatke sa Google Apps Script API-ja...');
    
    // Pokušaj prvo sa običnim fetch
    let response;
    try {
      // Dodaj timestamp za cache busting
      const urlWithTimestamp = `${GOOGLE_APPS_SCRIPT_URL}?t=${Date.now()}`;
      
      response = await fetch(urlWithTimestamp, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors', // Eksplicitno specificiraći CORS
        cache: 'no-cache'
      });
    } catch (corsError) {
      console.log('⚠️ CORS greška, pokušavam sa alternative pristupa...');
      // Ako fetch ne radi zbog CORS-a, koristi proxy ili alternative
      return await fetchWithProxy();
    }

    if (!response.ok) {
      throw new Error(`❌ HTTP greška: ${response.status} ${response.statusText}`);
    }

    const apiResponse: GoogleAppsScriptResponse = await response.json();
    
    if (!apiResponse.success) {
      throw new Error(`❌ API greška: ${apiResponse.error || 'Nepoznata greška'}`);
    }

    if (!Array.isArray(apiResponse.data) || apiResponse.data.length === 0) {
      console.warn('⚠️ Prazni podaci vraćeni sa Google Apps Script API-ja. Koristim rezervne.');
      return getStaticTeamsData();
    }

    const processed = transformYahooData(apiResponse.data);
    console.log(`✅ Učitano ${processed.length} validnih timova sa Google Sheets`);

    // 🧠 Sačuvaj u keš
    cache = { data: processed, timestamp: Date.now() };
    return processed;

  } catch (error) {
    console.error('❌ Greška pri dohvatu sa Google Apps Script:', error);
    return getStaticTeamsData();
  }
};

// Pretvaranje sirovih Yahoo podataka u formatiran niz timova
const transformYahooData = (data: YahooFantasyTeam[]): ProcessedTeam[] => {
  console.log('🔄 Transformisanje Google Sheets podataka...');
  
  const validTeams = data.filter(team => {
    const isValidName = team?.team && team.team.trim() !== '';
    const isValidWLT = team?.wlt && team.wlt !== '0-0-0';
    const isGeneric = /^Team \d+$/.test(team.team || '');
    return isValidName && isValidWLT && !isGeneric;
  });

  console.log(`🔍 ${validTeams.length} validnih od ukupno ${data.length} timova`);

  const teams = validTeams.map((team, index) => {
    const [w, l, t] = team.wlt.split('-').map(n => parseInt(n) || 0);
    const cleanedRank = (team.rank || `${index + 1}`).replace('*', '');
    const rank = parseInt(cleanedRank) || index + 1;
    
    return {
      id: index + 1,
      name: team.team.trim(),
      logo: team.logo || 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
      wins: w,
      losses: l,
      ties: t,
      pct: team.pct || '.000',
      gb: team.gb || '-',
      rank,
      clinched_playoff: (team.rank || '').includes('*'),
      waiver: team.waiver || '0',
      lastweek: team.lastweek || '-'
    };
  });

  // Sortiraj po ranku i dodeli nove ID-jeve
  teams.sort((a, b) => a.rank - b.rank);
  return teams.map((team, i) => ({ ...team, id: i + 1 }));
};

// Rezervni (dummy) podaci ako padne API poziv
export const getStaticTeamsData = (): ProcessedTeam[] => [
  {
    id: 1,
    name: 'Thunder Giants',
    logo: 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
    wins: 8,
    losses: 2,
    ties: 0,
    pct: '.800',
    gb: '-',
    rank: 1,
    clinched_playoff: true,
    waiver: '18',
    lastweek: '-',
  },
  {
    id: 2,
    name: 'Phoenix Flyers',
    logo: 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
    wins: 7,
    losses: 3,
    ties: 0,
    pct: '.700',
    gb: '1.0',
    rank: 2,
    clinched_playoff: true,
    waiver: '15',
    lastweek: '+1',
  },
  {
    id: 3,
    name: 'Royal Wolves',
    logo: 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
    wins: 6,
    losses: 4,
    ties: 0,
    pct: '.600',
    gb: '2.0',
    rank: 3,
    clinched_playoff: false,
    waiver: '12',
    lastweek: '-1',
  }
];

// Funkcija za ručno brisanje keša (optional)
export const clearCache = (): void => {
  cache = null;
  console.log('🗑️ Keš je obrisan');
};

// Alternative fetch method za CORS probleme
const fetchWithProxy = async (): Promise<ProcessedTeam[]> => {
  try {
    console.log('🔄 Pokušavam alternative pristup...');
    
    // Koristi proxy servise za CORS (samo za development)
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(GOOGLE_APPS_SCRIPT_URL)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }
    
    const proxyData = await response.json();
    const apiResponse: GoogleAppsScriptResponse = JSON.parse(proxyData.contents);
    
    if (!apiResponse.success || !Array.isArray(apiResponse.data)) {
      throw new Error('Invalid proxy response');
    }
    
    const processed = transformYahooData(apiResponse.data);
    console.log(`✅ Učitano ${processed.length} timova preko proxy-ja`);
    
    // 🧠 Sačuvaj u keš
    cache = { data: processed, timestamp: Date.now() };
    return processed;
    
  } catch (proxyError) {
    console.error('❌ Proxy pristup takođe neuspešan:', proxyError);
    throw proxyError;
  }
};