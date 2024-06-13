import React, { useState } from 'react';
import * as styles from './BasketPage.module.css';
import { useAppSelector } from '../../store/hooks/redux';
import BasketItems from '../../pageComponents/BasketPage/BasketItems/BasketItems';
import Subtotal from '../../pageComponents/BasketPage/Subtotal/Subtotal';
import formatPrice from '../../utils/formatPrice';
import Button from '../../components/Button/Button';
import EmptyBasketPage from './EmptyBasketPage';
import BasketPromocodes from '../../pageComponents/BasketPage/BasketPromocodes/BasketPromocodes';
import Spinner from '../../components/Spinner/Spinner';
import ClearBasketModal from '../../pageComponents/BasketPage/ClearBasketModal/ClearBasketModal';

function BasketPage() {
  const { data: cart, loading } = useAppSelector((state) => state.cartReducer);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.basket}>
      {modalIsOpen && <ClearBasketModal onModalClose={() => setModalIsOpen(false)} />}
      {loading && cart === null && (
        <div className={styles.loading}>
          <Spinner width="200px" />
        </div>
      )}
      {cart !== null && cart.lineItems.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.headbar}>
            <p className={styles.cart_text}>Your shopping cart</p>
            <Button className={styles.remove_btn} variant="remove" onClick={() => setModalIsOpen(true)}>
              Clear&nbsp;cart
            </Button>
          </div>
          <BasketItems items={cart?.lineItems} />
          <BasketPromocodes />
          {cart.discountOnTotalPrice ? (
            <Subtotal
              className={styles.subtotal}
              price={formatPrice(cart.totalPrice.centAmount / 100, cart.totalPrice.currencyCode)}
              nonDiscountPrice={
                cart.discountOnTotalPrice &&
                formatPrice(
                  (cart.discountOnTotalPrice.discountedAmount.centAmount + cart.totalPrice.centAmount) / 100,
                  cart.totalPrice.currencyCode
                )
              }
            />
          ) : (
            <Subtotal
              className={styles.subtotal}
              price={formatPrice(cart.totalPrice.centAmount / 100, cart.totalPrice.currencyCode)}
            />
          )}
        </div>
      ) : (
        !loading && <EmptyBasketPage />
      )}
    </div>
  );
}

export default BasketPage;
