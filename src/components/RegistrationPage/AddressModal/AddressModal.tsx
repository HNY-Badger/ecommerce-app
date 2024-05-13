import React, { MouseEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as styles from './AddressModal.module.css';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import Validation from '../../../data/Validation/validation';
import { InputType } from '../../../types/input';
import { AddressData } from '../../../types/user';

type AddressState = Omit<AddressData, 'key'>;
type InputErrors = {
  streetName: string;
  city: string;
  postalCode: string;
};
type Props = {
  onClose: () => void;
  addAddress: (data: AddressData) => void;
  addressData: AddressData | null;
};

function AddressModal({ onClose, addAddress, addressData }: Props) {
  const [address, setAddress] = useState<AddressState>({
    streetName: addressData?.streetName ?? '',
    city: addressData?.city ?? '',
    postalCode: addressData?.postalCode ?? '',
    country: addressData?.country ?? 'US',
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    streetName: '',
    city: '',
    postalCode: '',
  });

  const inputHandler = (value: string, input: InputType | 'country') => {
    if (input === 'country') {
      setAddress((prev) => ({
        ...prev,
        country: value === 'US' ? 'US' : 'CA',
      }));
      setInputErrors((prev) => ({
        ...prev,
        postalCode: Validation.checkValidity(address.postalCode, value === 'US' ? 'postalCodeUS' : 'postalCodeCA'),
      }));
    } else {
      const inputType = ['postalCodeCA', 'postalCodeUS'].includes(input) ? 'postalCode' : input;
      setAddress((prev) => ({
        ...prev,
        [inputType]: value,
      }));
      setInputErrors((prev) => ({
        ...prev,
        [inputType]: Validation.checkValidity(value, input),
      }));
    }
  };
  const submitHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // If any errors are present, don't submit
    if (Object.values(inputErrors).some((error) => error.length > 0)) {
      return;
    }
    // If any field is empty, don't submit
    if (Object.values(address).some((value) => value.length === 0)) {
      return;
    }
    addAddress({
      key: addressData?.key ?? uuidv4(),
      streetName: address.streetName,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    });
    onClose();
  };
  return (
    <div role="presentation" className={styles.modal} onClick={onClose}>
      <form role="presentation" className={styles.form} onClick={(e) => e.stopPropagation()}>
        <Input
          value={address.streetName}
          error={inputErrors.streetName}
          onChange={(e) => inputHandler(e.target.value, 'streetName')}
          label="Street"
          id="street"
        />
        <Input
          value={address.city}
          error={inputErrors.city}
          onChange={(e) => inputHandler(e.target.value, 'city')}
          label="City"
          id="city"
        />
        <Input
          value={address.postalCode}
          error={inputErrors.postalCode}
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
