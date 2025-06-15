import { YahooFantasyTeam, ProcessedTeam, BlogPost } from '../types';

// SheetBest API ključevi i adrese
const TEAM_API_URL = 'https://api.sheetbest.com/sheets/8576367a-3317-4c4b-b799-743de993d677';
const BLOG_API_URL = 'https://api.sheetbest.com/sheets/41a008b3-7e1b-4c04-9451-d11906ded880';
const API_KEY = 'zerX4Q2@u!d5iII2!m56HuRwLon40HwqKAsA8cR1Xx3YaxNC56lsqVnxa66pY7eH';

const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T[];
  timestamp: number;
}

let teamCache: CacheEntry<ProcessedTeam> | null = null;
let blogCache: CacheEntry<BlogPost> | null = null;

// ===== TEAM DATA SCRAPER =====
export const fetchYahooFantasyData = async (): Promise<ProcessedTeam[]> => {
  if (teamCache && Date.now() - teamCache.timestamp < CACHE_DURATION) {
    console.log('📦 Vraćam keširane timove');
    return teamCache.data;
  }

  try {
    const res = await fetch(TEAM_API_URL, {
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
    });
    const rawData: YahooFantasyTeam[] = await res.json();
    const valid = rawData.filter(team => team?.team && team?.wlt !== '0-0-0');
    const teams = valid.map((team, i) => {
      const [w, l, t] = team.wlt.split('-').map(Number);
      const rank = parseInt((team.rank || `${i + 1}`).replace('*', '')) || i + 1;
      return {
        id: i + 1,
        name: team.team,
        logo: team.logo || '',
        wins: w || 0,
        losses: l || 0,
        ties: t || 0,
        pct: team.pct,
        gb: team.gb,
        rank,
        clinched_playoff: (team.rank || '').includes('*'),
        waiver: team.waiver,
        lastweek: team.lastweek,
      };
    }).sort((a, b) => a.rank - b.rank);

    teamCache = { data: teams, timestamp: Date.now() };
    return teams;

  } catch (err) {
    console.error('❌ Greška kod timova:', err);
    return getStaticTeamsData();
  }
};

export const getStaticTeamsData = (): ProcessedTeam[] => [
  {
    id: 1,
    name: 'Thunder Giants',
    logo: '',
    wins: 8,
    losses: 2,
    ties: 0,
    pct: '.800',
    gb: '-',
    rank: 1,
    clinched_playoff: true,
    waiver: '18',
    lastweek: '-',
  }
];

// ===== BLOG POST SCRAPER (NOVO!) =====
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (blogCache && Date.now() - blogCache.timestamp < CACHE_DURATION) {
    console.log('📰 Vraćam keširane blog postove');
    return blogCache.data;
  }

  try {
    const res = await fetch(BLOG_API_URL, {
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    const posts: BlogPost[] = data
      .filter(item => item.naslov && item.tekst)
      .map((item, index) => ({
        id: `${index + 1}`,
        naslov: item.naslov,
        datum: item.datum,
        tekst: item.tekst,
        slika: item.slika,
        slug: item.slug,
        autor: item.autor,
        category: item.category?.trim().toLowerCase() || 'uncategorized',
      }));

    blogCache = { data: posts, timestamp: Date.now() };
    return posts;

  } catch (err) {
    console.error('❌ Greška pri učitavanju blogova:', err);
    return [];
  }
};
