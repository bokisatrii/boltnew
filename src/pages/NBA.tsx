import React from 'react';
import CategoryNewsPage from '../components/news/CategoryNewsPage';

const NBA: React.FC = () => {
  return (
    <CategoryNewsPage
      category="nba"
      title="NBA News"
      description="The latest NBA news, analysis, game recaps, and player updates from around the league."
      keywords="NBA news, NBA analysis, basketball news, NBA game recaps, NBA players, NBA trades"
    />
  );
};

export default NBA;
