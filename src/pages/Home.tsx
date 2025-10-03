import React from 'react';
import Hero from '../components/home/Hero';
import StatsCounter from '../components/home/StatsCounter';
import LatestNews from '../components/home/LatestNews';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { statsData } from '../data/stats';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Trojka iz ćoška - Košarkaški podcast i fantasy liga"
        description="Pridružite se najuzbudljivijoj fantasy košarkaškoj ligi u regionu. Slušajte naš podcast sa analizama NBA, Evrolige i pratite rezultate lige uživo."
        keywords="trojka iz ćoška, fantasy košarka srbija, košarkaški podcast, NBA analiza, Evroliga, fantasy liga, košarka srbija, basketball podcast"
        url="/"
      />
      <StructuredData type="organization" />

      <div>
        <Hero />
        <StatsCounter stats={statsData} />
        <LatestNews />
      </div>
    </>
  );
};

export default Home;