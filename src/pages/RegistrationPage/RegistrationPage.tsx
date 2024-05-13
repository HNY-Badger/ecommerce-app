import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './RegistrationPage.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AddressModal from '../../components/RegistrationPage/AddressModal/AddressModal';
import Validation from '../../data/Validation/validation';
import Addresses from '../../components/RegistrationPage/Addresses/Addresses';
import { InputType } from '../../types/input';
import { AddressData, UserRegistrationData } from '../../types/user';

type InputErrors = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: string;
};

type ModalState = {
  isOpen: boolean;
  addressData: AddressData | null;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function RegistrationPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalState>({ isOpen: false, addressData: null });
  const [userData, setUserData] = useState<UserRegistrationData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [],
    defaultShippingAddress: -1,
    defaultBillingAddress: -1,
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: '',
  });

  const addAddress = (data: AddressData) => {
    // If there is identical address, we don't add new one
    if (
      userData.addresses.some(
        (address) =>
          address.city === data.city &&
          address.country === data.country &&
          address.postalCode === data.postalCode &&
          address.streetName === data.streetName
      )
    ) {
      return;
    }
    setUserData((prev) => {
      const newState = { ...prev };
      const { defaultBillingAddress: billingIndex } = newState;
      const { defaultShippingAddress: shippingIndex } = newState;
      const filtered = userData.addresses.filter((address) => address.key !== data.key);
      newState.addresses = [...filtered, data];
      newState.defaultBillingAddress =
        billingIndex >= 0 && newState.addresses[billingIndex].key === data.key
          ? newState.addresses.length - 1
          : billingIndex;
      newState.defaultShippingAddress =
        shippingIndex >= 0 && newState.addresses[shippingIndex].key === data.key
          ? newState.addresses.length - 1
          : shippingIndex;
      return newState;
    });
    setInputErrors((prev) => ({
      ...prev,
      addresses: '',
    }));
  };
  const removeAddress = (key: string) => {
    setUserData((prev) => {
      const newState = { ...prev };
      const { defaultBillingAddress: billingIndex } = newState;
      const { defaultShippingAddress: shippingIndex } = newState;
      newState.defaultBillingAddress =
        billingIndex >= 0 && newState.addresses[billingIndex].key === key ? -1 : billingIndex;
      newState.defaultShippingAddress =
        shippingIndex >= 0 && newState.addresses[shippingIndex].key === key ? -1 : shippingIndex;
      newState.addresses = newState.addresses.filter((address) => address.key !== key);
      return newState;
    });
  };
  const setDefaultAddress = (
    key: string,
    checked: boolean,
    type: 'defaultBillingAddress' | 'defaultShippingAddress'
  ) => {
    setUserData((prev) => {
      const newState = { ...prev };
      if (checked) {
        newState[type] = newState.addresses.findIndex((address) => address.key === key);
      } else {
        newState[type] = -1;
      }
      return newState;
    });
  };

  const inputHandler = (value: string, input: InputType) => {
    setUserData((prev) => ({
      ...prev,
      [input]: value,
    }));
    setInputErrors((prev) => ({
      ...prev,
      [input]: Validation.checkValidity(value, input),
    }));
  };
  const registerHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // If any errors are present, don't submit
    if (Object.values(inputErrors).some((error) => error.length > 0)) {
      return;
    }
    // If any field is empty, don't submit (Except addresses)
    if (
      Object.values(userData).some((text) => typeof text !== 'number' && typeof text !== 'object' && text.length === 0)
    ) {
      return;
    }
    if (userData.addresses.length === 0) {
      setInputErrors((prev) => ({
        ...prev,
        addresses: 'You should add at least one address',
      }));
    }
    // Api here
  };
  const setEditModeHandler = (key: string): void => {
    setModal({ isOpen: true, addressData: userData.addresses.find((address) => address.key === key) ?? null });
  };
  return (
    <div className={styles.registration}>
      {modal.isOpen && (
        <AddressModal
          addressData={modal.addressData}
          onClose={() => setModal({ isOpen: false, addressData: null })}
          addAddress={(data: AddressData) => addAddress(data)}
        />
      )}
      <form className={styles.form}>
        <h2 className={styles.heading}>Create an account</h2>
        <Input
          label="Email"
          id="email"
          value={userData.email}
          error={inputErrors.email}
          onChange={(e) => inputHandler(e.target.value, 'email')}
          type="email"
        />
        <Input
          label="Password"
          id="pass"
          value={userData.password}
          error={inputErrors.password}
          onChange={(e) => inputHandler(e.target.value, 'password')}
        />
        <Input
          label="First name"
          id="firstName"
          value={userData.firstName}
          error={inputErrors.firstName}
          onChange={(e) => inputHandler(e.target.value, 'firstName')}
        />
        <Input
          label="Last name"
          id="lastName"
          value={userData.lastName}
          error={inputErrors.lastName}
          onChange={(e) => inputHandler(e.target.value, 'lastName')}
        />
        <Input
          label="Date of birth"
          id="birthday"
          value={userData.dateOfBirth}
          error={inputErrors.dateOfBirth}
          onChange={(e) => inputHandler(e.target.value, 'dateOfBirth')}
          max={formatDate(new Date())}
          type="date"
        />
        <Addresses
          setEditMode={setEditModeHandler}
          removeAddress={removeAddress}
          setDefaultAddress={setDefaultAddress}
          addresses={userData.addresses}
          billing={userData.defaultBillingAddress}
          shipping={userData.defaultShippingAddress}
          error={inputErrors.addresses}
        />
        <Button onClick={() => setModal({ isOpen: true, addressData: null })}>Add address</Button>
        <div className={styles.buttons}>
          <Button onClick={() => navigate('/login')}>To login</Button>
          <Button onClick={registerHandler}>Register</Button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
