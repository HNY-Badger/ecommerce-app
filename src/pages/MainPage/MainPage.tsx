import React from 'react';
import ShopDescription from '../../pageComponents/MainPage/ShopDescription/ShopDescription';
import ActivePages from '../../pageComponents/MainPage/ActivePages/ActivePages';
import ShopFeatures from '../../pageComponents/MainPage/ShopFeatures/ShopFeatures';
import Promocodes from '../../pageComponents/MainPage/Promocodes/Promocodes';

function MainPage() {
  return (
    <main>
      <ShopDescription />
      <ActivePages />
      <ShopFeatures />
      <Promocodes />
    </main>
  );
}

export default MainPage;
