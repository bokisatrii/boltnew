import React, { useEffect, useState } from 'react';
import StandingsTable from '../components/league/StandingsTable';
import UpcomingMatches from '../components/league/UpcomingMatches';
import FeaturedMatch from '../components/league/FeaturedMatch';
import AnimatedSection from '../components/ui/AnimatedSection';
import { ProcessedTeam } from '../types';
import { getUpcomingMatches, getFeaturedMatch } from '../data/matches';
import { fetchYahooFantasyData, getStaticTeamsData } from '../services/sheetbestApi';

const League: React.FC = () => {
  const [teams, setTeams] = useState<ProcessedTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'BasketLiga - Liga';
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
        setError('Koriste se rezervni podaci');
      }
    } catch (err) {
      console.error('Failed to fetch Yahoo Fantasy data:', err);
      setError(err instanceof Error ? err.message : 'Nepoznata greška');
      
      // Fallback to static data
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

  console.log('Current component state:', { teams, loading, error });

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">BasketLiga</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pratite rezultate i raspored najuzbudljivije košarkaške lige u regionu
          </p>
        </AnimatedSection>

        {featuredMatch && <FeaturedMatch match={featuredMatch} />}

        <div className="my-12">
          <AnimatedSection className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Tabela lige</h2>
                <p className="text-gray-600">
                  Trenutno stanje na tabeli - podaci se ažuriraju automatski
                </p>
                {error && (
                  <p className="text-orange-600 text-sm mt-1">
                    Napomena: {error}
                  </p>
                )}
              </div>
              <button
                onClick={loadTeamsData}
                disabled={loading}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Ažuriranje...' : 'Ažuriraj podatke'}
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
  );
};

export default League;