import React, { MouseEventHandler } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as styles from './ImageSlider.module.css';

type Props = {
  index: number;
  onIndexChange: (i: number) => void;
  name: string;
  images: string[];
  onImageClick: () => void;
};

function ImageSlider({ index, onIndexChange, name, images, onImageClick }: Props) {
  const prevHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onIndexChange(index - 1 < 0 ? images.length - 1 : index - 1);
  };
  const nextHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onIndexChange((index + 1) % images.length);
  };
  const pageHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
    e.stopPropagation();
    onIndexChange(i);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.images} style={{ transform: `translateX(${index * -100}%)` }}>
        {images.map((image) => (
          <img role="presentation" className={styles.image} key={image} src={image} alt={name} onClick={onImageClick} />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={prevHandler} className={styles.prev} aria-label="Previous image">
            <FaArrowLeft />
            <div className={styles.left_gradient} />
          </button>
          <button type="button" onClick={nextHandler} className={styles.next} aria-label="Next image">
            <FaArrowRight />
            <div className={styles.right_gradient} />
          </button>
          <div className={styles.pages}>
            {images.map((img, i) => (
              <button
                type="button"
                key={img}
                onClick={(e) => pageHandler(e, i)}
                className={`${styles.page} ${index === i ? styles.active_page : ''}`}
                aria-label={`Image number ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
