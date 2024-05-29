import React from 'react';
import AddressField from './AddressField';
import ProfileSection from './ProfileSection';
import { Customer } from '../../types/customer';

type Props = {
  customer: Customer;
};

function AddressesInfo({ customer }: Props) {
  const addresses = customer.addresses.map((address) => ({
    ...address,
    isShipping: customer.shippingAddressIds.includes(address.id),
    isBilling: customer.billingAddressIds.includes(address.id),
    isShippingDefault: customer.defaultShippingAddressId === address.id,
    isBillingDefault: customer.defaultBillingAddressId === address.id,
  }));

  return (
    <ProfileSection heading="Addresses" buttonCaption="Edit Adresses">
      {addresses.map((address) => (
        <AddressField key={address.id} address={address} />
      ))}
    </ProfileSection>
  );
}

export default AddressesInfo;
