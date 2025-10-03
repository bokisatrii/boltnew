import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  type: 'organization';
}

interface PodcastSchemaProps {
  type: 'podcast';
  episodeName?: string;
  episodeDescription?: string;
  episodeUrl?: string;
}

interface ArticleSchemaProps {
  type: 'article';
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  type: 'breadcrumb';
  items: Array<{
    name: string;
    url: string;
  }>;
}

type StructuredDataProps =
  | OrganizationSchemaProps
  | PodcastSchemaProps
  | ArticleSchemaProps
  | BreadcrumbSchemaProps;

const StructuredData: React.FC<StructuredDataProps> = (props) => {
  let schemaData: any = {};

  switch (props.type) {
    case 'organization':
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Trojka iz ćoška",
        "description": "Košarkaški podcast i fantasy liga sa analizama NBA, Evrolige i regionalne košarke",
        "url": "https://trojkaizcoska.com",
        "logo": "https://trojkaizcoska.com/favicon.png",
        "sameAs": [
          "https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ",
          "https://podcast.rs/show/trojka-iz-c"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "email": "contact@trojkaizcoska.com"
        }
      };
      break;

    case 'podcast':
      schemaData = {
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        "name": "Trojka iz ćoška",
        "description": "Košarkaški podcast BasketLiga sajta sa diskusijama o NBA, Evroligi i fantasy košarci",
        "url": "https://trojkaizcoska.com/podcast",
        "image": "https://trojkaizcoska.com/favicon.png",
        "author": {
          "@type": "Organization",
          "name": "Trojka iz ćoška"
        },
        "genre": ["Sports", "Basketball", "NBA"],
        "inLanguage": "sr",
        "webFeed": "https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
      };

      if (props.episodeName) {
        schemaData = {
          ...schemaData,
          "@type": "PodcastEpisode",
          "name": props.episodeName,
          "description": props.episodeDescription,
          "url": props.episodeUrl,
          "partOfSeries": {
            "@type": "PodcastSeries",
            "name": "Trojka iz ćoška",
            "url": "https://trojkaizcoska.com/podcast"
          }
        };
      }
      break;

    case 'article':
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": props.title,
        "description": props.description,
        "image": props.image,
        "datePublished": props.datePublished,
        "dateModified": props.dateModified || props.datePublished,
        "author": {
          "@type": "Person",
          "name": props.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Trojka iz ćoška",
          "logo": {
            "@type": "ImageObject",
            "url": "https://trojkaizcoska.com/favicon.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": props.url
        }
      };
      break;

    case 'breadcrumb':
      schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": props.items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      break;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
