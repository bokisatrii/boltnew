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
    return cache.data;
  }

  try {
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
    const processedData = transformYahooData(data);
    
    // Update cache
    cache = {
      data: processedData,
      timestamp: Date.now(),
    };

    return processedData;
  } catch (error) {
    console.error('Error fetching Yahoo Fantasy data:', error);
    throw error;
  }
};

const transformYahooData = (yahooData: YahooFantasyTeam[]): ProcessedTeam[] => {
  return yahooData.map((team, index) => {
    // Parse W-L-T format with null check
    const wltParts = (team.wlt || '').split('-');
    const wins = parseInt(wltParts[0] || '0', 10);
    const losses = parseInt(wltParts[1] || '0', 10);
    const ties = parseInt(wltParts[2] || '0', 10);

    // Extract rank number and playoff status with null check
    const rankStr = (team.rank || '').replace('*', '');
    const rank = parseInt(rankStr, 10) || 0;
    const clinched_playoff = (team.rank || '').includes('*');

    return {
      id: index + 1,
      name: team.team || 'Unknown Team',
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
};

// Fallback function to get static data if API fails
export const getStaticTeamsData = (): ProcessedTeam[] => {
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
  ];
};