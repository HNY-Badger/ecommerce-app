import React from 'react';
import * as styles from './Addresses.module.css';
import AddressCard from '../AddressCard/AddressCard';
import { AddressData } from '../../../types/customer';

type Props = {
  setEditMode: (key: string) => void;
  removeAddress: (key: string) => void;
  setDefaultAddress: (key: string, checked: boolean, type: 'defaultBillingAddress' | 'defaultShippingAddress') => void;
  setAddressType: (key: string, checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => void;
  addresses: AddressData[];
  billing: string[];
  shipping: string[];
  defaultBilling?: string;
  defaultShipping?: string;
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
        {addresses.map((address) => (
          <AddressCard
            key={address.key}
            addressData={address}
            setEditMode={() => setEditMode(address.key)}
            removeAddress={() => removeAddress(address.key)}
            setDefaultAddress={(checked, type) => setDefaultAddress(address.key, checked, type)}
            setAddressType={(checked, type) => setAddressType(address.key, checked, type)}
            billing={billing.includes(address.key)}
            shipping={shipping.includes(address.key)}
            defaultBilling={address.key === defaultBilling}
            defaultShipping={address.key === defaultShipping}
          />
        ))}
      </div>
    </div>
  );
}

export default Addresses;
