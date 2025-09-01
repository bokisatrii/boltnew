import React from 'react';
import { Icon } from 'lucide-react';
import * as icons from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import AnimatedSection from '../ui/AnimatedSection';
import { StatCounter } from '../../types';

interface StatsCounterProps {
  stats: StatCounter[];
}

const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  // Dynamic icon rendering from icon name
  const renderIcon = (iconName: string): JSX.Element | null => {
    const IconComponent = (icons as any)[iconName] as Icon;
    return IconComponent ? <IconComponent size={48} strokeWidth={1.5} className="text-orange-500 mb-4" /> : null;
  };

  return (
    <section id="stats-section" className="section bg-blue-600 text-white py-20">
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Liga u brojkama</h2>
          <p className="max-w-2xl mx-auto text-lg text-blue-100">
            Trojka iz ćoška je sinonim za vrhunsku košarku i nezaboravne trenutke
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection 
              key={stat.id} 
              className="text-center"
              delay={index * 0.1} 
            >
              <div className="flex flex-col items-center p-6 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors">
                {renderIcon(stat.icon)}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    duration={stat.duration} 
                  />
                </div>
                <div className="text-xl text-blue-200">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;