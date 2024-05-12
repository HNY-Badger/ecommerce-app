import React from 'react';
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import * as styles from './AddressCard.module.css';
import CheckBox from '../../CheckBox/CheckBox';
import { AddressData } from '../../../types/user';

type Props = {
  addressData: AddressData;
  setEditMode: (key: string) => void;
  removeAddress: () => void;
  setDefaultAddress: (checked: boolean, type: 'defaultBillingAddress' | 'defaultShippingAddress') => void;
  billing: boolean;
  shipping: boolean;
};

function AddressCard({ addressData, setEditMode, removeAddress, setDefaultAddress, billing, shipping }: Props) {
  return (
    <div className={styles.address_wrapper}>
      <div className={styles.top_address}>
        <p
          className={styles.address}
        >{`${addressData.streetName}, ${addressData.city}, ${addressData.postalCode}, ${addressData.country}`}</p>
        <div className={styles.buttons}>
          <button aria-label="edit" type="button" onClick={() => setEditMode(addressData.key)}>
            <MdEdit style={{ width: '100%', height: '100%' }} />
          </button>
          <button aria-label="remove" type="button" onClick={removeAddress}>
            <MdRemoveCircle style={{ width: '100%', height: '100%' }} />
          </button>
        </div>
      </div>
      <div className={styles.bottom_address}>
        <CheckBox
          label="Billing"
          id={`billing-${addressData.key}`}
          checked={billing ?? false}
          onChange={(e) => setDefaultAddress(e.target.checked, 'defaultBillingAddress')}
        />
        <CheckBox
          label="Shipping"
          id={`shipping-${addressData.key}`}
          checked={shipping ?? false}
          onChange={(e) => setDefaultAddress(e.target.checked, 'defaultShippingAddress')}
        />
      </div>
    </div>
  );
}

export default AddressCard;
