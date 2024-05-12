import React from 'react';
import { BsTruck } from 'react-icons/bs';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { GoCreditCard } from 'react-icons/go';
import { AiOutlineLaptop } from 'react-icons/ai';

import FeatureCard from '../FeatureCard/FeatureCard';
import * as style from './ShopFeatures.module.css';

const data = [
  {
    icon: BsTruck,
    title: 'Delivery with care for you',
    description: 'We will deliver at any time convenient for you',
  },
  {
    icon: AiOutlineLaptop,
    title: 'The finest brands and products',
    description: 'Exclusively top-tier products sourced from globally acclaimed manufacturers',
  },
  {
    icon: GoCreditCard,
    title: 'Unbeatable prices',
    description: 'With our flexible discount system, you won’t find better prices anywhere else',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Service and warranties',
    description: 'Our experts are always ready to assist and resolve any issues',
  },
];

function ShopFeatures() {
  return (
    <div className={style.wrapper}>
      <h3>What sets our store apart</h3>
      <div className={style.cards}>
        {data.map(({ icon, title, description }) => (
          <FeatureCard icon={icon} title={title} description={description} key={title} />
        ))}
      </div>
    </div>
  );
}

export default ShopFeatures;
