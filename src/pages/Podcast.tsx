// ✅ FILE: src/pages/Podcast.tsx

import React, { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import PlatformButton from '../components/podcast/PlatformButton';

const Podcast: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Trojka iz Ćoška Podcast';
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#2D1810] to-[#3D2420]">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2D1810]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#D2691E_0%,transparent_50%)] animate-pulse" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #D2691E 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #CD853F 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#D2691E] drop-shadow-2xl">
                Trojka iz Ćoška
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-[#D2691E]/90 max-w-4xl mx-auto font-medium leading-relaxed">
                Slušajte najnovije epizode direktno sa našeg sajta
              </p>
              <p className="text-lg md:text-xl text-[#CD853F] mt-4 max-w-2xl mx-auto">
                Vaš omiljeni košarkaški podcast sada i na webu
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <PlatformButton
                href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                text="Sve epizode na Spotify"
                bgColor="bg-[#D2691E] hover:bg-[#CD853F] shadow-xl"
                textColor="text-white"
              />
              <PlatformButton
                href="https://podcast.rs/show/trojka-iz-c"
                text="Slušaj na Podcast.rs"
                bgColor="bg-[#8B4513] hover:bg-[#A0522D] shadow-xl"
                textColor="text-white"
              />
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-[#CD853F]/20 hover:bg-[#CD853F]/30 text-[#D2691E] rounded-xl font-medium transition-all duration-300 hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border-2 border-[#CD853F]/30 hover:border-[#D2691E]/50"
              >
                <RefreshCw size={16} className="mr-2" />
                Osvežite stranicu
              </button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Spotify embed */}
      <section className="my-16">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2691E] mb-4 drop-shadow-lg">
            🎧 Najnovija epizoda
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#CD853F]/20 max-w-5xl mx-auto">
            <iframe
              style={{ borderRadius: '16px' }}
              src="https://open.spotify.com/embed/show/3bkhQToL2N4YJ5I2jSopfZ/video?utm_source=generator&theme=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Trojka iz Ćoška Podcast - Najnovija epizoda"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* SociableKIT widget */}
      <section className="my-24">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2691E] mb-4 drop-shadow-lg">
            📚 Sve epizode
          </h2>
          <p className="text-xl md:text-2xl text-[#CD853F] max-w-3xl mx-auto leading-relaxed">
            Automatski učitano putem Spotify feed-a
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto px-4">
          <div className="sk-ww-spotify-podcast" data-embed-id="25576861"></div>
          <script src="https://widgets.sociablekit.com/spotify-podcast/widget.js" defer></script>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
