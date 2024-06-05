import React from 'react';
import { MdRemoveCircle } from 'react-icons/md';
import { LineItem } from '../../../types/cart';
import * as styles from './BasketItem.module.css';
import formatPrice from '../../../utils/formatPrice';
import Counter from '../../../components/Counter/Counter';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { updateCart } from '../../../store/async/CartThunk';

type Props = {
  item: LineItem;
};

function BasketItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { data: cart } = useAppSelector((state) => state.cartReducer);

  const quantityHandler = (quantity: number) => {
    if (cart !== null) {
      const { id, version } = cart;
      if (quantity <= 0) {
        dispatch(
          updateCart.removeLineItem({ id, version, actionBody: { lineItemId: item.id, quantity: item.quantity } })
        );
      } else {
        dispatch(
          updateCart.changeLineItemQuantity({
            id,
            version,
            actionBody: { lineItemId: item.id, quantity },
          })
        );
      }
    }
  };

  const removeButtonClickHandler = () => {
    if (cart !== null) {
      dispatch(
        updateCart.removeLineItem({
          id: cart.id,
          version: cart.version,
          actionBody: { lineItemId: item.id, quantity: item.quantity },
        })
      );
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.card}>
        <img src={item.variant.images[0].url} alt={item.name['en-US']} className={styles.card_image} />
        <div className={styles.card_info}>
          <p>{item.name['en-US']}</p>
          <div className={styles.prices}>
            {item.price.discounted ? (
              <>
                <p className={styles.discounted_price}>
                  {formatPrice(item.price.discounted.value.centAmount / 100, item.price.discounted.value.currencyCode)}
                </p>
                <p className={styles.original_price}>
                  {formatPrice(item.price.value.centAmount / 100, item.price.value.currencyCode)}
                </p>
              </>
            ) : (
              <p className={styles.price}>
                {formatPrice(item.price.value.centAmount / 100, item.price.value.currencyCode)}
              </p>
            )}
          </div>
          <Counter value={item.quantity} onChange={quantityHandler} className={styles.counter} />
          <p className={styles.total}>{formatPrice(item.totalPrice.centAmount / 100, item.totalPrice.currencyCode)}</p>
        </div>
      </div>
      <button aria-label="Remove" type="button" onClick={removeButtonClickHandler} className={styles.remove}>
        <MdRemoveCircle />
      </button>
    </div>
  );
}

export default BasketItem;
