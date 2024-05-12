import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './RegistrationPage.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AddressModal from '../../components/RegistrationPage/AddressModal/AddressModal';
import Validation, { InputType } from '../../data/Validation/validation';
import Addresses from '../../components/RegistrationPage/Addresses/Addresses';
import { AddressInfo } from '../../store/reducers/RegAddressesSlice';
import { useAppSelector } from '../../store/hooks/redux';

export type InputState<T> = {
  value: T;
  error: string;
};

export type SetEditCallback = (key: string) => void;

type UserState = {
  email: InputState<string>;
  password: InputState<string>;
  firstName: InputState<string>;
  lastName: InputState<string>;
  birthday: InputState<string>;
};

type ModalState = {
  isOpen: boolean;
  edit: AddressInfo | undefined;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function RegistrationPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalState>({ isOpen: false, edit: undefined });
  const [user, setUser] = useState<UserState>({
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    firstName: {
      value: '',
      error: '',
    },
    lastName: {
      value: '',
      error: '',
    },
    birthday: {
      value: '',
      error: '',
    },
  });
  const { addresses } = useAppSelector((state) => state.addressesReducer);
  const [addressesError, setAddressError] = useState<string>('');
  useEffect(() => {
    setAddressError('');
  }, [addresses]);

  const inputHandler = (value: string, input: InputType) => {
    setUser((prev) => ({
      ...prev,
      [input]: {
        value,
        error: Validation.checkValidity(value, input),
      },
    }));
  };
  const registerHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // If any errors are present, don't submit
    if (Object.values(user).some((input) => input.error) || addressesError) {
      return;
    }
    // If any field is empty, don't submit (Except addresses)
    if (Object.values(user).some((input) => !input.value)) {
      return;
    }
    if (addresses.length === 0) {
      setAddressError('You should add at least one address');
    }
    // Api here
  };
  const setEditHandler: SetEditCallback = (key: string): void => {
    setModal({ isOpen: true, edit: addresses.find((address) => address.key === key) });
  };
  return (
    <main className={styles.registration}>
      {modal.isOpen && <AddressModal info={modal.edit} onClose={() => setModal({ isOpen: false, edit: undefined })} />}
      <form className={styles.form}>
        <h2 className={styles.heading}>Create an account</h2>
        <Input
          label="Email"
          id="email"
          value={user.email.value}
          error={user.email.error}
          onChange={(e) => inputHandler(e.target.value, 'email')}
          type="email"
        />
        <Input
          label="Password"
          id="pass"
          value={user.password.value}
          error={user.password.error}
          onChange={(e) => inputHandler(e.target.value, 'password')}
        />
        <Input
          label="First name"
          id="firstName"
          value={user.firstName.value}
          error={user.firstName.error}
          onChange={(e) => inputHandler(e.target.value, 'firstName')}
        />
        <Input
          label="Last name"
          id="lastName"
          value={user.lastName.value}
          error={user.lastName.error}
          onChange={(e) => inputHandler(e.target.value, 'lastName')}
        />
        <Input
          label="Date of birth"
          id="birthday"
          value={user.birthday.value}
          error={user.birthday.error}
          onChange={(e) => inputHandler(e.target.value, 'birthday')}
          max={formatDate(new Date())}
          type="date"
        />
        <Addresses setEdit={setEditHandler} error={addressesError} />
        <Button onClick={() => setModal({ isOpen: true, edit: undefined })}>Add address</Button>
        <div className={styles.buttons}>
          <Button onClick={() => navigate('/login')}>To login</Button>
          <Button onClick={registerHandler}>Register</Button>
        </div>
      </form>
    </main>
  );
}

export default RegistrationPage;
