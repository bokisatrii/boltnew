import React, { useEffect } from 'react';
import { ExternalLink, RefreshCw, Play, Clock, Calendar } from 'lucide-react';
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
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#2D1810] to-[#3D2420]">
      {/* Hero sekcija sa novim bojama */}
      <section className="relative overflow-hidden">
        {/* Pozadina sa earth tone gradijentom */}
        <div className="absolute inset-0 bg-[#2D1810]" />
        
        {/* Dodajemo teksturu overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#D2691E_0%,transparent_50%)] animate-pulse" />
        </div>
        
        {/* Geometrijski pattern overlay */}
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
              {/* Naslov sa novom bojom */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#D2691E] drop-shadow-2xl">
                Trojka iz Ćoška
              </h1>
              
              {/* Podnaslov takođe u narandžastoj boji */}
              <p className="text-xl md:text-2xl lg:text-3xl text-[#D2691E]/90 max-w-4xl mx-auto font-medium leading-relaxed">
                Slušajte najnovije epizode direktno sa našeg sajta
              </p>
              
              {/* Dodajemo subtekst */}
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
                className="border-2 border-[#CD853F]/20 backdrop-blur-sm"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                }
              />
              
              <PlatformButton
                href="https://podcast.rs/show/trojka-iz-c"
                text="Slušaj na Podcast.rs"
                bgColor="bg-[#8B4513] hover:bg-[#A0522D] shadow-xl"
                textColor="text-white"
                className="border-2 border-[#CD853F]/20 backdrop-blur-sm"
                icon={<Play size={18} />}
              />
              
              {!loading && (
                <button
                  onClick={refetch}
                  className="inline-flex items-center px-6 py-3 bg-[#CD853F]/20 hover:bg-[#CD853F]/30 text-[#D2691E] rounded-xl font-medium transition-all duration-300 hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border-2 border-[#CD853F]/30 hover:border-[#D2691E]/50"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Osvežite epizode
                </button>
              )}
            </motion.div>

            {/* Dodajemo status statistike */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              <div className="bg-[#CD853F]/10 backdrop-blur-sm rounded-xl p-4 border border-[#CD853F]/20">
                <div className="text-2xl font-bold text-[#D2691E]">50+</div>
                <div className="text-[#CD853F] text-sm">Epizoda</div>
              </div>
              <div className="bg-[#CD853F]/10 backdrop-blur-sm rounded-xl p-4 border border-[#CD853F]/20">
                <div className="text-2xl font-bold text-[#D2691E]">10K+</div>
                <div className="text-[#CD853F] text-sm">Slušalaca</div>
              </div>
              <div className="bg-[#CD853F]/10 backdrop-blur-sm rounded-xl p-4 border border-[#CD853F]/20">
                <div className="text-2xl font-bold text-[#D2691E]">⭐ 4.8</div>
                <div className="text-[#CD853F] text-sm">Ocena</div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Loading state - optimizovan */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#CD853F]/20 border-t-[#D2691E] mx-auto mb-6"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-[#D2691E]/30 mx-auto"></div>
            </div>
            <p className="text-[#CD853F] text-lg font-medium">Učitavanje najnovijih epizoda...</p>
            <p className="text-[#8B4513] text-sm mt-2">Molimo sačekajte trenutak</p>
          </div>
        )}

        {/* Error state - poboljšan */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 max-w-lg mx-auto shadow-xl">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Greška pri učitavanju</h3>
              <p className="text-red-600 mb-4 text-lg">{error}</p>
              <p className="text-sm text-red-500 mb-6">
                Ne brinite - možete i dalje pristupiti svim epizodama direktno na platformama.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={refetch}
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Pokušajte ponovo
                </button>
                <PlatformButton
                  href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                  text="Idite na Spotify"
                  bgColor="bg-[#D2691E] hover:bg-[#CD853F]"
                  textColor="text-white"
                  className="shadow-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content - poboljšan styling */}
        {!loading && episodes.length > 0 && (
          <>
            {/* Najnovija epizoda sa embed player-om */}
            {latestEpisode && (
              <section className="my-16">
                <AnimatedSection className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2691E] mb-4 drop-shadow-lg">
                     Najnovija epizoda 🔥
                  </h2>
                  <p className="text-xl md:text-2xl text-[#CD853F] max-w-3xl mx-auto leading-relaxed">
                    Slušajte najnoviju epizodu direktno ovde ili na vašoj omiljenoj platformi
                  </p>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-gradient-to-br from-black/95 to-[#CD853F]/5 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-[#CD853F]/20 max-w-5xl mx-auto">
                    <div className="p-6 md:p-10">
                      {/* Episode info header */}
                      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-[#D2691E]/10 px-4 py-2 rounded-full">
                          <Calendar size={16} className="text-[#D2691E]" />
                          <span className="text-[#8B4513] text-sm font-medium">Novo</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#CD853F]/10 px-4 py-2 rounded-full">
                          <Clock size={16} className="text-[#CD853F]" />
                          <span className="text-[#8B4513] text-sm font-medium">~45 min</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D1810] mb-6 text-center leading-tight">
                        {latestEpisode.name}
                      </h3>
                      
                      {/* Spotify Embed Player - poboljšan */}
                      <div className="relative w-full mb-8">
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#CD853F]/20">
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
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#D2691E] rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#CD853F] rounded-full animate-pulse delay-500"></div>
                      </div>

                      <p className="text-[#8B4513] text-center mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                        {latestEpisode.description}
                      </p>

                      <div className="flex flex-wrap justify-center gap-4">
                        <PlatformButton
                          href={latestEpisode.external_urls?.spotify}
                          text="Otvori na Spotify"
                          bgColor="bg-[#D2691E] hover:bg-[#CD853F] shadow-xl"
                          textColor="text-white"
                          className="text-lg px-8 py-4 border-2 border-[#CD853F]/20"
                          icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          }
                        />
                        
                        <PlatformButton
                          href="https://podcast.rs/show/trojka-iz-c"
                          text="Slušaj na Podcast.rs"
                          bgColor="bg-[#8B4513] hover:bg-[#A0522D] shadow-xl"
                          textColor="text-white"
                          className="text-lg px-8 py-4 border-2 border-[#CD853F]/20"
                          icon={<ExternalLink size={20} />}
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </section>
            )}

            {/* Ostale epizode - poboljšan dizajn */}
            {otherEpisodes.length > 0 && (
              <section className="my-16">
                <AnimatedSection className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2691E] mb-4 drop-shadow-lg">
                    📚 Prethodne epizode
                  </h2>
                  <p className="text-xl md:text-2xl text-[#CD853F] max-w-3xl mx-auto leading-relaxed">
                    Istražite našu bogatu kolekciju epizoda o košarci i sportu
                  </p>
                </AnimatedSection>

                <div className="space-y-8">
                  {otherEpisodes.map((episode, index) => (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EpisodeCard
                        episode={episode}
                        index={index}
                        className="bg-gradient-to-br from-white/95 to-[#CD853F]/5 border-2 border-[#CD853F]/20 hover:border-[#D2691E]/40 shadow-xl hover:shadow-2xl"
                      />
                    </motion.div>
                  ))}
                </div>

                <AnimatedSection className="text-center mt-16">
                  <div className="bg-gradient-to-br from-[#D2691E]/10 to-[#CD853F]/10 rounded-3xl p-8 border-2 border-[#CD853F]/20 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-[#2D1810] mb-4">
                      Želite još epizoda?
                    </h3>
                    <p className="text-[#8B4513] mb-6">
                      Pogledajte kompletnu arhivu na našim platformama
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      <PlatformButton
                        href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                        text="Sve epizode na Spotify"
                        bgColor="bg-[#D2691E] hover:bg-[#CD853F] shadow-xl"
                        textColor="text-white"
                        className="text-lg px-8 py-4"
                        icon={<ExternalLink size={20} />}
                      />
                      
                      <PlatformButton
                        href="https://podcast.rs/show/trojka-iz-c"
                        text="Sve epizode na Podcast.rs"
                        bgColor="bg-[#8B4513] hover:bg-[#A0522D] shadow-xl"
                        textColor="text-white"
                        className="text-lg px-8 py-4"
                        icon={<ExternalLink size={20} />}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </section>
            )}
          </>
        )}

        {/* Empty state - poboljšan */}
        {!loading && !error && episodes.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-[#CD853F]/5 to-[#D2691E]/5 border-2 border-[#CD853F]/20 rounded-3xl p-12 max-w-2xl mx-auto shadow-xl">
              <div className="text-8xl mb-6">🎙️</div>
              <h3 className="text-2xl font-bold text-[#2D1810] mb-4">
                Epizode se uskoro učitavaju
              </h3>
              <p className="text-[#8B4513] text-lg mb-8 leading-relaxed">
                U međuvremenu, možete pristupiti svim našim epizodama direktno na platformama.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <PlatformButton
                  href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                  text="Slušaj na Spotify"
                  bgColor="bg-[#D2691E] hover:bg-[#CD853F] shadow-xl"
                  textColor="text-white"
                  className="text-lg px-8 py-4"
                />
                
                <PlatformButton
                  href="https://podcast.rs/show/trojka-iz-c"
                  text="Slušaj na Podcast.rs"
                  bgColor="bg-[#8B4513] hover:bg-[#A0522D] shadow-xl"
                  textColor="text-white"
                  className="text-lg px-8 py-4"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcast;