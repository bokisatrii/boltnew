import { YahooFantasyTeam, ProcessedTeam } from '../types';

// SheetBest konfiguracija
const API_URL = 'https://api.sheetbest.com/sheets/8576367a-3317-4c4b-b799-743de993d677';
const API_KEY = 'zerX4Q2@u!d5iII2!m56HuRwLon40HwqKAsA8cR1Xx3YaxNC56lsqVnxa66pY7eH';

// Keširanje podataka (5 minuta)
const CACHE_DURATION = 5 * 60 * 1000;
interface CacheEntry {
  data: ProcessedTeam[];
  timestamp: number;
}
let cache: CacheEntry | null = null;

// Glavna funkcija za dohvat podataka sa SheetBest API-ja
export const fetchYahooFantasyData = async (): Promise<ProcessedTeam[]> => {
  // ✅ Ako imamo keširane podatke i nisu istekli, vrati ih
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('📦 Vraćam keširane podatke');
    return cache.data;
  }

  try {
    if (!API_KEY) {
      console.warn('⚠️ API key nije postavljen! Koristim statičke podatke.');
      return getStaticTeamsData();
    }

    console.log('🌐 Učitavam podatke sa SheetBest API-ja...');
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`❌ HTTP greška: ${response.status}`);
    }

    const rawData: YahooFantasyTeam[] = await response.json();
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn('⚠️ Prazni podaci vraćeni sa API-ja. Koristim rezervne.');
      return getStaticTeamsData();
    }

    const processed = transformYahooData(rawData);
    console.log(`✅ Učitano ${processed.length} validnih timova`);

    // 🧠 Sačuvaj u keš
    cache = { data: processed, timestamp: Date.now() };
    return processed;

  } catch (error) {
    console.error('❌ Greška pri dohvatu:', error);
    return getStaticTeamsData();
  }
};

// Pretvaranje sirovih Yahoo podataka u formatiran niz timova
const transformYahooData = (data: YahooFantasyTeam[]): ProcessedTeam[] => {
  const validTeams = data.filter(team => {
    const isValidName = team?.team && team.team.trim() !== '';
    const isValidWLT = team?.wlt && team.wlt !== '0-0-0';
    const isGeneric = /^Team \d+$/.test(team.team || '');
    return isValidName && isValidWLT && !isGeneric;
  });

  console.log(`🔍 ${validTeams.length} validnih od ukupno ${data.length}`);

  const teams = validTeams.map((team, index) => {
    const [w, l, t] = team.wlt.split('-').map(n => parseInt(n));
    const cleanedRank = (team.rank || `${index + 1}`).replace('*', '');
    const rank = parseInt(cleanedRank) || index + 1;
    return {
      id: index + 1,
      name: team.team,
      logo: team.logo || 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
      wins: w || 0,
      losses: l || 0,
      ties: t || 0,
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

// Ako padne API poziv – koristi rezervne (dummy) podatke
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