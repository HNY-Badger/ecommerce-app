import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import * as styles from './RegistrationPage.module.css';
import Button from '../../components/Button/Button';
import Validation from '../../data/Validation/validation';
import { InputType } from '../../types/input';
import { AddressData, CustomerRegistrationData, SpecialAddresses, DefaultAddresses } from '../../types/customer';
import AuthAPI from '../../api/auth';
import { APIErrorResponse } from '../../types/api';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setCustomer } from '../../store/reducers/CustomerSlice';
import TokenAPI from '../../api/token';
import { notify } from '../../store/reducers/NotificationSlice';
import AddressModal from '../../pageComponents/RegistrationPage/AddressModal/AddressModal';
import FormInput from '../../components/FormInput/FormInput';
import Addresses from '../../pageComponents/RegistrationPage/Addresses/Addresses';
import FormPassInput from '../../components/FormPassInput/FormPassInput';
import formatDate from '../../utils/formatDate';

type InputsState = Omit<
  CustomerRegistrationData,
  'addresses' | 'billingAddresses' | 'defaultBillingAddress' | 'shippingAddresses' | 'defaultShippingAddress'
>;

type InputErrors = InputsState & {
  addresses: string;
};

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
  };
  const setAddressType = (key: string, checked: boolean, type: 'billingAddresses' | 'shippingAddresses') => {
    setSpecialAddresses((prev) => {
      const specials = { ...prev };
      if (checked) {
        specials[type].push(key);
      } else {
        specials[type] = specials[type].filter((k) => key !== k);
        const defaultType = type === 'billingAddresses' ? 'defaultBillingAddress' : 'defaultShippingAddress';
        setDefaultAddress(key, false, defaultType);
      }
      return specials;
    });
  };
  const removeAddress = (key: string) => {
    setAddressType(key, false, 'billingAddresses');
    setAddressType(key, false, 'shippingAddresses');
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
      // Convertion from keys to indexes for API
      const billingAddresses: number[] = specialAddresses.billingAddresses.map((key) =>
        addresses.findIndex((address) => address.key === key)
      );
      let defaultBillingAddress: number | undefined = addresses.findIndex(
        (address) => address.key === defaultAddresses.defaultBillingAddress
      );
      defaultBillingAddress = defaultBillingAddress > -1 ? defaultBillingAddress : undefined;
      const shippingAddresses: number[] = specialAddresses.shippingAddresses.map((key) =>
        addresses.findIndex((address) => address.key === key)
      );
      let defaultShippingAddress: number | undefined = addresses.findIndex(
        (address) => address.key === defaultAddresses.defaultShippingAddress
      );
      defaultShippingAddress = defaultShippingAddress > -1 ? defaultShippingAddress : undefined;

      const resp = await AuthAPI.register({
        ...inputsData,
        billingAddresses,
        defaultBillingAddress,
        shippingAddresses,
        defaultShippingAddress,
        addresses,
      });
      await TokenAPI.getCustomerToken(inputsData.email, inputsData.password);
      dispatch(notify({ text: 'Account successfully created', type: 'success' }));
      dispatch(setCustomer(resp.customer));
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      if (message.toLowerCase().includes('email')) {
        setInputsErrors((prev) => ({
          ...prev,
          email: message,
        }));
      } else {
        setGlobalError(message);
      }
    } finally {
      setLoading(false);
    }
  };
  const setEditModeHandler = (key: string): void => {
    const addr = addresses.find((address) => address.key === key);
    if (addr) {
      setModal(true);
      setEditAddress(addr);
    }
  };

  return (
    <div className={styles.registration}>
      {modal && (
        <AddressModal
          addressData={editAddress}
          onClose={() => setModal(false)}
          addAddress={(data) => addAddress(data)}
          testid="address-modal"
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
          testid="email"
        />
        <FormPassInput
          label="Password"
          id="pass"
          value={inputsData.password}
          error={inputsErrors.password}
          onChange={(e) => inputHandler(e.target.value, 'password')}
          testid="password"
        />
        <FormInput
          label="First name"
          id="firstName"
          error={inputsErrors.firstName}
          value={inputsData.firstName}
          onChange={(e) => inputHandler(e.target.value, 'firstName')}
          testid="first-name"
        />
        <FormInput
          label="Last name"
          id="lastName"
          error={inputsErrors.lastName}
          value={inputsData.lastName}
          onChange={(e) => inputHandler(e.target.value, 'lastName')}
          testid="last-name"
        />
        <FormInput
          label="Date of birth"
          id="birthday"
          error={inputsErrors.dateOfBirth}
          value={inputsData.dateOfBirth}
          onChange={(e) => inputHandler(e.target.value, 'dateOfBirth')}
          max={formatDate(new Date())}
          type="date"
          testid="date-of-birth"
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
          testid="add-address"
        >
          Add address
        </Button>
        <div className={styles.buttons}>
          <Button onClick={() => navigate('/login')}>To login</Button>
          <Button onClick={registerHandler} testid="registration-button">
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
