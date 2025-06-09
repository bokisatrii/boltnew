import React, { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { ProcessedTeam } from '../../types';

interface StandingsTableProps {
  teams: ProcessedTeam[];
  loading?: boolean;
  error?: string;
}

type SortKey = 'name' | 'wins' | 'losses' | 'ties' | 'pct' | 'gb' | 'rank';
type SortDirection = 'asc' | 'desc';

const StandingsTable: React.FC<StandingsTableProps> = ({ teams: initialTeams, loading, error }) => {
  const [teams, setTeams] = useState<ProcessedTeam[]>([...initialTeams]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: 'rank', direction: 'asc' });
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const sortTeams = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const sortedTeams = [...teams].sort((a, b) => {
      let aValue: any = a[key];
      let bValue: any = b[key];
      
      // Special handling for percentage and games behind
      if (key === 'pct') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (key === 'gb') {
        // Handle '-' as 0 for sorting
        aValue = aValue === '-' ? 0 : parseFloat(aValue);
        bValue = bValue === '-' ? 0 : parseFloat(bValue);
      }
      
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setTeams(sortedTeams);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ChevronUp size={16} className="opacity-30" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={16} /> 
      : <ChevronDown size={16} />;
  };

  const Tooltip: React.FC<{ text: string; children: React.ReactNode; id: string }> = ({ text, children, id }) => (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(id)}
        onMouseLeave={() => setShowTooltip(null)}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip === id && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-10">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <AnimatedSection className="overflow-hidden rounded-lg shadow">
        <div className="bg-white p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje podataka o tabeli...</p>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection className="overflow-hidden rounded-lg shadow">
        <div className="bg-red-50 border border-red-200 p-8 text-center rounded-lg">
          <p className="text-red-600 mb-4">Greška pri učitavanju podataka: {error}</p>
          <p className="text-sm text-red-500">Prikazuju se rezervni podaci.</p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-3 py-4 font-semibold text-sm text-center">#</th>
              <th 
                className="px-3 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Ekipa</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-3 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('wins')}
              >
                <Tooltip text="Pobede-Porazi-Nerešeno" id="wlt">
                  <div className="flex items-center justify-center space-x-1">
                    <span>W-L-T</span>
                    {getSortIcon('wins')}
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
              <th 
                className="px-3 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('pct')}
              >
                <Tooltip text="Procenat pobeda" id="pct">
                  <div className="flex items-center justify-center space-x-1">
                    <span>PCT</span>
                    {getSortIcon('pct')}
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
              <th 
                className="px-3 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('gb')}
              >
                <Tooltip text="Razlika od prvog mesta" id="gb">
                  <div className="flex items-center justify-center space-x-1">
                    <span>GB</span>
                    {getSortIcon('gb')}
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
              <th className="px-3 py-4 font-semibold text-sm text-center">
                <Tooltip text="Prošla nedelja" id="lastweek">
                  <div className="flex items-center justify-center space-x-1">
                    <span>LW</span>
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
              <th className="px-3 py-4 font-semibold text-sm text-center">
                <Tooltip text="Waiver pozicija" id="waiver">
                  <div className="flex items-center justify-center space-x-1">
                    <span>W#</span>
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {teams.map((team, index) => (
              <tr 
                key={team.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  team.clinched_playoff ? 'border-l-4 border-green-500 bg-green-50' : ''
                }`}
              >
                <td className="px-3 py-4 text-center font-semibold">
                  <div className="flex items-center justify-center">
                    {team.rank}
                    {team.clinched_playoff && (
                      <span className="ml-1 text-green-600 font-bold">*</span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img 
                        src={team.logo} 
                        alt={team.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png';
                        }}
                      />
                    </div>
                    <span className="font-medium text-sm lg:text-base">{team.name}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-center text-sm">
                  <div className="font-medium">
                    <span className="text-green-600">{team.wins}</span>
                    <span className="text-gray-400 mx-1">-</span>
                    <span className="text-red-600">{team.losses}</span>
                    {team.ties > 0 && (
                      <>
                        <span className="text-gray-400 mx-1">-</span>
                        <span className="text-yellow-600">{team.ties}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4 text-center font-medium text-sm">{team.pct}</td>
                <td className="px-3 py-4 text-center font-medium text-sm">
                  {team.gb === '-' ? (
                    <span className="text-blue-600 font-bold">-</span>
                  ) : (
                    <span>{team.gb}</span>
                  )}
                </td>
                <td className="px-3 py-4 text-center text-sm">
                  {team.lastweek === '-' ? (
                    <span className="text-gray-400">-</span>
                  ) : team.lastweek.startsWith('+') ? (
                    <span className="text-green-600 font-medium">{team.lastweek}</span>
                  ) : (
                    <span className="text-red-600 font-medium">{team.lastweek}</span>
                  )}
                </td>
                <td className="px-3 py-4 text-center text-sm font-medium">{team.waiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <span className="inline-block mr-2 bg-green-500 w-3 h-3 rounded-full"></span>
          <span className="mr-4">Plasirali se u playoff (*)</span>
        </div>
        <div className="text-right">
          Poslednje ažuriranje: {new Date().toLocaleString('sr-RS')}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default StandingsTable;