import React from 'react';
import * as styles from './Addresses.module.css';
import AddressCard from '../AddressCard/AddressCard';
import { useAppSelector } from '../../../store/hooks/redux';
import { SetEditCallback } from '../../../pages/RegistrationPage/RegistrationPage';

type Props = {
  setEdit: SetEditCallback;
  error?: string;
};

function Addresses({ setEdit, error }: Props) {
  const { addresses, billing, shipping } = useAppSelector((state) => state.addressesReducer);

  return (
    <div className={styles.addresses_wrapper}>
      <p>Addresses</p>
      {error && <p className={styles.addresses_error}>{error}</p>}
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <AddressCard
            key={address.key}
            info={address}
            setEdit={setEdit}
            billing={address === billing}
            shipping={address === shipping}
          />
        ))}
      </div>
    </div>
  );
}

export default Addresses;
