import React from 'react';
import ShopDescription from '../../pageComponents/MainPage/ShopDescription/ShopDescription';
import ShopFeatures from '../../pageComponents/MainPage/ShopFeatures/ShopFeatures';
import ActivePages from '../../pageComponents/MainPage/ActivePages/ActivePages';

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
