import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { blogAPI } from '../services/blogApi';
import { BlogPost } from '../types/blog';

const Home: React.FC = () => {
  const [featuredArticle, setFeaturedArticle] = useState<BlogPost | null>(null);
  const [latestArticles, setLatestArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const posts = await blogAPI.fetchBlogPosts();
        
        if (posts.length > 0) {
          const sortedPosts = posts.sort((a, b) => 
            new Date(b.datum).getTime() - new Date(a.datum).getTime()
          );
          setFeaturedArticle(sortedPosts[0]);
          setLatestArticles(sortedPosts.slice(1, 7));
        }
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      nba: 'bg-red-500',
      ncaa: 'bg-blue-500',
      europe: 'bg-green-500',
      fantasy: 'bg-purple-500',
      tv: 'bg-yellow-500',
      cornerthree: 'bg-orange-500',
      featured: 'bg-gray-900',
    };
    return colors[category.toLowerCase()] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16">
        <div className="container">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest news...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Corner Three - Basketball Podcast & Fantasy League"
        description="Your source for NBA, EuroLeague, NCAA basketball analysis, fantasy tips, and the latest basketball news. Listen to our podcast and join the fantasy league."
        keywords="corner three, basketball podcast, NBA, EuroLeague, NCAA, fantasy basketball, basketball news, basketball analysis"
        url="/"
      />
      <StructuredData type="organization" />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link 
                to={`/news/${featuredArticle.slug}`}
                className="group block relative overflow-hidden rounded-xl bg-gray-900"
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9]">
                  <img
                    src={featuredArticle.slika}
                    alt={featuredArticle.naslov}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    {/* Category Badge */}
                    {featuredArticle.category[0] && (
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded mb-4 ${getCategoryColor(featuredArticle.category[0])}`}>
                        {featuredArticle.category[0]}
                      </span>
                    )}
                    
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-orange-400 transition-colors">
                      {featuredArticle.naslov}
                    </h1>
                    
                    <div className="flex items-center text-gray-300 text-sm md:text-base">
                      {featuredArticle.autor && (
                        <>
                          <span className="font-medium">By {featuredArticle.autor}</span>
                          <span className="mx-2">•</span>
                        </>
                      )}
                      <span>{formatDate(featuredArticle.datum)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}

          {/* The Latest Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">The Latest</h2>
                <ChevronRight size={24} className="text-gray-400" />
              </div>
              <Link 
                to="/news" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/news/${article.slug}`} className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
                      <img
                        src={article.slika}
                        alt={article.naslov}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      {article.category[0] && (
                        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase text-white rounded ${getCategoryColor(article.category[0])}`}>
                          {article.category[0]}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.naslov}
                    </h3>

                    <div className="flex items-center text-gray-500 text-sm">
                      {article.autor && (
                        <>
                          <span className="font-medium">By {article.autor}</span>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Noteworthy Reads Section */}
          {latestArticles.length > 4 && (
            <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: More Articles */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestArticles.slice(0, 4).map((article, index) => (
                    <motion.article
                      key={`more-${article.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Link to={`/news/${article.slug}`} className="flex gap-4 w-full">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={article.slika}
                            alt={article.naslov}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.naslov}
                          </h4>
                          <div className="text-gray-500 text-xs flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.datum)}
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Right: Noteworthy Reads */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Noteworthy Reads</h3>
                <div className="space-y-4">
                  {latestArticles.slice(0, 5).map((article, index) => (
                    <Link
                      key={`noteworthy-${article.id}`}
                      to={`/news/${article.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getCategoryColor(article.category[0] || 'featured')}`} />
                      <span className="text-gray-800 text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.naslov}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
