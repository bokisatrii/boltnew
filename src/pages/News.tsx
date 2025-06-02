import React, { useEffect } from 'react';
import NewsGrid from '../components/news/NewsGrid';
import AnimatedSection from '../components/ui/AnimatedSection';
import { newsArticles } from '../data/news';

const News: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Vesti';
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Vesti</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najnovije vesti, informacije i događaji iz BasketLige
          </p>
        </AnimatedSection>

        <NewsGrid />

      </div>
    </div>
  );
};

export default News;