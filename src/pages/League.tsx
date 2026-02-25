import React, { useEffect, useState } from 'react';
import StandingsTable from '../components/league/StandingsTable';
import UpcomingMatches from '../components/league/UpcomingMatches';
import FeaturedMatch from '../components/league/FeaturedMatch';
import AnimatedSection from '../components/ui/AnimatedSection';
import SEO from '../components/SEO';
import { ProcessedTeam } from '../types';
import { getUpcomingMatches, getFeaturedMatch } from '../data/matches';
import { fetchYahooFantasyData, getStaticTeamsData } from '../services/googleSheetsApi';

const League: React.FC = () => {
  const [teams, setTeams] = useState<ProcessedTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamsData();
  }, []);

  const loadTeamsData = async () => {
    console.log('Starting to load teams data...');
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchYahooFantasyData();
      console.log('Received teams data:', data);
      
      if (data && data.length > 0) {
        setTeams(data);
        console.log('Teams state updated with:', data);
      } else {
        console.warn('No data received, using static fallback');
        const staticData = getStaticTeamsData();
        setTeams(staticData);
        setError('Using backup data');
      }
    } catch (err) {
      console.error('Failed to fetch Yahoo Fantasy data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      const staticData = getStaticTeamsData();
      setTeams(staticData);
      console.log('Using static fallback data due to error');
    } finally {
      setLoading(false);
      console.log('Loading completed');
    }
  };

  const upcomingMatches = getUpcomingMatches();
  const featuredMatch = getFeaturedMatch();

  return (
    <>
      <SEO
        title="Fantasy League Standings - Corner Three"
        description="Follow the current Corner Three fantasy basketball league standings. Real-time results, schedules, and team statistics."
        keywords="fantasy league standings, basketball results, corner three league, fantasy basketball standings, yahoo fantasy basketball"
        url="/league"
      />

      <div className="pt-28 pb-16">
        <div className="container">
          <AnimatedSection className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fantasy League</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow the results and standings of the most exciting fantasy basketball league
            </p>
          </AnimatedSection>

          {featuredMatch && <FeaturedMatch match={featuredMatch} />}

          <div className="my-12">
            <AnimatedSection className="mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">League Standings</h2>
                  <p className="text-gray-600">
                    Current standings - data updates automatically
                  </p>
                  {error && (
                    <p className="text-orange-600 text-sm mt-1">
                      Note: {error}
                    </p>
                  )}
                </div>
                <button
                  onClick={loadTeamsData}
                  disabled={loading}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Data'}
                </button>
              </div>
            </AnimatedSection>

            <StandingsTable 
              teams={teams} 
              loading={loading} 
              error={error} 
            />
          </div>

          <UpcomingMatches matches={upcomingMatches} />
        </div>
      </div>
    </>
  );
};

export default League;
