import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById('stats-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.5)'
          }}
          role="img"
          aria-label="Košarkaški teren sa loptom - pozadinska slika za Trojka iz ćoška fantasy ligu"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/70" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Dobrodošli u 
            <span className="block text-orange-500">Trojka iz ćoška</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10"
        >
          Pridružite se najuzbudljivijoj košarkaškoj ligi u regionu. Profesionalno takmičenje, 
          vrhunski igrači i nezaboravni momenti koji oduzimaju dah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link
            to="/register"
            className="btn-secondary px-8 py-4 text-lg shadow-lg hover:shadow-orange-500/20"
          >
            Prijavi ekipu
          </Link>
          <Link
            to="/league"
            className="btn bg-white text-blue-600 hover:bg-gray-100 focus:ring-blue-500 px-8 py-4 text-lg shadow-lg"
          >
            Rezultati lige
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToContent}
        >
          <ChevronDown className="text-white w-10 h-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;