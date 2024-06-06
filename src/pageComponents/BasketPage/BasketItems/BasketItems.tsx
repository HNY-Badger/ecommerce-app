import React from 'react';
import * as styles from './BasketItems.module.css';
import { LineItem } from '../../../types/cart';
import BasketItem from '../BasketItem/BasketItem';

type Props = {
  items?: LineItem[];
};

function BasketItems({ items }: Props) {
  return <div className={styles.items}>{items && items.map((item) => <BasketItem key={item.id} item={item} />)}</div>;
}

export default BasketItems;
