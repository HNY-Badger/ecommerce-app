import React, { MouseEventHandler } from 'react';
import * as styles from './ClearBasketModal.module.css';
import Button from '../../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { clearCart } from '../../../store/async/CartThunk';

type Props = {
  onModalClose: () => void;
};

function ClearBasketModal({ onModalClose }: Props) {
  const dispatch = useAppDispatch();
  const { data: cart } = useAppSelector((state) => state.cartReducer);
  const closeHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    onModalClose();
  };

  const clearCartHandler = () => {
    if (cart) {
      const { id, version, lineItems } = cart;
      dispatch(
        clearCart({ id, version, items: lineItems.map((item) => ({ lineItemId: item.id, quantity: item.quantity })) })
      );
    }
    onModalClose();
  };

  return (
    <div role="presentation" onClick={closeHandler} className={styles.modal}>
      <div className={styles.prompt_box}>
        <p className={styles.message}>Do you really want to clear your cart?</p>
        <div className={styles.buttons}>
          <Button onClick={closeHandler} className={styles.button}>
            Cancel
          </Button>
          <Button onClick={clearCartHandler} variant="remove" className={styles.button}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClearBasketModal;
