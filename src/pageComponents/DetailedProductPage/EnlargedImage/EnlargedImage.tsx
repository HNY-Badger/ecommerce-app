import React, { KeyboardEventHandler } from 'react';
import { IoClose } from 'react-icons/io5';
import * as styles from './EnlargedImage.module.css';
import ImageSlider from '../ImageSlider/ImageSlider';

type Props = {
  index: number;
  onIndexChange: (i: number) => void;
  name: string;
  images: string[];
  onBackdropClick: () => void;
};

function EnlargedImage({ index, onIndexChange, name, images, onBackdropClick }: Props) {
  const keyDownHandler: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') onBackdropClick();
  };

  return (
    <div onClick={onBackdropClick} onKeyDown={keyDownHandler} role="button" tabIndex={0} className={styles.enlarged}>
      <button aria-label="Close" type="button" className={styles.close_btn} onClick={onBackdropClick}>
        <IoClose />
      </button>
      <ImageSlider
        index={index}
        onIndexChange={onIndexChange}
        name={name}
        images={images}
        onImageClick={onBackdropClick}
      />
    </div>
  );
}

export default EnlargedImage;
