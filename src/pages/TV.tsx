import React from 'react';
import CategoryNewsPage from '../components/news/CategoryNewsPage';

const TV: React.FC = () => {
  return (
    <CategoryNewsPage
      category="tv"
      title="TV & Media"
      description="Basketball media coverage, broadcast schedules, and TV-related basketball content."
      keywords="basketball TV, basketball broadcast, NBA TV, basketball media, basketball shows"
    />
  );
};

export default TV;
