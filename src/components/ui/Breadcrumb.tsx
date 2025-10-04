import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from '../StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const allItems = [
    { name: 'Početna', url: 'https://trojkaizcoska.com/' },
    ...items.map(item => ({
      ...item,
      url: item.url.startsWith('http') ? item.url : `https://trojkaizcoska.com${item.url}`
    }))
  ];

  return (
    <>
      <StructuredData type="breadcrumb" items={allItems} />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center hover:text-blue-600 transition-colors"
              aria-label="Početna strana"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span className="text-blue-600 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
