import React, { useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import EpisodeCard from '../components/podcast/EpisodeCard';
import PlatformButton from '../components/podcast/PlatformButton';
import { useSpotifyEpisodes } from '../hooks/useSpotifyEpisodes';

const Podcast: React.FC = () => {
  const { episodes, loading, error, refetch } = useSpotifyEpisodes(5);

  useEffect(() => {
    document.title = 'BasketLiga - Trojka iz Ćoška Podcast';
  }, []);

  const latestEpisode = episodes[0];
  const otherEpisodes = episodes.slice(1);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero sekcija sa gradijentom */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1db954] via-[#1ed760] to-[#543d08]" />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="container relative z-10 py-16 md:py-24">
          <AnimatedSection className="text-center text-white">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                🎙️ Trojka iz Ćoška
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Slušajte najnovije epizode direktno sa našeg sajta
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <PlatformButton
                href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                text="Sve epizode na Spotify"
                bgColor="bg-white hover:bg-gray-100"
                textColor="text-[#1db954]"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                }
              />
              
              {!loading && (
                <button
                  onClick={refetch}
                  className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Osvežite epizode
                </button>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1db954] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Učitavanje epizoda...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 mb-4 text-lg">{error}</p>
              <p className="text-sm text-red-500 mb-6">
                Prikazuju se rezervni podaci. Proverite Spotify konfiguraciju.
              </p>
              <button
                onClick={refetch}
                className="btn-primary text-sm"
              >
                Pokušajte ponovo
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && episodes.length > 0 && (
          <>
            {/* Najnovija epizoda sa embed player-om */}
            {latestEpisode && (
              <section className="my-16">
                <AnimatedSection className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Najnovija epizoda
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Slušajte najnoviju epizodu direktno ovde ili na Spotify
                  </p>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 max-w-4xl mx-auto">
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                        {latestEpisode.name}
                      </h3>
                      
                      {/* Spotify Embed Player */}
                      <div className="relative w-full mb-6">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                          <iframe
                            style={{ borderRadius: '12px' }}
                            src="https://open.spotify.com/embed/show/3bkhQToL2N4YJ5I2jSopfZ/video?utm_source=generator"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Trojka iz Ćoška Podcast"
                          />
                        </div>
                      </div>

                      <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
                        {latestEpisode.description}
                      </p>

                      <div className="flex justify-center">
                        <PlatformButton
                          href={latestEpisode.external_urls.spotify}
                          text="Otvori na Spotify"
                          bgColor="bg-[#1db954] hover:bg-[#1ed760]"
                          textColor="text-white"
                          icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </section>
            )}

            {/* Ostale epizode */}
            {otherEpisodes.length > 0 && (
              <section className="my-16">
                <AnimatedSection className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Prethodne epizode
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Istražite našu kolekciju epizoda o košarci
                  </p>
                </AnimatedSection>

                <div className="space-y-6">
                  {otherEpisodes.map((episode, index) => (
                    <EpisodeCard
                      key={episode.id}
                      episode={episode}
                      index={index}
                    />
                  ))}
                </div>

                <AnimatedSection className="text-center mt-12">
                  <PlatformButton
                    href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                    text="Pogledajte sve epizode"
                    bgColor="bg-[#1db954] hover:bg-[#1ed760]"
                    textColor="text-white"
                    icon={<ExternalLink size={20} />}
                    className="text-lg px-8 py-4"
                  />
                </AnimatedSection>
              </section>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && !error && episodes.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-yellow-600 text-lg mb-4">
                Trenutno nema dostupnih epizoda.
              </p>
              <PlatformButton
                href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                text="Idite na Spotify"
                bgColor="bg-[#1db954] hover:bg-[#1ed760]"
                textColor="text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcast;