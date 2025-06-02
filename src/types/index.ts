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