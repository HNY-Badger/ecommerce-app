import React, { KeyboardEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './ProductCard.module.css';

type Props = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currencyCode: string;
  nonDiscountPrice?: number;
};

function formatPrice(price: number, currencyCode: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
}

function ProductCard({ id, name, description, image, price, currencyCode, nonDiscountPrice }: Props) {
  const navigate = useNavigate();

  const clickHandler = () => navigate(`/product/${id}`);
  const keyDownHandler: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') clickHandler();
  };

  return (
    <div className={styles.product_card} onClick={clickHandler} onKeyDown={keyDownHandler} role="button" tabIndex={0}>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.name}>{name}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.prices}>
        {nonDiscountPrice ? (
          <>
            <p className={styles.discounted_price}>{formatPrice(price, currencyCode)}</p>
            <p className={styles.original_price}>{formatPrice(nonDiscountPrice, currencyCode)}</p>
          </>
        ) : (
          <p className={styles.price}>{formatPrice(price, currencyCode)}</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
