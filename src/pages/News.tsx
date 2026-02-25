import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import SEO from '../components/SEO';
import { useBlogPosts } from '../hooks/useBlog';

const News: React.FC = () => {
  const { posts, loading, error, refetch } = useBlogPosts();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
      setFilter(categoryFromUrl);
    }
  }, [location.search]);

  const getCategoryName = () => {
    const categoryNames: { [key: string]: string } = {
      'all': 'All News',
      'nba': 'NBA News',
      'europe': 'European Basketball News',
      'ncaa': 'NCAA News',
      'fantasy': 'Fantasy Basketball News',
      'tv': 'TV & Media News',
      'cornerthree': 'Corner Three Originals'
    };
    return categoryNames[filter] || 'All News';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      nba: 'bg-red-500',
      ncaa: 'bg-blue-500',
      europe: 'bg-green-500',
      fantasy: 'bg-purple-500',
      tv: 'bg-yellow-500',
      cornerthree: 'bg-orange-500',
    };
    return colors[category.toLowerCase()] || 'bg-gray-500';
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => 
        post.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
      );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <SEO
        title={`${getCategoryName()} - Corner Three`}
        description={`Latest ${getCategoryName().toLowerCase()} from the world of basketball. Follow NBA, EuroLeague, NCAA and fantasy basketball all in one place.`}
        keywords={`basketball news, NBA news, EuroLeague news, fantasy basketball, ${filter} news, corner three`}
        url={filter === 'all' ? '/news' : `/news?category=${filter}`}
      />

      <div className="pt-28 pb-16">
        <div className="container">
          <AnimatedSection className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">News</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The latest news, updates, and analysis from the world of basketball
            </p>
          </AnimatedSection>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'nba', 'europe', 'ncaa', 'fantasy', 'tv', 'cornerthree'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat === 'cornerthree' ? 'Corner Three' : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          {!loading && (
            <div className="flex justify-center mb-6">
              <button
                onClick={refetch}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ↻ Refresh News
              </button>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading news...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button onClick={refetch} className="btn-primary text-sm">
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">No articles found for this category.</p>
              <button onClick={() => setFilter('all')} className="btn-primary">
                View All News
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <Link to={`/news/${article.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={article.slika}
                        alt={article.naslov}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.category[0] && (
                        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase text-white rounded ${getCategoryColor(article.category[0])}`}>
                          {article.category[0]}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.naslov}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {article.tekst?.slice(0, 120)}...
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        {article.autor && (
                          <>
                            <span className="font-medium">By {article.autor}</span>
                            <span className="mx-2">•</span>
                          </>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(article.datum)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
