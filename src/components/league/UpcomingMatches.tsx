import React from 'react';
import { Calendar } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { Match } from '../../types';

interface UpcomingMatchesProps {
  matches: Match[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('sr-RS', options);
  };

  // Group matches by date
  const matchesByDate = matches.reduce((groups: { [key: string]: Match[] }, match) => {
    const date = match.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(matchesByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <section className="my-12">
      <AnimatedSection className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Predstojeće utakmice</h2>
        <p className="text-gray-600">
          Raspored nadolazećih utakmica BasketLige
        </p>
      </AnimatedSection>

      <div className="space-y-6">
        {sortedDates.map((date, dateIndex) => (
          <AnimatedSection key={date} delay={dateIndex * 0.1}>
            <div className="mb-4 flex items-center">
              <Calendar className="text-orange-500 mr-2" size={20} />
              <h3 className="text-xl font-semibold text-gray-700">
                {formatDate(date)}
              </h3>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {matchesByDate[date].map((match, matchIndex) => (
                <div 
                  key={match.id}
                  className={`flex items-center p-4 md:p-5 hover:bg-gray-50 transition-colors ${
                    matchIndex !== matchesByDate[date].length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {/* Home Team */}
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end">
                      <span className="font-semibold">{match.homeTeam.name}</span>
                      <div className="w-8 h-8 ml-3 rounded-full bg-gray-200 overflow-hidden">
                        {match.homeTeam.logo && (
                          <img 
                            src={match.homeTeam.logo} 
                            alt={match.homeTeam.name} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score / Time */}
                  <div className="flex flex-col items-center mx-4 md:mx-6">
                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded mb-1">
                      20:00h
                    </div>
                    <div className="text-xs text-gray-500">{match.location}</div>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 rounded-full bg-gray-200 overflow-hidden">
                        {match.awayTeam.logo && (
                          <img 
                            src={match.awayTeam.logo} 
                            alt={match.awayTeam.name} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <span className="font-semibold">{match.awayTeam.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMatches;