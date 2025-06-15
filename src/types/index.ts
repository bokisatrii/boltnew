export interface Team {
  id: number;
  name: string;
  logo?: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  pointsDifference: number;
}

export interface YahooFantasyTeam {
  rank: string;
  team: string;
  wlt: string;
  pct: string;
  gb: string;
  lastweek: string;
  waiver: string;
  logo: string;
  clinched_playoff?: boolean;
  rank_number?: number;
}

export interface ProcessedTeam {
  id: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  ties: number;
  pct: string;
  gb: string;
  rank: number;
  clinched_playoff: boolean;
  waiver: string;
  lastweek: string;
}

export interface Match {
  id: number;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  isUpcoming: boolean;
  isFeatured: boolean;
  location: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  featured: boolean;
}

export interface TeamRegistration {
  teamName: string;
  captainName: string;
  email: string;
  phone: string;
  playerCount: number;
  teamLogo?: File;
  message?: string;
}

export interface StatCounter {
  id: number;
  label: string;
  value: number;
  icon: string;
  duration: number;
}