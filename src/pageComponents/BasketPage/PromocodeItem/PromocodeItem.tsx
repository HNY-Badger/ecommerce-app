import React from 'react';
import { MdRemoveCircle } from 'react-icons/md';
import * as styles from './PromocodeItem.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { updateCart } from '../../../store/async/CartThunk';

type Props = {
  id: string;
  code: string;
};

function PromocodeItem({ id, code }: Props) {
  const dispatch = useAppDispatch();
  const { data: cart } = useAppSelector((state) => state.cartReducer);

  const removeClickHandler = () => {
    if (cart !== null) {
      dispatch(
        updateCart.removeDiscountCode({
          id: cart.id,
          version: cart.version,
          actionBody: { discountCode: { id, typeId: 'discount-code' } },
        })
      );
    }
  };

  return (
    <div className={styles.promocode}>
      <p className={styles.code}>{code}</p>
      <button type="button" aria-label="Remove" onClick={removeClickHandler} className={styles.remove_btn}>
        <MdRemoveCircle />
      </button>
    </div>
  );
}

export default PromocodeItem;
