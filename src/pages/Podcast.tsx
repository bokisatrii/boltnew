import React, { useEffect } from 'react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Podcast: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Trojka iz Ćoška Podcast';
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#2D1810] to-[#3D2420]">
      <section className="container text-center py-16">
        <AnimatedSection>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-[#D2691E] mb-6"
          >
            Trojka iz Ćoška
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-[#CD853F] max-w-2xl mx-auto mb-8"
          >
            Slušajte najnovije epizode našeg podcasta direktno na sajtu!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#CD853F]/20 max-w-5xl mx-auto"
          >
            <iframe
              title="Spotify Embed"
              src="https://open.spotify.com/embed/show/3bkhQToL2N4YJ5I2jSopfZ/video?utm_source=generator&theme=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '16px' }}
            ></iframe>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4 flex-wrap">
            <a
              href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
              className="btn-primary px-6 py-3 text-white bg-[#D2691E] hover:bg-[#CD853F] rounded-xl shadow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify
            </a>
            <a
              href="https://podcast.rs/show/trojka-iz-c"
              className="btn-primary px-6 py-3 text-white bg-[#8B4513] hover:bg-[#A0522D] rounded-xl shadow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Podcast.rs
            </a>
          </div>
        </AnimatedSection>
      </section>

      <section className="container mt-16">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-4">📚 Arhiva svih epizoda</h2>
          <p className="text-[#CD853F] mb-6">
            Automatski prikaz preko Spotify widget-a (powered by SociableKIT)
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://widgets.sociablekit.com/spotify-podcast/iframe/25576861"
              frameBorder="0"
              width="100%"
              height="1000"
              title="Podcast feed"
              loading="lazy"
            ></iframe>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Podcast;
