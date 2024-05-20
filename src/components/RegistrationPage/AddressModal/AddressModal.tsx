import React, { MouseEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as styles from './AddressModal.module.css';
import FormInput from '../../FormInput/FormInput';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import Validation from '../../../data/Validation/validation';
import { InputType } from '../../../types/input';
import { AddressData, CountryType } from '../../../types/customer';

type AddressState = Omit<AddressData, 'key' | 'country'>;
type InputErrors = {
  streetName: string;
  city: string;
  postalCode: string;
};
type Props = {
  onClose: () => void;
  addAddress: (data: AddressData) => void;
  addressData: AddressData | null;
  testid?: string;
};

function AddressModal({ onClose, addAddress, addressData, testid }: Props) {
  const [address, setAddress] = useState<AddressState>({
    streetName: addressData?.streetName ?? '',
    city: addressData?.city ?? '',
    postalCode: addressData?.postalCode ?? '',
  });
  const [country, setCountry] = useState<CountryType>(addressData?.country ?? 'US');
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    streetName: '',
    city: '',
    postalCode: '',
  });

  const inputHandler = (value: string, input: InputType | 'country') => {
    if (input === 'country') {
      setCountry(value === 'US' ? 'US' : 'CA');
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
    if (
      Object.entries(address).some(([key, value]) => {
        if (value.length === 0) {
          setInputErrors((prev) => ({
            ...prev,
            [key]: 'This field is required',
          }));
          return true;
        }
        return false;
      })
    ) {
      return;
    }
    addAddress({
      key: addressData?.key ?? uuidv4(),
      streetName: address.streetName,
      city: address.city,
      postalCode: address.postalCode,
      country,
    });
    onClose();
  };
  return (
    <div role="presentation" className={styles.modal} onMouseDown={onClose} data-testid={testid}>
      <form role="presentation" className={styles.form} onMouseDown={(e) => e.stopPropagation()}>
        <FormInput
          label="Street"
          id="street"
          error={inputErrors.streetName}
          value={address.streetName}
          onChange={(e) => inputHandler(e.target.value, 'streetName')}
        />
        <FormInput
          label="City"
          id="city"
          error={inputErrors.city}
          value={address.city}
          onChange={(e) => inputHandler(e.target.value, 'city')}
        />
        <FormInput
          label="Postal code"
          id="postalCode"
          error={inputErrors.postalCode}
          value={address.postalCode}
          onChange={(e) => inputHandler(e.target.value, country === 'US' ? 'postalCodeUS' : 'postalCodeCA')}
        />
        <Select
          value={country}
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
