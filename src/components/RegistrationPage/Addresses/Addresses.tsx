import React from 'react';
import * as styles from './Addresses.module.css';
import AddressCard from '../AddressCard/AddressCard';
import { AddressData } from '../../../types/user';

type Props = {
  setEditMode: (key: string) => void;
  removeAddress: (key: string) => void;
  setDefaultAddress: (key: string, checked: boolean, type: 'defaultBillingAddress' | 'defaultShippingAddress') => void;
  addresses: AddressData[];
  billing: number;
  shipping: number;
  error?: string;
};

function Addresses({ setEditMode, removeAddress, setDefaultAddress, addresses, billing, shipping, error }: Props) {
  return (
    <div className={styles.addresses_wrapper}>
      <p>Addresses</p>
      {error && <p className={styles.addresses_error}>{error}</p>}
      <div className={styles.addresses}>
        {addresses.map((address, index) => (
          <AddressCard
            key={address.key}
            addressData={address}
            setEditMode={setEditMode}
            removeAddress={() => removeAddress(address.key)}
            setDefaultAddress={(checked: boolean, type: 'defaultBillingAddress' | 'defaultShippingAddress') =>
              setDefaultAddress(address.key, checked, type)
            }
            billing={index === billing}
            shipping={index === shipping}
          />
        ))}
      </div>
    </div>
  );
}

export default Addresses;
