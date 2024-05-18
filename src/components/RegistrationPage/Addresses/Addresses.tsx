import React from 'react';
import * as styles from './Addresses.module.css';
import AddressCard from '../AddressCard/AddressCard';
import { AddressData } from '../../../types/customer';

type Props = {
  setEditMode: (index: number) => void;
  removeAddress: (key: string) => void;
  setDefaultAddress: (
    index: number,
    checked: boolean,
    type: 'defaultBillingAddress' | 'defaultShippingAddress'
  ) => void;
  setAddressType: (index: number, checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => void;
  addresses: AddressData[];
  billing: number[];
  shipping: number[];
  defaultBilling?: number;
  defaultShipping?: number;
  error?: string;
};

function Addresses({
  setEditMode,
  removeAddress,
  setDefaultAddress,
  setAddressType,
  addresses,
  billing,
  shipping,
  defaultBilling,
  defaultShipping,
  error,
}: Props) {
  return (
    <div className={styles.addresses_wrapper}>
      <p>Addresses</p>
      {error && <p className={styles.addresses_error}>{error}</p>}
      <div className={styles.addresses}>
        {addresses.map((address, index) => (
          <AddressCard
            key={address.key}
            addressData={address}
            setEditMode={() => setEditMode(index)}
            removeAddress={() => removeAddress(address.key)}
            setDefaultAddress={(checked, type) => setDefaultAddress(index, checked, type)}
            setAddressType={(checked, type) => setAddressType(index, checked, type)}
            billing={billing.includes(index)}
            shipping={shipping.includes(index)}
            defaultBilling={index === defaultBilling}
            defaultShipping={index === defaultShipping}
          />
        ))}
      </div>
    </div>
  );
}

export default Addresses;
