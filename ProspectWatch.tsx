import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { TrendingUp, Star, Target, Users } from 'lucide-react';

const ProspectWatch: React.FC = () => {
  const topProspects = [
    {
      rank: 1,
      name: 'Player One',
      school: 'University A',
      position: 'PG',
      height: '6\'4"',
      description: 'Elite ball handler with exceptional court vision and scoring ability.',
    },
    {
      rank: 2,
      name: 'Player Two',
      school: 'University B',
      position: 'SF',
      height: '6\'8"',
      description: 'Versatile two-way player with NBA-ready defensive skills.',
    },
    {
      rank: 3,
      name: 'Player Three',
      school: 'University C',
      position: 'C',
      height: '7\'0"',
      description: 'Dominant rim protector with developing offensive game.',
    },
    {
      rank: 4,
      name: 'Player Four',
      school: 'University D',
      position: 'SG',
      height: '6\'5"',
      description: 'Lethal shooter with great off-ball movement and basketball IQ.',
    },
    {
      rank: 5,
      name: 'Player Five',
      school: 'University E',
      position: 'PF',
      height: '6\'9"',
      description: 'Modern stretch four who can guard multiple positions.',
    },
  ];

  return (
    <>
      <SEO
        title="Prospect Watch - NCAA Basketball Draft Prospects | Corner Three"
        description="Track the top NBA draft prospects from college basketball. Scouting reports, rankings, and analysis of future NBA stars."
        keywords="NBA draft prospects, college basketball prospects, NBA draft rankings, NCAA basketball scouts, basketball scouting"
        url="/ncaa/prospect-watch"
      />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase text-white bg-blue-500 rounded mb-4">
              NCAA
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Prospect Watch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to the top NBA draft prospects in college basketball
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Star, label: 'Top Prospects', value: '100+' },
              { icon: Users, label: 'Schools Tracked', value: '350+' },
              { icon: Target, label: 'Draft Picks Predicted', value: '60' },
              { icon: TrendingUp, label: 'Accuracy Rate', value: '87%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Top Prospects List */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 5 Prospects</h2>
            <div className="space-y-4">
              {topProspects.map((prospect, index) => (
                <motion.div
                  key={prospect.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {prospect.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{prospect.name}</h3>
                        <span className="text-sm text-gray-500">{prospect.school}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mb-2">
                        <span className="font-medium">Position: {prospect.position}</span>
                        <span>Height: {prospect.height}</span>
                      </div>
                      <p className="text-gray-600">{prospect.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Coming Soon Notice */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Full Scouting Reports Coming Soon</h3>
            <p className="text-gray-600">
              Detailed scouting reports, video breakdowns, and draft projections will be available soon. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProspectWatch;
