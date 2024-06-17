import React from 'react';
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import * as styles from './AddressCard.module.css';
import CheckBox from '../../CheckBox/CheckBox';
import { AddressData } from '../../../types/customer';

type Props = {
  addressData: AddressData;
  setEditMode: () => void;
  removeAddress: () => void;
  setDefaultAddress: (checked: boolean, type: 'defaultBillingAddress' | 'defaultShippingAddress') => void;
  setAddressType: (checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => void;
  billing: boolean;
  shipping: boolean;
  defaultBilling: boolean;
  defaultShipping: boolean;
};

function AddressCard({
  addressData,
  setEditMode,
  removeAddress,
  setDefaultAddress,
  setAddressType,
  billing,
  shipping,
  defaultBilling,
  defaultShipping,
}: Props) {
  return (
    <div className={styles.address_wrapper}>
      <div className={styles.address}>
        <p
          className={styles.address_text}
        >{`${addressData.streetName}, ${addressData.city}, ${addressData.postalCode}, ${addressData.country}`}</p>
        <div className={styles.buttons}>
          <button aria-label="edit" type="button" onClick={setEditMode}>
            <MdEdit style={{ width: '100%', height: '100%' }} />
          </button>
          <button aria-label="remove" type="button" onClick={removeAddress}>
            <MdRemoveCircle style={{ width: '100%', height: '100%' }} />
          </button>
        </div>
      </div>
      <div className={styles.checkboxes}>
        <CheckBox
          label="Billing"
          id={`billing-${addressData.key}`}
          checked={billing}
          onChange={(e) => setAddressType(e.target.checked, 'billingAddresses')}
        />
        {billing && (
          <CheckBox
            label="Default billing"
            id={`defaultBilling-${addressData.key}`}
            checked={defaultBilling}
            onChange={(e) => setDefaultAddress(e.target.checked, 'defaultBillingAddress')}
          />
        )}
      </div>
      <div className={styles.checkboxes}>
        <CheckBox
          label="Shipping"
          id={`shipping-${addressData.key}`}
          checked={shipping ?? false}
          onChange={(e) => setAddressType(e.target.checked, 'shippingAddresses')}
        />
        {shipping && (
          <CheckBox
            label="Default shipping"
            id={`defaultShipping-${addressData.key}`}
            checked={defaultShipping}
            onChange={(e) => setDefaultAddress(e.target.checked, 'defaultShippingAddress')}
          />
        )}
      </div>
    </div>
  );
}

export default AddressCard;
