import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Trojka iz ćoška - Košarkaški podcast i fantasy liga',
  description = 'Trojka iz ćoška - Košarkaški podcast sa analizama NBA, Evrolige i fantasy košarke. Slušajte najnovije epizode i pratite fantasy ligu.',
  keywords = 'košarka, fantasy košarka, NBA, Evroliga, košarkaški podcast, trojka iz ćoška, fantasy liga, srbija košarka, basketball podcast',
  image = 'https://trojkaizcoska.com/favicon.png',
  url = 'https://trojkaizcoska.com',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
}) => {
  const fullTitle = title.includes('Trojka iz ćoška') ? title : `${title} | Trojka iz ćoška`;
  const fullUrl = url.startsWith('http') ? url : `https://trojkaizcoska.com${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}
      <meta name="language" content="Serbian" />
      <meta name="author" content={author || 'Trojka iz ćoška Tim'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Trojka iz ćoška" />
      <meta property="og:locale" content="sr_RS" />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@trojkaizcoska" />

      {/* Additional Meta Tags for better SEO */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEO;
