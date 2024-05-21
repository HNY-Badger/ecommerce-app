import React from 'react';
import ShopDescription from '../../components/MainPage/ShopDescription/ShopDescription';
import ShopFeatures from '../../components/MainPage/ShopFeatures/ShopFeatures';
import ActivePages from '../../components/MainPage/ActivePages/ActivePages';

function MainPage() {
  return (
    <main>
      <ShopDescription />
      <ActivePages />
      <ShopFeatures />
    </main>
  );
}

export default MainPage;
