import React, { useEffect } from 'react';
import StandingsTable from '../components/league/StandingsTable';
import UpcomingMatches from '../components/league/UpcomingMatches';
import FeaturedMatch from '../components/league/FeaturedMatch';
import AnimatedSection from '../components/ui/AnimatedSection';
import { teams } from '../data/teams';
import { getUpcomingMatches, getFeaturedMatch } from '../data/matches';

const League: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Liga';
  }, []);

  const upcomingMatches = getUpcomingMatches();
  const featuredMatch = getFeaturedMatch();

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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tabela lige</h2>
            <p className="text-gray-600">
              Trenutno stanje na tabeli
            </p>
          </AnimatedSection>

          <StandingsTable teams={teams} />
        </div>

        <UpcomingMatches matches={upcomingMatches} />
      </div>
    </div>
  );
};

export default League;