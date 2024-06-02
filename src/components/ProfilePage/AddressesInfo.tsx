import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../store/hooks/redux';
import { Customer, CountryType } from '../../types/customer';
import { AddressActions, UpdateAddress } from '../../types/update';
import { APIErrorResponse } from '../../types/api';
import AddressField from './AddressField';
import Addresses from '../RegistrationPage/Addresses/Addresses';
import AddressModal from '../RegistrationPage/AddressModal/AddressModal';
import ProfileSection from './ProfileSection';
import ProfileEditSection from './ProfileEditSection';
import Button from '../Button/Button';
import UpdateAPI from '../../api/update';
import { setCustomer } from '../../store/reducers/CustomerSlice';
import { notify } from '../../store/reducers/NotificationSlice';

type AddressData = {
  id?: string;
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryType;
};

type SpecialAddresses = {
  billingAddresses: string[];
  shippingAddresses: string[];
};

type DefaultAddresses = {
  defaultBillingAddress?: string;
  defaultShippingAddress?: string;
};

type Props = {
  customer: Customer;
};

function AddressesInfo({ customer }: Props) {
  const dispatch = useAppDispatch();

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const initialAddresses = customer.addresses.map((address) => ({ ...address }));
  const initialBillingAddresses = customer.addresses
    .filter((address) => customer.billingAddressIds.includes(address.id))
    .map((address) => address.key);
  const initialShippingAddresses = customer.addresses
    .filter((address) => customer.shippingAddressIds.includes(address.id))
    .map((address) => address.key);
  const initialBillingDefault = customer.addresses.find(
    (address) => customer.defaultBillingAddressId === address.id
  )?.key;
  const initialShippingDefault = customer.addresses.find(
    (address) => customer.defaultShippingAddressId === address.id
  )?.key;

  const [addresses, setAddresses] = useState<AddressData[]>(initialAddresses);
  const [editAddress, setEditAddress] = useState<AddressData | null>(null);
  const [specialAddresses, setSpecialAddresses] = useState<SpecialAddresses>({
    billingAddresses: initialBillingAddresses,
    shippingAddresses: initialShippingAddresses,
  });
  const [defaultAddresses, setDefaultAddresses] = useState<DefaultAddresses>({
    defaultBillingAddress: initialBillingDefault,
    defaultShippingAddress: initialShippingDefault,
  });

  const addressesProfile = customer.addresses.map((address) => ({
    ...address,
    isShipping: customer.shippingAddressIds.includes(address.id),
    isBilling: customer.billingAddressIds.includes(address.id),
    isShippingDefault: customer.defaultShippingAddressId === address.id,
    isBillingDefault: customer.defaultBillingAddressId === address.id,
  }));

  const setEditModeHandler = (key: string): void => {
    const addr = addresses.find((address) => address.key === key);
    if (addr) {
      setModal(true);
      setEditAddress(addr);
    }
  };

  const setDefaultAddress = (
    key: string,
    checked: boolean,
    type: 'defaultBillingAddress' | 'defaultShippingAddress'
  ) => {
    setDefaultAddresses((prev) => {
      const defaults = { ...prev };
      if (checked) {
        defaults[type] = key;
      } else {
        defaults[type] = defaults[type] === key ? undefined : defaults[type];
      }
      return defaults;
    });
    setError('');
  };

  const setAddressType = (key: string, checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => {
    setSpecialAddresses((prev) => {
      const specials = { ...prev };
      if (checked) {
        specials[type] = [...specials[type], key];
      } else {
        specials[type] = specials[type].filter((k) => key !== k);
        const defaultType = type === 'billingAddresses' ? 'defaultBillingAddress' : 'defaultShippingAddress';
        setDefaultAddress(key, false, defaultType);
      }
      return specials;
    });
    setError('');
  };

  const removeAddress = (key: string) => {
    setAddressType(key, false, 'billingAddresses');
    setAddressType(key, false, 'shippingAddresses');
    setAddresses((prev) => prev.filter((address) => address.key !== key));
    setError('');
  };

  const addAddress = (data: AddressData) => {
    // If there is identical address, we don't add new one
    if (
      addresses.some(
        (address) =>
          address.city === data.city &&
          address.country === data.country &&
          address.postalCode === data.postalCode &&
          address.streetName === data.streetName
      )
    ) {
      return;
    }
    setAddresses((prev) => {
      const newAddresses = [...prev];
      const newAddress = newAddresses.find((address) => address.key === data.key);
      if (newAddress) {
        newAddress.streetName = data.streetName;
        newAddress.city = data.city;
        newAddress.postalCode = data.postalCode;
        newAddress.country = data.country;
      } else {
        newAddresses.push(data);
      }
      return newAddresses;
    });
    setError('');
  };

  const getUpdateActions = (): UpdateAddress<AddressActions>[] => {
    const actions: UpdateAddress<AddressActions>[] = [];

    addresses.forEach((address) => {
      const { key: addressKey } = address;
      const initial = initialAddresses.find((initialAddress) => initialAddress.key === addressKey);
      if (initial) {
        if (
          address.city === initial.city &&
          address.country === initial.country &&
          address.postalCode === initial.postalCode &&
          address.streetName === initial.streetName
        ) {
          return;
        }
        actions.push({ action: 'changeAddress', address, addressKey });
        return;
      }
      actions.push({ action: 'addAddress', address });
    });

    initialBillingAddresses.forEach((addressKey) => {
      if (!specialAddresses.billingAddresses.includes(addressKey)) {
        actions.push({ action: 'removeBillingAddressId', addressKey });
      }
    });
    specialAddresses.billingAddresses.forEach((addressKey) => {
      if (!initialBillingAddresses.includes(addressKey)) {
        actions.push({ action: 'addBillingAddressId', addressKey });
      }
    });

    initialShippingAddresses.forEach((addressKey) => {
      if (!specialAddresses.shippingAddresses.includes(addressKey)) {
        actions.push({ action: 'removeShippingAddressId', addressKey });
      }
    });
    specialAddresses.shippingAddresses.forEach((addressKey) => {
      if (!initialShippingAddresses.includes(addressKey)) {
        actions.push({ action: 'addShippingAddressId', addressKey });
      }
    });

    initialAddresses
      .map((address) => address.key)
      .forEach((addressKey) => {
        if (!addresses.find((address) => address.key === addressKey)) {
          actions.push({ action: 'removeAddress', addressKey });
        }
      });

    if (initialBillingDefault !== defaultAddresses.defaultBillingAddress) {
      actions.push({ action: 'setDefaultBillingAddress', addressKey: defaultAddresses.defaultBillingAddress });
    }
    if (initialShippingDefault !== defaultAddresses.defaultShippingAddress) {
      actions.push({ action: 'setDefaultShippingAddress', addressKey: defaultAddresses.defaultShippingAddress });
    }

    return actions;
  };

  const saveHandler = async () => {
    if (error) {
      return;
    }

    if (addresses.length === 0) {
      setError('Add at least one address');
      return;
    }

    const actions = getUpdateActions();

    if (actions.length === 0) {
      setError('Make changes to save or click cancel');
      return;
    }

    setLoading(true);
    try {
      const resp = await UpdateAPI.updateAddress({
        id: customer.id,
        data: {
          version: customer.version,
          actions,
        },
      });
      dispatch(notify({ text: 'Addresses successfully updated', type: 'success' }));
      dispatch(setCustomer(resp));
      setIsEditModeOn(false);
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    setIsEditModeOn(false);
    setAddresses(initialAddresses);
    setSpecialAddresses({ billingAddresses: initialBillingAddresses, shippingAddresses: initialShippingAddresses });
    setDefaultAddresses({
      defaultBillingAddress: initialBillingDefault,
      defaultShippingAddress: initialShippingDefault,
    });
    setError('');
  };

  return isEditModeOn ? (
    <ProfileEditSection heading="Addresses" loading={loading} onCancel={cancelHandler} onSave={saveHandler}>
      {modal && (
        <AddressModal
          addressData={editAddress}
          onClose={() => setModal(false)}
          addAddress={(data) => addAddress(data)}
          testid="address-modal"
        />
      )}
      <Addresses
        setEditMode={setEditModeHandler}
        removeAddress={removeAddress}
        setDefaultAddress={setDefaultAddress}
        setAddressType={setAddressType}
        addresses={addresses}
        billing={specialAddresses.billingAddresses}
        shipping={specialAddresses.shippingAddresses}
        defaultBilling={defaultAddresses.defaultBillingAddress}
        defaultShipping={defaultAddresses.defaultShippingAddress}
        error={error}
        hideHeading
      />
      <Button
        onClick={() => {
          setModal(true);
          setEditAddress(null);
        }}
        testid="add-address"
      >
        Add address
      </Button>
    </ProfileEditSection>
  ) : (
    <ProfileSection heading="Addresses" buttonCaption="Edit Adresses" onEdit={() => setIsEditModeOn(true)}>
      {addressesProfile.map((address) => (
        <AddressField key={address.id} address={address} />
      ))}
    </ProfileSection>
  );
}

export default AddressesInfo;
