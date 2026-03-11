import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogAPI } from '../services/blogApi';
import { BlogPost } from '../types/blog';

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const post = await blogAPI.getBlogPostBySlug(slug);
        
        if (post) {
          setArticle(post);
          
          // Load related articles
          const allPosts = await blogAPI.fetchBlogPosts();
          const related = allPosts
            .filter(p => p.slug !== slug)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
    window.scrollTo(0, 0);
  }, [slug]);

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
    };
    return colors[category.toLowerCase()] || 'bg-gray-500';
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="pt-32 pb-16">
        <div className="container">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/news" className="btn-primary">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${article.naslov} - Corner Three`}
        description={article.tekst?.slice(0, 160)}
        keywords={article.category.join(', ')}
        url={`/news/${article.slug}`}
        image={article.slika}
      />

      <article className="pt-28 pb-16">
        <div className="container">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </motion.button>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.category.map((cat) => (
                <span
                  key={cat}
                  className={`px-3 py-1 text-xs font-bold uppercase text-white rounded ${getCategoryColor(cat)}`}
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.naslov}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              {article.autor && (
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span className="font-medium">{article.autor}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(article.datum)}</span>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <img
              src={article.slika}
              alt={article.naslov}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="prose prose-lg max-w-none">
                {article.tekst?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-gray-600 font-medium">
                    <Share2 size={18} />
                    Share this article:
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.naslov)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#1DA1F2] text-white rounded-full hover:opacity-80 transition-opacity"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#4267B2] text-white rounded-full hover:opacity-80 transition-opacity"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.naslov)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#0077B5] text-white rounded-full hover:opacity-80 transition-opacity"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              {relatedArticles.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        to={`/news/${related.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={related.slika}
                            alt={related.naslov}
                            className="w-20 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {related.naslov}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatDate(related.datum)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </article>
    </>
  );
};

export default NewsDetail;
