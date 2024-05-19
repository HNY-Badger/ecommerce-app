import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import * as styles from './RegistrationPage.module.css';
import Button from '../../components/Button/Button';
import Validation from '../../data/Validation/validation';
import { InputType } from '../../types/input';
import { AddressData, CustomerRegistrationData } from '../../types/customer';
import AuthAPI from '../../api/auth';
import { APIErrorResponse } from '../../types/api';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { customerLogin } from '../../store/reducers/CustomerSlice';
import TokenAPI from '../../api/token';
import { notify } from '../../store/reducers/NotificationSlice';
import AddressModal from '../../components/RegistrationPage/AddressModal/AddressModal';
import FormInput from '../../components/FormInput/FormInput';
import Addresses from '../../components/RegistrationPage/Addresses/Addresses';
import FormPassInput from '../../components/FormPassInput/FormPassInput';

type InputsState = Omit<
  CustomerRegistrationData,
  'addresses' | 'billingAddresses' | 'defaultBillingAddress' | 'shippingAddresses' | 'defaultShippingAddress'
>;

type SpecialAddresses = {
  billingAddresses: number[];
  shippingAddresses: number[];
};

type DefaultAddresses = {
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
};

type InputErrors = InputsState & {
  addresses: string;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function RegistrationPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customerReducer);
  useEffect(() => {
    if (customer) {
      navigate('/');
    }
  }, [customer]);
  const [modal, setModal] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputsData, setInputsData] = useState<InputsState>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  const [inputsErrors, setInputsErrors] = useState<InputErrors>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: '',
  });
  const [globalError, setGlobalError] = useState<string>('');
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [specialAddresses, setSpecialAddresses] = useState<SpecialAddresses>({
    billingAddresses: [],
    shippingAddresses: [],
  });
  const [defaultAddresses, setDefaultAddresses] = useState<DefaultAddresses>({});

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
    setInputsErrors((prev) => ({
      ...prev,
      addresses: '',
    }));
  };
  const setDefaultAddress = (
    index: number,
    checked: boolean,
    type: 'defaultBillingAddress' | 'defaultShippingAddress'
  ) => {
    setDefaultAddresses((prev) => {
      const defaults = { ...prev };
      if (checked) {
        defaults[type] = index;
      } else {
        defaults[type] = defaults[type] === index ? undefined : defaults[type];
      }
      return defaults;
    });
  };
  const setAddressType = (index: number, checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => {
    setSpecialAddresses((prev) => {
      const specials = { ...prev };
      if (checked) {
        specials[type].push(index);
      } else {
        specials[type] = specials[type].filter((i) => index !== i);
        const defaultType = type === 'billingAddresses' ? 'defaultBillingAddress' : 'defaultShippingAddress';
        setDefaultAddress(index, false, defaultType);
      }
      return specials;
    });
  };
  const removeAddress = (key: string) => {
    const index = addresses.findIndex((address) => address.key === key);
    setAddressType(index, false, 'billingAddresses');
    setAddressType(index, false, 'shippingAddresses');
    setAddresses((prev) => prev.filter((address) => address.key !== key));
  };

  const inputHandler = (value: string, input: InputType) => {
    setInputsData((prev) => ({
      ...prev,
      [input]: value,
    }));
    setInputsErrors((prev) => ({
      ...prev,
      [input]: Validation.checkValidity(value, input),
    }));
    setGlobalError('');
  };
  const registerHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    // If any errors are present, don't submit
    if (Object.values(inputsErrors).some((error) => error.length > 0)) {
      return;
    }
    // If any field is empty, don't submit (Except addresses)
    if (
      Object.entries(inputsData).some(([key, value]) => {
        if (value.length === 0) {
          setInputsErrors((prev) => ({
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
    // Check if addresses are empty
    if (addresses.length === 0) {
      setInputsErrors((prev) => ({
        ...prev,
        addresses: 'Add at least one address',
      }));
      return;
    }
    setLoading(true);
    try {
      const resp = await AuthAPI.register({ ...inputsData, ...specialAddresses, ...defaultAddresses, addresses });
      await TokenAPI.getCustomerToken(inputsData.email, inputsData.password);
      dispatch(notify({ text: 'Account successfully created', type: 'success' }));
      dispatch(customerLogin(resp.customer));
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      let inputType = '';
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      if (message.toLowerCase().includes('email')) {
        inputType = 'email';
      } else if (message.toLowerCase().includes('address')) {
        inputType = 'addresses';
      }
      if (inputType) {
        setInputsErrors((prev) => ({
          ...prev,
          [inputType]: message,
        }));
      } else {
        setGlobalError(message);
      }
    } finally {
      setLoading(false);
    }
  };
  const setEditModeHandler = (index: number): void => {
    setModal(true);
    setEditAddress(addresses[index]);
  };

  return (
    <div className={styles.registration}>
      {modal && (
        <AddressModal
          addressData={editAddress}
          onClose={() => setModal(false)}
          addAddress={(data) => addAddress(data)}
        />
      )}
      <form className={styles.form}>
        <h2 className={styles.heading}>Create an account</h2>
        <FormInput
          label="Email"
          id="email"
          error={inputsErrors.email}
          value={inputsData.email}
          onChange={(e) => inputHandler(e.target.value, 'email')}
        />
        <FormPassInput
          label="Password"
          id="pass"
          value={inputsData.password}
          error={inputsErrors.password}
          onChange={(e) => inputHandler(e.target.value, 'password')}
        />
        <FormInput
          label="First name"
          id="firstName"
          error={inputsErrors.firstName}
          value={inputsData.firstName}
          onChange={(e) => inputHandler(e.target.value, 'firstName')}
        />
        <FormInput
          label="Last name"
          id="lastName"
          error={inputsErrors.lastName}
          value={inputsData.lastName}
          onChange={(e) => inputHandler(e.target.value, 'lastName')}
        />
        <FormInput
          label="Date of birth"
          id="birthday"
          error={inputsErrors.dateOfBirth}
          value={inputsData.dateOfBirth}
          onChange={(e) => inputHandler(e.target.value, 'dateOfBirth')}
          max={formatDate(new Date())}
          type="date"
        />
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
          error={inputsErrors.addresses}
        />
        {globalError && <p className={styles.error}>{globalError}</p>}
        <Button
          onClick={() => {
            setModal(true);
            setEditAddress(null);
          }}
        >
          Add address
        </Button>
        <div className={styles.buttons}>
          <Button onClick={() => navigate('/login')}>To login</Button>
          <Button onClick={registerHandler}>
            <div className={styles.button_loading}>
              <p>Register</p>
              {loading && <Spinner height="16px" />}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
