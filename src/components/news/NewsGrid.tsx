import React from 'react';
import { Link } from "react-router-dom";
import AnimatedSection from "../ui/AnimatedSection";
import { BlogPost } from "../../types/blog";

interface NewsGridProps {
  articles: BlogPost[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("sr-RS", options);
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Trenutno nema vesti za prikaz.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <AnimatedSection key={article.id} delay={index * 0.1}>
          <article className="card h-full flex flex-col group">
            <div className="relative h-52 overflow-hidden">
              <img
                src={article.slika}
                alt={article.naslov}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {article.category === 'featured' && (
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Istaknuto
                  </span>
                </div>
              )}
              {article.category && article.category !== 'featured' && (
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                    {article.category.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <span>{formatDate(article.datum)}</span>
                {article.autor && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{article.autor}</span>
                  </>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {article.naslov}
              </h3>
              <p className="text-gray-600 mb-4 flex-1">
                {article.tekst?.slice(0, 150)}...
              </p>
              {article.slug && (
                <Link
                  to={`/news/${article.slug}`}
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center mt-auto"
                >
                  Pročitaj više
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </article>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default NewsGrid;