import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { Users, Trophy, BarChart3, Calendar, ArrowRight, Star, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const WTFisFantasy: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Draft Your Team',
      description: 'Select real NBA players through a draft or auction to build your fantasy roster.',
      icon: Users,
    },
    {
      step: 2,
      title: 'Set Your Lineup',
      description: 'Choose which players to start each week based on matchups and schedules.',
      icon: Calendar,
    },
    {
      step: 3,
      title: 'Earn Points',
      description: 'Your players earn points based on their real-game statistics like points, rebounds, assists.',
      icon: BarChart3,
    },
    {
      step: 4,
      title: 'Compete & Win',
      description: 'Go head-to-head against other managers each week to climb the standings and win the championship.',
      icon: Trophy,
    },
  ];

  const categories = [
    { name: 'Points', abbr: 'PTS', example: '1 point per point scored' },
    { name: 'Rebounds', abbr: 'REB', example: '1.2 points per rebound' },
    { name: 'Assists', abbr: 'AST', example: '1.5 points per assist' },
    { name: 'Steals', abbr: 'STL', example: '3 points per steal' },
    { name: 'Blocks', abbr: 'BLK', example: '3 points per block' },
    { name: 'Turnovers', abbr: 'TO', example: '-1 point per turnover' },
  ];

  return (
    <>
      <SEO
        title="WTF is Fantasy Basketball? - Beginner's Guide | Corner Three"
        description="New to fantasy basketball? Learn the basics, how to play, draft strategies, and tips to dominate your league. Complete beginner's guide to fantasy hoops."
        keywords="fantasy basketball guide, how to play fantasy basketball, fantasy basketball for beginners, fantasy basketball tips"
        url="/fantasy/wtf-is-fantasy"
      />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase text-white bg-purple-500 rounded mb-4">
              Fantasy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">WTF is Fantasy Basketball?</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your complete beginner's guide to the most addictive way to enjoy basketball
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">The Basics</h2>
              <p className="text-lg text-purple-100">
                Fantasy basketball is a game where you act as a team manager, drafting real NBA players 
                to create your own virtual team. When your players perform well in real games, you earn 
                points. You compete against other managers in your league to see who can build the best team.
              </p>
            </motion.section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {steps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon className="w-5 h-5 text-purple-500" />
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Scoring Categories */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Scoring Categories</h2>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 font-bold text-gray-700 text-sm">
                  <span>Category</span>
                  <span>Abbr</span>
                  <span>Example Scoring</span>
                </div>
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-900">{cat.name}</span>
                    <span className="text-purple-500 font-bold">{cat.abbr}</span>
                    <span className="text-gray-600 text-sm">{cat.example}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Pro Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Beginners</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Star, title: 'Draft Smart', tip: 'Don\'t reach for your favorite players. Follow draft rankings and value.' },
                  { icon: Zap, title: 'Stay Active', tip: 'Check the waiver wire daily. The best managers find hidden gems.' },
                  { icon: Target, title: 'Plan Ahead', tip: 'Know the NBA schedule. Stream players with favorable matchups.' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 text-center"
                  >
                    <item.icon className="w-10 h-10 mx-auto text-purple-500 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.tip}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-purple-50 rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Play?</h2>
              <p className="text-gray-600 mb-6">
                Join the Corner Three Fantasy Basketball League and put your skills to the test!
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                Register Your Team <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WTFisFantasy;
