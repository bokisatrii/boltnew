import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import StatsCounter from '../components/home/StatsCounter';
import LatestNews from '../components/home/LatestNews';
import { statsData } from '../data/stats';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Početna';
  }, []);

  return (
    <div>
      <Hero />
      <StatsCounter stats={statsData} />
      <LatestNews />
    </div>
  );
};

export default Home;