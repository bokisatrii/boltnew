import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { fetchBlogPosts } from '../../services/sheetbestApi';
import { BlogPost } from '../../types';

const LatestNews: React.FC = () => {
  const [vesti, setVesti] = useState<BlogPost[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<BlogPost | null>(null);
  const [recentArticles, setRecentArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts().then((data: BlogPost[]) => {
      // Sort by date
      const sortedData = data.sort((a, b) => {
        return new Date(b.datum).getTime() - new Date(a.datum).getTime();
      });
      
      // Find featured article (first one)
      setFeaturedArticle(sortedData[0]);
      
      // Get next 3 articles for recent news
      setRecentArticles(sortedData.slice(1, 4));
      
      setVesti(sortedData);
    });
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('sr-RS', options);
  };

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Najnovije vesti</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Budite u toku sa najnovijim dešavanjima, rezultatima i informacijama iz BasketLige
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured Article */}
          <AnimatedSection className="lg:col-span-3">
            <div className="card h-full overflow-hidden group">
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img 
                  src={featuredArticle.slika} 
                  alt={featuredArticle.naslov}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 text-xs font-medium rounded-full mb-2">
                    Istaknuto
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{featuredArticle.naslov}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  {featuredArticle.autor && <span>{featuredArticle.autor}</span>}
                  <span className="mx-2">•</span>
                  <span>{formatDate(featuredArticle.datum)}</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {featuredArticle.tekst?.slice(0, 150)}...
                </p>
                {featuredArticle.slug && (
                  <Link 
                    to={`/news/${featuredArticle.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Pročitaj više 
                    <ChevronRight size={18} className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Recent Articles */}
          <div className="lg:col-span-2 space-y-6">
            {recentArticles.map((article, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="card overflow-hidden group">
                <Link to={`/news/${article.slug}`} className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                    <img 
                      src={article.slika} 
                      alt={article.naslov}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="sm:w-2/3 p-4 sm:p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(article.datum)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.naslov}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.tekst?.slice(0, 100)}...
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link 
            to="/news"
            className="btn-primary px-8 py-3"
          >
            Sve vesti
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LatestNews;