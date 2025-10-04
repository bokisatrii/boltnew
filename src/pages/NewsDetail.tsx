import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useBlogPost, useBlogPosts } from "../hooks/useBlog";

// Function to render content with embedded images
const renderContent = (tekst: string) => {
  const parts = tekst.split(/<<IMG:(.*?)>>/g);
  return parts.map((part, i) => {
    if (part.startsWith("http") && part.match(/\.(jpeg|jpg|png|webp|gif|avif)$/i)) {
      return (
        <img
          key={i}
          src={part}
          alt=""
          className="w-full sm:w-2/3 mx-auto my-6 rounded shadow-md"
        />
      );
    }
    return (
      <p key={i} className="mb-4 text-gray-800 whitespace-pre-line">
        {part}
      </p>
    );
  });
};

const NewsDetail = () => {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug || "");
  const { posts: allPosts } = useBlogPosts();


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("sr-RS", options);
  };

  const renderCategoryBadges = (categories: string[]) => {
    return categories.map((cat, index) => (
      <span 
        key={index}
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2 ${
          cat === 'featured' 
            ? 'bg-orange-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}
      >
        {cat.toUpperCase()}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Učitavanje članka...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Članak nije pronađen
            </h1>
            <p className="text-gray-600 mb-8">
              {error || "Članak koji tražite ne postoji ili je uklonjen."}
            </p>
            <Link to="/news" className="btn-primary">
              Nazad na vesti
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get related articles (same categories, excluding current one)
  const relatedArticles = allPosts
    .filter((article) =>
      article.slug !== slug &&
      article.category.some(cat => post?.category.includes(cat))
    )
    .slice(0, 3);

  // If not enough related by category, fill with other recent articles
  if (relatedArticles.length < 3) {
    const additionalArticles = allPosts
      .filter((article) =>
        article.slug !== slug &&
        !relatedArticles.find(rel => rel.slug === article.slug)
      )
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additionalArticles);
  }

  return (
    <>
      <SEO
        title={`${post.naslov} | Trojka iz ćoška`}
        description={post.tekst.slice(0, 155) + '...'}
        keywords={`${post.category.join(', ')}, košarka vesti, trojka iz ćoška, ${post.naslov}`}
        image={post.slika}
        url={`/news/${post.slug}`}
        type="article"
        author={post.autor}
        publishedTime={post.datum}
        section={post.category[0]}
        tags={post.category}
      />
      <StructuredData
        type="article"
        title={post.naslov}
        description={post.tekst.slice(0, 200)}
        image={post.slika}
        datePublished={post.datum}
        author={post.autor || 'Trojka iz ćoška'}
        url={`https://trojkaizcoska.com/news/${post.slug}`}
      />

      <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection>
          {/* Breadcrumb */}
          <Breadcrumb items={[
            { name: 'Vesti', url: '/news' },
            { name: post.naslov, url: `/news/${post.slug}` }
          ]} />

          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={18} className="mr-2" />
              Nazad na sve vesti
            </Link>
          </div>

          {/* Article details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 sm:h-96 overflow-hidden">
              <img
                src={post.slika}
                alt={`${post.naslov} - Košarkaška vest na Trojka iz ćoška`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {post.naslov}
              </h1>

              <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
                {post.autor && (
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-blue-500" />
                    <span>{post.autor}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-blue-500" />
                  <span>{formatDate(post.datum)}</span>
                </div>
              </div>

              <div className="mb-6">
                {renderCategoryBadges(post.category)}
              </div>

              <div className="prose prose-lg max-w-none">
                {renderContent(post.tekst)}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Slične vesti koje bi vas mogle zanimati
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article, index) => (
                <AnimatedSection key={article.id} delay={index * 0.1}>
                  <Link
                    to={`/news/${article.slug}`}
                    className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.slika}
                        alt={article.naslov}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.naslov}
                      </h4>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(article.datum)}</span>
                      </div>
                      <div className="mb-2">
                        {article.category.slice(0, 2).map((cat, index) => (
                          <span 
                            key={index}
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-1 mb-1 ${
                              cat === 'featured' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-blue-500 text-white'
                            }`}
                          >
                            {cat.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default NewsDetail;