import React, { MouseEventHandler } from 'react';
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import * as styles from './AddressCard.module.css';
import CheckBox from '../../CheckBox/CheckBox';
import { removeAddress, setDefaultAddress } from '../../../store/reducers/RegAddressesSlice';
import { useAppDispatch } from '../../../store/hooks/redux';
import { AddressData } from '../../../types/user';

type Props = {
  addressData: AddressData;
  setEditMode: (key: string) => void;
  billing?: boolean;
  shipping?: boolean;
};

function AddressCard({ addressData, setEditMode, billing, shipping }: Props) {
  const dispatch = useAppDispatch();

  const editHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setEditMode(addressData.key);
  };
  const removeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeAddress(addressData.key));
  };
  const setDefaultHandler = (checked: boolean, type: 'billing' | 'shipping') => {
    dispatch(setDefaultAddress({ key: addressData.key, checked, type }));
  };
  return (
    <div className={styles.address_wrapper}>
      <div className={styles.top_address}>
        <p className={styles.address}>{`${addressData.street}, ${addressData.city}, ${addressData.postalCode}, ${addressData.country}`}</p>
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
          id={`billing-${addressData.key}`}
          checked={billing ?? false}
          onChange={(e) => setDefaultHandler(e.target.checked, 'billing')}
        />
        <CheckBox
          label="Shipping"
          id={`shipping-${addressData.key}`}
          checked={shipping ?? false}
          onChange={(e) => setDefaultHandler(e.target.checked, 'shipping')}
        />
      </div>
    </div>
  );
}

export default AddressCard;
