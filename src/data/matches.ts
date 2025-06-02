import { Match } from '../types';
import { teams } from './teams';

// Generate dates for upcoming matches (next 2 weeks)
const generateUpcomingDates = () => {
  const dates = [];
  const now = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

const upcomingDates = generateUpcomingDates();

export const matches: Match[] = [
  // Past matches
  {
    id: 1,
    date: '2025-01-05',
    homeTeam: teams[0],
    awayTeam: teams[1],
    homeScore: 78,
    awayScore: 72,
    isUpcoming: false,
    isFeatured: false,
    location: 'Central Arena',
  },
  {
    id: 2,
    date: '2025-01-12',
    homeTeam: teams[2],
    awayTeam: teams[3],
    homeScore: 86,
    awayScore: 81,
    isUpcoming: false,
    isFeatured: false,
    location: 'West Stadium',
  },
  {
    id: 3,
    date: '2025-01-19',
    homeTeam: teams[4],
    awayTeam: teams[5],
    homeScore: 92,
    awayScore: 87,
    isUpcoming: false,
    isFeatured: false,
    location: 'East Court',
  },
  {
    id: 4,
    date: '2025-01-26',
    homeTeam: teams[6],
    awayTeam: teams[7],
    homeScore: 68,
    awayScore: 75,
    isUpcoming: false,
    isFeatured: false,
    location: 'North Pavilion',
  },
  
  // Upcoming matches
  {
    id: 5,
    date: upcomingDates[0],
    homeTeam: teams[0],
    awayTeam: teams[9],
    isUpcoming: true,
    isFeatured: true,
    location: 'Central Arena',
  },
  {
    id: 6,
    date: upcomingDates[1],
    homeTeam: teams[1],
    awayTeam: teams[8],
    isUpcoming: true,
    isFeatured: false,
    location: 'Phoenix Stadium',
  },
  {
    id: 7,
    date: upcomingDates[2],
    homeTeam: teams[2],
    awayTeam: teams[7],
    isUpcoming: true,
    isFeatured: false,
    location: 'Royal Court',
  },
  {
    id: 8,
    date: upcomingDates[3],
    homeTeam: teams[3],
    awayTeam: teams[6],
    isUpcoming: true,
    isFeatured: false,
    location: 'Star Arena',
  },
  {
    id: 9,
    date: upcomingDates[5],
    homeTeam: teams[4],
    awayTeam: teams[5],
    isUpcoming: true,
    isFeatured: false,
    location: 'Urban Stadium',
  },
  {
    id: 10,
    date: upcomingDates[7],
    homeTeam: teams[5],
    awayTeam: teams[4],
    isUpcoming: true,
    isFeatured: false,
    location: 'Knight Center',
  },
  {
    id: 11,
    date: upcomingDates[9],
    homeTeam: teams[6],
    awayTeam: teams[3],
    isUpcoming: true,
    isFeatured: false,
    location: 'Tiger Stadium',
  },
  {
    id: 12,
    date: upcomingDates[11],
    homeTeam: teams[7],
    awayTeam: teams[2],
    isUpcoming: true,
    isFeatured: false,
    location: 'Shadow Arena',
  },
  {
    id: 13,
    date: upcomingDates[12],
    homeTeam: teams[8],
    awayTeam: teams[1],
    isUpcoming: true,
    isFeatured: false,
    location: 'Cosmic Court',
  },
  {
    id: 14,
    date: upcomingDates[13],
    homeTeam: teams[9],
    awayTeam: teams[0],
    isUpcoming: true,
    isFeatured: false,
    location: 'Dynasty Palace',
  },
];

export const getFeaturedMatch = (): Match | undefined => {
  return matches.find(match => match.isUpcoming && match.isFeatured);
};

export const getUpcomingMatches = (): Match[] => {
  return matches.filter(match => match.isUpcoming).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};