import React, { useEffect, useState, useRef } from 'react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2, AlertCircle } from 'lucide-react';

// Skeleton Loading Component
const SkeletonLoader: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-gradient-to-r from-[#CD853F]/20 to-[#D2691E]/20 rounded-2xl ${className}`}>
    <div className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
  </div>
);

// Error Fallback Component
const ErrorFallback: React.FC<{ onRetry?: () => void; message?: string }> = ({ 
  onRetry, 
  message = "Sadržaj se nije mogao učitati" 
}) => (
  <div className="flex flex-col items-center justify-center p-8 bg-[#3D2420]/50 rounded-2xl border border-[#CD853F]/20">
    <AlertCircle className="w-12 h-12 text-[#CD853F] mb-4" />
    <p className="text-[#CD853F] text-center mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#D2691E] hover:bg-[#CD853F] text-white rounded-lg transition-colors duration-200"
      >
        Pokušaj ponovo
      </button>
    )}
  </div>
);

// Lazy Loading Hook
const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasLoaded]);

  return { ref, isVisible, hasLoaded };
};

// Iframe Component with Loading States
const IframeWithLoading: React.FC<{
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}> = ({ 
  src, 
  title, 
  className = "", 
  style, 
  height = "100%", 
  lazy = true,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { ref, isVisible } = useLazyLoad(0.2);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {(!lazy || isVisible) && !hasError && (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-10">
              <SkeletonLoader className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 text-[#CD853F]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Učitava se...</span>
                </div>
              </div>
            </div>
          )}
          <iframe
            src={src}
            title={title}
            width="100%"
            height={height}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={style}
            onLoad={handleLoad}
            onError={handleError}
            className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
          />
        </>
      )}
      
      {hasError && (
        <div className="absolute inset-0">
          <ErrorFallback 
            onRetry={handleRetry}
            message="Podcast se nije mogao učitati. Proverite internetsku vezu."
          />
        </div>
      )}
      
      {lazy && !isVisible && (
        <SkeletonLoader className="w-full h-full" />
      )}
    </div>
  );
};

const Podcast: React.FC = () => {
  const [spotifyLoaded, setSpotifyLoaded] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);

  useEffect(() => {
    // Enhanced SEO
    document.title = 'Trojka iz ćoška - Podcast | Najnovije Epizode';
    
    // Add meta tags for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Slušajte najnovije epizode Trojka iz ćoška podcasta. Košarka, NBA, analiza i diskusije - sve na jednom mestu!');
    }

    // Add structured data for better search visibility
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "PodcastSeries",
      "name": "Trojka iz Ćoška",
      "description": "Košarkaški podcast BasketLiga sajta",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "Trojka iz ćoška"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#2D1810] to-[#3D2420]">
      {/* Hero Section */}
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
          
          {/* Spotify Player with Enhanced Loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#CD853F]/20 max-w-5xl mx-auto group hover:ring-[#D2691E]/30 transition-all duration-300"
          >
            {/* Loading Skeleton - positioned behind iframe */}
            {!spotifyLoaded && (
              <div className="absolute inset-0 z-0">
                <SkeletonLoader className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#CD853F]">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Učitava se...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Original Spotify iframe - maintains aspect ratio */}
            <iframe
              title="Trojka iz Ćoška - Spotify Podcast Player"
              src="https://open.spotify.com/embed/show/3bkhQToL2N4YJ5I2jSopfZ/video?utm_source=generator&theme=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '16px' }}
              onLoad={() => setSpotifyLoaded(true)}
              className="relative z-10"
            />
          </motion.div>
          
          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mt-8 gap-4 flex-wrap"
          >
            <a
              href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
              className="group px-6 py-3 text-white bg-[#D2691E] hover:bg-[#CD853F] rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Slušaj na Spotify"
            >
              <span>Spotify</span>
              <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            </a>
            <a
              href="https://podcast.rs/show/trojka-iz-c"
              className="group px-6 py-3 text-white bg-[#8B4513] hover:bg-[#A0522D] rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Slušaj na Podcast.rs"
            >
              <span>Podcast.rs</span>
              <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            </a>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Archive Section with Lazy Loading */}
      <section className="container mt-16">
        <AnimatedSection className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-[#D2691E] mb-4"
          >
            📚 Arhiva svih epizoda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#CD853F] mb-6"
          >
            Slušaj sve epizode ovde ili na Spotify
          </motion.p>
          
          {/* Responsive Archive Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <IframeWithLoading
              src="https://widgets.sociablekit.com/spotify-podcast/iframe/25576861"
              title="Trojka iz Ćoška - Arhiva svih epizoda"
              height="1000"
              className="w-full"
              lazy={true} // Archive loads when user scrolls
              onLoad={() => setArchiveLoaded(true)}
            />
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Loading Status Indicator (Optional - for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-sm">
          Spotify: {spotifyLoaded ? '✅' : '⏳'} | Archive: {archiveLoaded ? '✅' : '⏳'}
        </div>
      )}
    </div>
  );
};

export default Podcast;