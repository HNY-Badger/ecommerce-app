import React from 'react';
import * as styles from './ImageSlider.module.css';

type Props = {
  name: string;
  images: string[];
};

function ImageSlider({ name, images }: Props) {
  return <img className={styles.slider} src={images[0]} alt={name} />;
}

export default ImageSlider;
