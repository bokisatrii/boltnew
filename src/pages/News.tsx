import React, { useEffect, useState } from 'react';
import NewsGrid from '../components/news/NewsGrid';
import AnimatedSection from '../components/ui/AnimatedSection';
import { fetchBlogPosts } from '../services/sheetbestApi';
import { BlogPost } from '../types';

const News: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<string>('sve');

  useEffect(() => {
    document.title = 'BasketLiga - Vesti';
    fetchBlogPosts().then(setPosts);
  }, []);

  const filtered = filter === 'sve' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Vesti</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najnovije vesti, informacije i događaji iz BasketLige
          </p>
        </AnimatedSection>

        {/* Filter dugmići */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['sve', 'nba', 'europe', 'ncaa', 'fantasy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-medium border transition ${
                filter === cat ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat === 'sve' ? 'Sve' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <NewsGrid articles={filtered} />
      </div>
    </div>
  );
};

export default News;
