import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogAPI } from '../../services/blogApi';
import { BlogPost } from '../../types/blog';
import SEO from '../SEO';

interface CategoryNewsPageProps {
  category: string;
  title: string;
  description: string;
  keywords?: string;
}

const CategoryNewsPage: React.FC<CategoryNewsPageProps> = ({
  category,
  title,
  description,
  keywords = '',
}) => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const posts = await blogAPI.getBlogPostsByCategory(category);
        const sorted = posts.sort((a, b) => 
          new Date(b.datum).getTime() - new Date(a.datum).getTime()
        );
        setArticles(sorted);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [category]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      nba: 'bg-red-500',
      ncaa: 'bg-blue-500',
      europe: 'bg-green-500',
      fantasy: 'bg-purple-500',
      tv: 'bg-yellow-500',
      cornerthree: 'bg-orange-500',
    };
    return colors[cat.toLowerCase()] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16">
        <div className="container">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {title}...</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <>
      <SEO
        title={`${title} - Corner Three`}
        description={description}
        keywords={keywords || `${category} basketball, ${category} news, corner three, basketball`}
        url={`/${category.toLowerCase()}`}
      />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 text-xs font-bold uppercase text-white rounded mb-3 ${getCategoryColor(category)}`}>
              {category.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">No articles found in this category yet.</p>
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-orange-400 transition-colors">
                          {featuredArticle.naslov}
                        </h2>
                        
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

              {/* Articles Grid */}
              {remainingArticles.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">More {title}</h2>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <Link to={`/news/${article.slug}`} className="block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
                            <img
                              src={article.slika}
                              alt={article.naslov}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

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
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryNewsPage;
