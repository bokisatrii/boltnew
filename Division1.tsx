import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { Trophy, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Division1: React.FC = () => {
  return (
    <>
      <SEO
        title="Fantasy Division 1 - Corner Three Fantasy League"
        description="Corner Three Fantasy Basketball Division 1 standings and stats. Compete with the best in our top fantasy basketball division."
        keywords="fantasy basketball division 1, Corner Three fantasy league, fantasy basketball standings"
        url="/fantasy/division-1"
      />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase text-white bg-purple-500 rounded mb-4">
              Fantasy
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Division 1</h1>
            <p className="text-gray-600">The premier division of the Corner Three Fantasy Basketball League</p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Trophy, label: 'Current Season', value: '2025-26' },
              { icon: Users, label: 'Teams', value: '12' },
              { icon: TrendingUp, label: 'Weeks Completed', value: '14' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-50 rounded-xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Standings Placeholder */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">League Standings</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🏀</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Yahoo Fantasy Integration Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                Real-time standings from Yahoo Fantasy Basketball will be displayed here.
              </p>
              <Link to="/league" className="btn-primary">
                View Current League Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Division1;
