import React, { useEffect } from 'react';
import PromocodesInput from '../PromocodesInput/PromocodesInput';
import * as styles from './BasketPromocodes.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import PromocodeItem from '../PromocodeItem/PromocodeItem';
import fetchActivePromocodes from '../../../store/async/PromocodesThunk';
import { Promocode } from '../../../types/promocode';
import Spinner from '../../../components/Spinner/Spinner';

function findCode(id: string, codes: Promocode[]): string {
  return codes.find((code) => code.id === id)?.code ?? 'UNKNOWN';
}

function BasketPromocodes() {
  const dispatch = useAppDispatch();
  const { data: codes, loading: codesLoading, error: codesError } = useAppSelector((state) => state.promocodesReducer);
  const { data: cart } = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    if (codes === null) {
      dispatch(fetchActivePromocodes());
    }
  }, []);

  return (
    <div className={styles.promocodes}>
      {codesLoading && (
        <div className={styles.loading}>
          <Spinner width="50px" />
        </div>
      )}
      {!codesLoading && codesError.length > 0 ? (
        <p>{codesError}</p>
      ) : (
        <div className={styles.promocodes_list}>
          {cart &&
            codes &&
            cart.discountCodes.map((code) => (
              <PromocodeItem
                key={code.discountCode.id}
                id={code.discountCode.id}
                code={findCode(code.discountCode.id, codes)}
              />
            ))}
        </div>
      )}
      <PromocodesInput />
    </div>
  );
}

export default BasketPromocodes;
