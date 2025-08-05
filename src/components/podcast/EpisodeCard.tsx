import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpotifyEpisode, formatDuration, formatReleaseDate } from '../../services/spotifyApi';
import PlatformButton from './PlatformButton';

interface EpisodeCardProps {
  episode: SpotifyEpisode;
  index: number;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, index }) => {
  const thumbnail = episode.images?.[0]?.url || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-white/20"
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
          <img
            src={thumbnail}
            alt={episode.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {episode.name}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-blue-500" />
                  <span>{formatReleaseDate(episode.release_date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-blue-500" />
                  <span>{formatDuration(episode.duration_ms)}</span>
                </div>
                {episode.explicit && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    Explicit
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {episode.description}
              </p>
            </div>

            {/* Platform buttons */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <PlatformButton
                href={episode.external_urls.spotify}
                text="Slušaj na Spotify"
                bgColor="bg-[#1db954] hover:bg-[#1ed760]"
                textColor="text-white"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                }
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EpisodeCard;