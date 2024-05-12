import React from 'react';
import * as styles from './Addresses.module.css';
import AddressCard from '../AddressCard/AddressCard';
import { useAppSelector } from '../../../store/hooks/redux';

type Props = {
  setEditMode: (key: string) => void;
  error?: string;
};

function Addresses({ setEditMode, error }: Props) {
  const { addresses, billing, shipping } = useAppSelector((state) => state.addressesReducer);

  return (
    <div className={styles.addresses_wrapper}>
      <p>Addresses</p>
      {error && <p className={styles.addresses_error}>{error}</p>}
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <AddressCard
            key={address.key}
            addressData={address}
            setEditMode={setEditMode}
            billing={address === billing}
            shipping={address === shipping}
          />
        ))}
      </div>
    </div>
  );
}

export default Addresses;
