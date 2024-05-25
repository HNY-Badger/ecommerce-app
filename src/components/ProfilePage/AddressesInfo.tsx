import React from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import AddressField from './AddressField';
import ProfileSection from './ProfileSection';

function AddressesInfo() {
  const { customer } = useAppSelector((state) => state.customerReducer);

  const addresses = customer?.addresses.map((address) => ({
    ...address,
    isShipping: customer.shippingAddressIds.includes(address.id),
    isBilling: customer.billingAddressIds.includes(address.id),
    isShippingDefault: customer.defaultShippingAddressId === address.id,
    isBillingDefault: customer.defaultBillingAddressId === address.id,
  }));

  return (
    addresses && (
      <ProfileSection heading="Addresses" buttonCaption="Edit Adresses">
        {addresses.map((address) => (
          <AddressField key={address.id} address={address} />
        ))}
      </ProfileSection>
    )
  );
}

export default AddressesInfo;
