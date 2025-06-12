import React, { useState, useEffect, memo, useRef } from 'react';
import { createPortal } from 'react-dom';
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

// Nova Tooltip komponenta sa Portal
const Tooltip: React.FC<{ text: string; children: React.ReactNode; id: string }> = ({ text, children, id }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help inline-flex"
      >
        {children}
      </div>
      {showTooltip && createPortal(
        <div 
          className="fixed z-[99999] pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full">
            <div className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl mb-2">
              {text}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const StandingsTable: React.FC<StandingsTableProps> = ({ teams: initialTeams, loading, error }) => {
  const [teams, setTeams] = useState<ProcessedTeam[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: 'rank', direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);

  // Proveri da li je mobilni uređaj
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ažuriraj lokalni state kada se promene props
  useEffect(() => {
    if (initialTeams && initialTeams.length > 0) {
      setTeams([...initialTeams]);
    }
  }, [initialTeams]);

  const sortTeams = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const sortedTeams = [...teams].sort((a, b) => {
      let aValue: any = a[key];
      let bValue: any = b[key];
      
      if (key === 'pct') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (key === 'gb') {
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

  // Memorisana komponenta za mobilni prikaz reda
  const MobileTeamRow = memo<{ team: ProcessedTeam }>(({ team }) => (
    <div className="bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="font-bold text-lg text-gray-700">#{team.rank}</span>
            {team.clinched_playoff && (
              <span className="ml-1 text-green-600 font-bold">*</span>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img 
              src={team.logo} 
              alt={team.name}
              loading="lazy"
              className="w-full h-full object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://s.yimg.com/cv/apiv2/default/nba/nba_4_p.png';
              }}
            />
          </div>
          <div>
            <div className="font-semibold text-gray-800">{team.name}</div>
            <div className="text-sm text-gray-600">
              <span className="text-green-600 font-medium">{team.wins}</span>
              <span className="text-gray-400 mx-1">-</span>
              <span className="text-red-600 font-medium">{team.losses}</span>
              {team.ties > 0 && (
                <>
                  <span className="text-gray-400 mx-1">-</span>
                  <span className="text-yellow-600 font-medium">{team.ties}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{team.pct}</div>
          <div className="text-sm text-gray-600">
            GB: {team.gb === '-' ? <span className="text-blue-600 font-bold">-</span> : team.gb}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
        <div>
          <span className="font-medium">LW:</span> 
          {team.lastweek === '-' ? (
            <span className="text-gray-400 ml-1">-</span>
          ) : team.lastweek.startsWith('+') ? (
            <span className="text-green-600 font-medium ml-1">{team.lastweek}</span>
          ) : (
            <span className="text-red-600 font-medium ml-1">{team.lastweek}</span>
          )}
        </div>
        <div>
          <span className="font-medium">Waiver:</span> 
          <span className="ml-1">{team.waiver}</span>
        </div>
      </div>
    </div>
  ));

  // Loading state
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

  // Error state
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

  // Empty state
  if (!teams || teams.length === 0) {
    return (
      <AnimatedSection className="overflow-hidden rounded-lg shadow">
        <div className="bg-yellow-50 border border-yellow-200 p-8 text-center rounded-lg">
          <p className="text-yellow-600">Nema podataka za prikaz.</p>
        </div>
      </AnimatedSection>
    );
  }

  // Mobilni prikaz
  if (isMobile) {
    return (
      <AnimatedSection>
        <div className="mb-4">
          <div className="flex items-center justify-between bg-blue-600 text-white p-3 rounded-t-lg">
            <h3 className="font-semibold">Tabela lige</h3>
            <button
              onClick={() => sortTeams('rank')}
              className="text-sm bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition-colors"
            >
              Sortiraj po ranku {getSortIcon('rank')}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {teams.map((team) => (
            <MobileTeamRow key={team.id} team={team} />
          ))}
        </div>
        <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500 rounded-b-lg mt-4">
          <div className="flex items-center mb-2">
            <span className="inline-block mr-2 bg-green-500 w-3 h-3 rounded-full"></span>
            <span>Plasirali se u playoff (*)</span>
          </div>
          <div className="text-right">
            Ažurirano: {new Date().toLocaleString('sr-RS')}
          </div>
        </div>
      </AnimatedSection>
    );
  }

  // Desktop prikaz
  return (
    <AnimatedSection className="overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white sticky top-0 z-40">
            <tr>
              <th className="px-4 py-5 font-semibold text-sm text-center min-w-[44px]">#</th>
              <th 
                className="px-4 py-5 font-semibold text-sm cursor-pointer hover:bg-blue-700 transition-colors min-w-[44px]"
                onClick={() => sortTeams('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Ekipa</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-4 py-5 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors min-w-[44px]"
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
                className="px-4 py-5 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors min-w-[44px]"
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
                className="px-4 py-5 font-semibold text-sm text-center cursor-pointer hover:bg-blue-700 transition-colors min-w-[44px]"
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
              <th className="px-4 py-5 font-semibold text-sm text-center min-w-[44px]">
                <Tooltip text="Prošla nedelja" id="lastweek">
                  <div className="flex items-center justify-center space-x-1">
                    <span>LW</span>
                    <HelpCircle size={14} className="opacity-70" />
                  </div>
                </Tooltip>
              </th>
              <th className="px-4 py-5 font-semibold text-sm text-center min-w-[44px]">
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
            {teams.map((team) => (
              <tr 
                key={team.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  team.clinched_playoff ? 'border-l-4 border-green-500 bg-green-50' : ''
                }`}
              >
                <td className="px-4 py-4 text-center font-semibold">
                  <div className="flex items-center justify-center">
                    {team.rank}
                    {team.clinched_playoff && (
                      <span className="ml-1 text-green-600 font-bold">*</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        loading="lazy"
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
                <td className="px-4 py-4 text-center text-sm">
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
                <td className="px-4 py-4 text-center font-medium text-sm">{team.pct}</td>
                <td className="px-4 py-4 text-center font-medium text-sm">
                  {team.gb === '-' ? (
                    <span className="text-blue-600 font-bold">-</span>
                  ) : (
                    <span>{team.gb}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center text-sm">
                  {team.lastweek === '-' ? (
                    <span className="text-gray-400">-</span>
                  ) : team.lastweek.startsWith('+') ? (
                    <span className="text-green-600 font-medium">{team.lastweek}</span>
                  ) : (
                    <span className="text-red-600 font-medium">{team.lastweek}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center text-sm font-medium">{team.waiver}</td>
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