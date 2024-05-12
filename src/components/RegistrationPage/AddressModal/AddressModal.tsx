import React, { MouseEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as styles from './AddressModal.module.css';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import Validation from '../../../data/Validation/validation';
import { InputState, InputType } from '../../../types/input';
import { AddressData } from '../../../types/user';

type AddressState = {
  street: InputState<string>;
  city: InputState<string>;
  postalCode: InputState<string>;
  country: 'US' | 'CA';
};
type Props = {
  onClose: () => void;
  addAddress: (data: AddressData) => void;
  addressData: AddressData | null;
};

function AddressModal({ onClose, addAddress, addressData }: Props) {
  const [address, setAddress] = useState<AddressState>({
    street: {
      value: addressData?.streetName ?? '',
      error: '',
    },
    city: {
      value: addressData?.city ?? '',
      error: '',
    },
    postalCode: {
      value: addressData?.postalCode ?? '',
      error: '',
    },
    country: addressData?.country ?? 'US',
  });

  const inputHandler = (value: string, input: InputType | 'country') => {
    setAddress((prev) => {
      if (input === 'country') {
        return {
          ...prev,
          country: value === 'US' ? 'US' : 'CA',
          postalCode: {
            value: address.postalCode.value,
            error: Validation.checkValidity(address.postalCode.value, value === 'US' ? 'postalCodeUS' : 'postalCodeCA'),
          },
        };
      }
      return {
        ...prev,
        [['postalCodeCA', 'postalCodeUS'].includes(input) ? 'postalCode' : input]: {
          value,
          error: Validation.checkValidity(value, input),
        },
      };
    });
  };
  const submitHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // If any errors are present, don't submit
    if (Object.values(address).some((input) => input !== 'US' && input !== 'CA' && input.error)) {
      return;
    }
    // If any field is empty, don't submit
    if (Object.values(address).some((input) => input !== 'US' && input !== 'CA' && !input.value)) {
      return;
    }
    addAddress({
      key: addressData?.key ?? uuidv4(),
      streetName: address.street.value,
      city: address.city.value,
      postalCode: address.postalCode.value,
      country: address.country,
    });
    onClose();
  };
  return (
    <div role="presentation" className={styles.modal} onClick={onClose}>
      <form role="presentation" className={styles.form} onClick={(e) => e.stopPropagation()}>
        <Input
          value={address.street.value}
          error={address.street.error}
          onChange={(e) => inputHandler(e.target.value, 'street')}
          label="Street"
          id="street"
        />
        <Input
          value={address.city.value}
          error={address.city.error}
          onChange={(e) => inputHandler(e.target.value, 'city')}
          label="City"
          id="city"
        />
        <Input
          value={address.postalCode.value}
          error={address.postalCode.error}
          onChange={(e) => inputHandler(e.target.value, address.country === 'US' ? 'postalCodeUS' : 'postalCodeCA')}
          label="Postal code"
          id="postalCode"
        />
        <Select
          value={address.country}
          onChange={(e) => inputHandler(e.target.value, 'country')}
          label="Country"
          id="country"
          options={[
            { text: 'U.S.', value: 'US' },
            { text: 'Canada', value: 'CA' },
          ]}
        />
        <div className={styles.buttons}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={submitHandler}>{addressData ? 'Edit address' : 'Add address'}</Button>
        </div>
      </form>
    </div>
  );
}

export default AddressModal;
