import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import * as styles from './PromocodesInput.module.css';
import Button from '../../../components/Button/Button';
import FormInput from '../../../components/FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { updateCart } from '../../../store/async/CartThunk';

function PromocodesInput() {
  const dispatch = useAppDispatch();
  const { data: cart, error: cartError } = useAppSelector((state) => state.cartReducer);

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (cartError.includes('discount code')) {
      setError(cartError);
    }
  }, [cartError]);

  const promoHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setCode(value);
    if (value.length === 0) {
      setError('Add at least one symbol');
    } else {
      setError('');
    }
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (code.length === 0) {
      setError('Add at least one symbol');
      return;
    }
    if (error.length === 0 && cart !== null) {
      dispatch(updateCart.addDiscountCode({ id: cart.id, version: cart.version, actionBody: { code } }));
      setCode('');
    }
  };

  return (
    <form className={styles.apply} onSubmit={submitHandler}>
      <FormInput value={code} onChange={promoHandler} id="promo" label="Promocode" error={error} />
      <Button type="submit">Apply</Button>
    </form>
  );
}

export default PromocodesInput;
