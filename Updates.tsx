import React from 'react';
import CategoryNewsPage from '../../components/news/CategoryNewsPage';

const FantasyUpdates: React.FC = () => {
  return (
    <CategoryNewsPage
      category="fantasy"
      title="Fantasy Basketball Updates"
      description="The latest fantasy basketball news, waiver wire picks, trade advice, and strategy tips to help you win your league."
      keywords="fantasy basketball, fantasy basketball news, waiver wire, fantasy trades, fantasy basketball strategy"
    />
  );
};

export default FantasyUpdates;
