import React, { useEffect, useState } from 'react';
import NewsGrid from '../components/news/NewsGrid';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useBlogPosts } from '../hooks/useBlog';

const News: React.FC = () => {
  const { posts, loading, error, refetch } = useBlogPosts();
  const [filter, setFilter] = useState<string>('sve');

  useEffect(() => {
    document.title = 'BasketLiga - Vesti';
    
    // Update filter when URL changes
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
      setFilter(categoryFromUrl);
    }
  }, [location.search]);

  // Filter posts based on selected category - now supports multiple categories per post
  const filteredPosts = filter === 'sve' 
    ? posts 
    : posts.filter(post => 
        post.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Vesti</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najnovije vesti, informacije i događaji iz BasketLige
          </p>
        </AnimatedSection>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['sve', 'nba', 'europe', 'ncaa', 'fantasy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-medium border transition ${
                filter === cat 
                  ? 'bg-blue-100 text-blue-700 border-blue-300' 
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat === 'sve' ? 'Sve' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Refresh button */}
        {!loading && (
          <div className="flex justify-center mb-6">
            <button
              onClick={refetch}
              className="btn-secondary text-sm px-4 py-2"
            >
              Osvežite vesti
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Učitavanje vesti...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="btn-primary text-sm"
              >
                Pokušajte ponovo
              </button>
            </div>
          </div>
        ) : (
          <NewsGrid articles={filteredPosts} />
        )}
      </div>
    </div>
  );
};

export default News;