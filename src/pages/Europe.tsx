import React from 'react';
import CategoryNewsPage from '../components/news/CategoryNewsPage';

const Europe: React.FC = () => {
  return (
    <CategoryNewsPage
      category="europe"
      title="European Basketball"
      description="EuroLeague, national leagues, and European basketball coverage including game recaps and player spotlights."
      keywords="EuroLeague, European basketball, basketball Europe, EuroLeague news, European players"
    />
  );
};

export default Europe;
