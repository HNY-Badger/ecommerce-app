import React from 'react';
import ShopDescription from '../../pageComponents/MainPage/ShopDescription/ShopDescription';
import ActivePages from '../../pageComponents/MainPage/ActivePages/ActivePages';
import ShopFeatures from '../../pageComponents/MainPage/ShopFeatures/ShopFeatures';

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
