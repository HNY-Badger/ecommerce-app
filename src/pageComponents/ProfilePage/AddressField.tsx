import React from 'react';
import * as styles from './AddressField.module.css';

type AddressInfo = {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  isShipping: boolean;
  isBilling: boolean;
  isShippingDefault: boolean;
  isBillingDefault: boolean;
};

type Props = {
  address: AddressInfo;
};

function AddressField({ address }: Props) {
  const { streetName, city, country, postalCode, isBilling, isShipping, isShippingDefault, isBillingDefault } = address;

  return (
    <div className={styles.wrapper}>
      <div className={styles.address}>{`${streetName}, ${city}, ${country}, ${postalCode}`}</div>
      <div className={styles.badges}>
        {isShipping && <span className={styles.badge}>Shipping</span>}
        {isBilling && <span className={styles.badge}>Billing</span>}
        {isShippingDefault && <span className={`${styles.badge} ${styles.badge_default}`}>Default&nbsp;Shipping</span>}
        {isBillingDefault && <span className={`${styles.badge} ${styles.badge_default}`}>Default&nbsp;Billing</span>}
      </div>
    </div>
  );
}

export default AddressField;
