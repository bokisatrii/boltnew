import { YahooFantasyTeam, ProcessedTeam } from '../types';

const API_URL = 'https://api.sheetbest.com/sheets/8576367a-3317-4c4b-b799-743de993d677';
const API_KEY = 'zerX4Q2@u!d5iII2!m56HuRwLon40HwqKAsA8cR1Xx3YaxNC56lsqVnxa66pY7eH';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry {
  data: ProcessedTeam[];
  timestamp: number;
}

let cache: CacheEntry | null = null;

export const fetchYahooFantasyData = async (): Promise<ProcessedTeam[]> => {
  // Check cache first
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('Vraćam keširane podatke');
    return cache.data;
  }

  try {
    console.log('Učitavam podatke sa API-ja...');
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: YahooFantasyTeam[] = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('API je vratio prazne podatke, koristim rezervne');
      return getStaticTeamsData();
    }

    const processedData = transformYahooData(data);
    console.log(`Uspešno učitano ${processedData.length} timova`);
    
    // Update cache
    cache = {
      data: processedData,
      timestamp: Date.now(),
    };

    return processedData;
  } catch (error) {
    console.error('Greška pri učitavanju Yahoo Fantasy podataka:', error);
    console.log('Koristim rezervne podatke');
    return getStaticTeamsData();
  }
};

const transformYahooData = (yahooData: YahooFantasyTeam[]): ProcessedTeam[] => {
  // Prvo filtriraj samo validne timove
  const validTeams = yahooData.filter((team) => {
    // Proveri da li tim ima ime i da nije null
    if (!team || !team.team || team.team.trim() === '') {
      return false;
    }
    
    // Proveri da li tim ima W-L-T podatke
    if (!team.wlt || team.wlt === '0-0-0') {
      return false;
    }
    
    // Proveri da li je ime tima generičko
    if (team.team.startsWith('Team ') && /Team \d+/.test(team.team)) {
      return false;
    }
    
    return true;
  });
  
  console.log(`Pronađeno ${validTeams.length} validnih timova od ukupno ${yahooData.length}`);
  
  // Transformiši samo validne timove
  const processedTeams = validTeams.map((team, index) => {
    // Parse W-L-T format
    const wltParts = team.wlt.split('-');
    const wins = parseInt(wltParts[0] || '0', 10);
    const losses = parseInt(wltParts[1] || '0', 10);
    const ties = parseInt(wltParts[2] || '0', 10);

    // Extract rank number and playoff status
    const rankStr = (team.rank || `${index + 1}`).toString().replace('*', '');
    const rank = parseInt(rankStr, 10) || (index + 1);
    const clinched_playoff = (team.rank || '').toString().includes('*');

    return {
      id: index + 1,
      name: team.team,
      logo: team.logo || 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
      wins,
      losses,
      ties,
      pct: team.pct || '.000',
      gb: team.gb || '-',
      rank,
      clinched_playoff,
      waiver: team.waiver || '0',
      lastweek: team.lastweek || '-',
    };
  });
  
  // Sortiraj po ranku
  processedTeams.sort((a, b) => a.rank - b.rank);
  
  // Ažuriraj ID-jeve nakon sortiranja
  processedTeams.forEach((team, index) => {
    team.id = index + 1;
  });
  
  return processedTeams;
};

// Fallback function to get static data if API fails
export const getStaticTeamsData = (): ProcessedTeam[] => {
  console.log('Koristim statičke rezervne podatke');
  
  return [
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
    },
    {
      id: 4,
      name: 'Midnight Stars',
      logo: 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
      wins: 5,
      losses: 5,
      ties: 0,
      pct: '.500',
      gb: '3.0',
      rank: 4,
      clinched_playoff: false,
      waiver: '10',
      lastweek: '-',
    },
    {
      id: 5,
      name: 'Urban Hawks',
      logo: 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png',
      wins: 4,
      losses: 6,
      ties: 0,
      pct: '.400',
      gb: '4.0',
      rank: 5,
      clinched_playoff: false,
      waiver: '8',
      lastweek: '+2',
    },
  ];
};