import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';

import * as style from './FeatureCard.module.css';

interface Props {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: Props) {
  return (
    <div className={style.wrapper}>
      <TbTruckDelivery />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
