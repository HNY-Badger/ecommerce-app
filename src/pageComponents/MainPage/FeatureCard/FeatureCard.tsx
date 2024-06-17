import React from 'react';
import { IconType } from 'react-icons';

import * as style from './FeatureCard.module.css';

interface Props {
  icon: IconType;
  title: string;
  description: string;
}

function FeatureCard({ title, description, icon: Icon }: Props) {
  return (
    <div className={style.wrapper}>
      <Icon className={style.icon} />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
