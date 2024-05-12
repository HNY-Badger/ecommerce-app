import React, { MouseEventHandler } from 'react';
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import * as styles from './AddressCard.module.css';
import CheckBox from '../../CheckBox/CheckBox';
import { AddressInfo, regAdressesSlice } from '../../../store/reducers/RegAddressesSlice';
import { useAppDispatch } from '../../../store/hooks/redux';

type Props = {
  info: AddressInfo;
  setEdit: (key: string, billing: boolean, shipping: boolean) => void;
  billing?: boolean;
  shipping?: boolean;
};

function AddressCard({ info, setEdit, billing, shipping }: Props) {
  const dispatch = useAppDispatch();
  const { removeAddress, setDefaultAddress } = regAdressesSlice.actions;

  const editHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setEdit(info.key, billing ?? false, shipping ?? false);
  };
  const removeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeAddress(info.key));
  };
  const setDefaultHandler = (checked: boolean, type: 'billing' | 'shipping') => {
    dispatch(setDefaultAddress({ key: info.key, checked, type }));
  };
  return (
    <div className={styles.address_wrapper}>
      <div className={styles.top_address}>
        <p className={styles.address}>{`${info.street}, ${info.city}, ${info.postalCode}, ${info.country}`}</p>
        <div className={styles.buttons}>
          <button aria-label="edit" type="button" onClick={editHandler}>
            <MdEdit style={{ width: '100%', height: '100%' }} />
          </button>
          <button aria-label="remove" type="button" onClick={removeHandler}>
            <MdRemoveCircle style={{ width: '100%', height: '100%' }} />
          </button>
        </div>
      </div>
      <div className={styles.bottom_address}>
        <CheckBox
          label="Billing"
          id={`billing-${info.key}`}
          checked={billing ?? false}
          onChange={(e) => setDefaultHandler(e.target.checked, 'billing')}
        />
        <CheckBox
          label="Shipping"
          id={`shipping-${info.key}`}
          checked={shipping ?? false}
          onChange={(e) => setDefaultHandler(e.target.checked, 'shipping')}
        />
      </div>
    </div>
  );
}

export default AddressCard;
