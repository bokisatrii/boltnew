import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { Team } from '../../types';

interface StandingsTableProps {
  teams: Team[];
}

type SortKey = 'name' | 'played' | 'won' | 'lost' | 'points' | 'pointsDifference';
type SortDirection = 'asc' | 'desc';

const StandingsTable: React.FC<StandingsTableProps> = ({ teams: initialTeams }) => {
  const [teams, setTeams] = useState<Team[]>([...initialTeams]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: 'points', direction: 'desc' });

  const sortTeams = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const sortedTeams = [...teams].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      // If points are equal, sort by point difference
      if (key === 'points' && a[key] === b[key]) {
        return direction === 'asc' 
          ? a.pointsDifference - b.pointsDifference 
          : b.pointsDifference - a.pointsDifference;
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

  return (
    <AnimatedSection className="overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-4 font-semibold text-sm text-center">#</th>
              <th 
                className="px-4 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Ekipa</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-4 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('played')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>O</span>
                  {getSortIcon('played')}
                </div>
              </th>
              <th 
                className="px-4 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('won')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>P</span>
                  {getSortIcon('won')}
                </div>
              </th>
              <th 
                className="px-4 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('lost')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>I</span>
                  {getSortIcon('lost')}
                </div>
              </th>
              <th 
                className="px-4 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('points')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Bodovi</span>
                  {getSortIcon('points')}
                </div>
              </th>
              <th 
                className="px-4 py-4 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => sortTeams('pointsDifference')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>+/-</span>
                  {getSortIcon('pointsDifference')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {teams.map((team, index) => (
              <tr 
                key={team.id} 
                className={`hover:bg-gray-50 transition-colors ${index < 4 ? 'border-l-4 border-green-500' : ''}`}
              >
                <td className="px-4 py-4 text-center font-semibold">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      {team.logo && (
                        <img 
                          src={team.logo} 
                          alt={team.name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <span className="font-medium">{team.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">{team.played}</td>
                <td className="px-4 py-4 text-center text-green-600 font-medium">{team.won}</td>
                <td className="px-4 py-4 text-center text-red-600 font-medium">{team.lost}</td>
                <td className="px-4 py-4 text-center font-bold">{team.points}</td>
                <td className={`px-4 py-4 text-center font-medium ${
                  team.pointsDifference > 0 ? 'text-green-600' : 
                  team.pointsDifference < 0 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {team.pointsDifference > 0 ? '+' : ''}{team.pointsDifference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500">
        <span className="inline-block mr-4 bg-green-500 w-3 h-3 rounded-full"></span>
        Ekipe koje se plasiraju u playoff
      </div>
    </AnimatedSection>
  );
};

export default StandingsTable;