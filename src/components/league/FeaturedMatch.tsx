import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import { Match } from '../../types';

interface FeaturedMatchProps {
  match: Match;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({ match }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('sr-RS', options);
  };

  return (
    <section className="my-12">
      <AnimatedSection className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Istaknuta utakmica</h2>
        <p className="text-gray-600">
          Ne propustite ovu uzbudljivu utakmicu
        </p>
      </AnimatedSection>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left team */}
            <motion.div 
              className="flex-1 flex flex-col items-center"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1 mb-4 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  {match.homeTeam.logo && (
                    <img 
                      src={match.homeTeam.logo} 
                      alt={match.homeTeam.name} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">{match.homeTeam.name}</h3>
              <div className="text-blue-200 font-medium">Domaćin</div>
            </motion.div>

            {/* Center info */}
            <div className="my-6 lg:my-0 px-6 text-center">
              <div className="bg-white text-blue-600 font-bold text-2xl md:text-4xl px-6 py-3 rounded-lg shadow-lg mb-4">
                VS
              </div>
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex items-center justify-center">
                  <Calendar size={18} className="mr-2 text-orange-300" />
                  <span>{formatDate(match.date)}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock size={18} className="mr-2 text-orange-300" />
                  <span>20:00h</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin size={18} className="mr-2 text-orange-300" />
                  <span>{match.location}</span>
                </div>
              </div>
            </div>

            {/* Right team */}
            <motion.div 
              className="flex-1 flex flex-col items-center"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1 mb-4 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  {match.awayTeam.logo && (
                    <img 
                      src={match.awayTeam.logo} 
                      alt={match.awayTeam.name} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">{match.awayTeam.name}</h3>
              <div className="text-blue-200 font-medium">Gost</div>
            </motion.div>
          </div>
        </div>

        <div className="bg-blue-900 p-4 md:p-6 flex justify-between items-center">
          <div className="text-white text-lg font-medium">
            Ne propustite ovo!
          </div>
          <a 
            href="#" 
            className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow-md inline-flex items-center"
          >
            Rezerviši karte
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMatch;