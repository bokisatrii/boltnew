/*
import { useState, useEffect } from 'react';
import { fetchSpotifyEpisodes, SpotifyEpisode } from '../services/spotifyApi';

export function useSpotifyEpisodes(limit: number = 5) {
  const [episodes, setEpisodes] = useState<SpotifyEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadEpisodes() {
      try {
        setLoading(true);
        setError(null);
        const fetchedEpisodes = await fetchSpotifyEpisodes(limit);
        
        if (!isCancelled) {
          setEpisodes(fetchedEpisodes);
        }
      } catch (e) {
        if (!isCancelled) {
          console.error('Error loading Spotify episodes:', e);
          setError('Greška pri učitavanju epizoda');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadEpisodes();

    return () => {
      isCancelled = true;
    };
  }, [limit]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEpisodes = await fetchSpotifyEpisodes(limit);
      setEpisodes(fetchedEpisodes);
    } catch (e) {
      console.error('Error refetching Spotify episodes:', e);
      setError('Greška pri učitavanju epizoda');
    } finally {
      setLoading(false);
    }
  };

  return { episodes, loading, error, refetch };
}