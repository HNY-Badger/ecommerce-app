import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../store/hooks/redux';
import PersonalInfoField from './PersonalInfoField';
import ProfileSection from './ProfileSection';
import ProfileEditSection from './ProfileEditSection';
import FormInput from '../FormInput/FormInput';
import Validation from '../../data/Validation/validation';
import { InputType } from '../../types/input';
import { APIErrorResponse } from '../../types/api';
import { Customer } from '../../types/customer';
import { deleteCustomer, setCustomer } from '../../store/reducers/CustomerSlice';
import { notify } from '../../store/reducers/NotificationSlice';
import * as styles from './PersonalInfo.module.css';
import UpdateAPI from '../../api/updateCustomer';
import formatDate from '../../utils/formatDate';
import AuthAPI from '../../api/auth';

type PersonalDetails = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

type Props = {
  customer: Customer;
};

function PersonalInfo({ customer }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>('');

  const initialInputsData: PersonalDetails = {
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
  };
  const initialInputsErrors: PersonalDetails = {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  };
  const [inputsData, setInputsData] = useState<PersonalDetails>(initialInputsData);
  const [inputsErrors, setInputsErrors] = useState<PersonalDetails>(initialInputsErrors);

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

  const cancelHandler = () => {
    setIsEditModeOn(false);
    setInputsData(initialInputsData);
    setInputsErrors(initialInputsErrors);
    setGlobalError('');
  };

  const sendRequest = async (customerID: string, customerVersion: number): Promise<void> => {
    setLoading(true);
    try {
      const resp = await UpdateAPI.updatePersonal({
        id: customerID,
        data: {
          version: customerVersion,
          actions: [
            { action: 'changeEmail', email: inputsData.email },
            { action: 'setFirstName', firstName: inputsData.firstName },
            { action: 'setLastName', lastName: inputsData.lastName },
            { action: 'setDateOfBirth', dateOfBirth: inputsData.dateOfBirth },
          ],
        },
      });
      dispatch(notify({ text: 'Personal details successfully updated', type: 'success' }));
      dispatch(setCustomer(resp));
      setIsEditModeOn(false);
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      if (message.toLowerCase().includes('email')) {
        setInputsErrors((prev) => ({
          ...prev,
          email: message,
        }));
      } else if (message.toLowerCase().includes('different version')) {
        const newCustomer = await AuthAPI.getCustomerById(customerID);
        sendRequest(newCustomer.id, newCustomer.version);
      } else if (message.toLowerCase().includes('invalid_token')) {
        dispatch(deleteCustomer());
        navigate('/login');
      } else {
        setGlobalError(message);
      }
    } finally {
      setLoading(false);
    }
  };
  const saveHandler = async () => {
    // If any errors are present, don't submit
    if (Object.values(inputsErrors).some((error) => error.length > 0)) {
      return;
    }

    if (Object.entries(inputsData).every(([key, value]) => initialInputsData[key as keyof PersonalDetails] === value)) {
      setGlobalError('Make changes to save or click cancel');
      return;
    }

    sendRequest(customer.id, customer.version);
  };
  return isEditModeOn ? (
    <ProfileEditSection heading="Personal Details" loading={loading} onCancel={cancelHandler} onSave={saveHandler}>
      <form className={styles.form}>
        <FormInput
          label="Email"
          id="email"
          error={inputsErrors.email}
          value={inputsData.email}
          onChange={(e) => inputHandler(e.target.value, 'email')}
          testid="email"
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
      </form>
      {globalError && <p className={styles.error}>{globalError}</p>}
    </ProfileEditSection>
  ) : (
    <ProfileSection
      heading="Personal Details"
      buttonCaption="Edit Personal Details"
      onEdit={() => setIsEditModeOn(true)}
    >
      <PersonalInfoField value={customer.email} name="Email" />
      <PersonalInfoField value={customer.firstName} name="First name" />
      <PersonalInfoField value={customer.lastName} name="Last name" />
      <PersonalInfoField value={new Date(customer.dateOfBirth).toLocaleDateString()} name="Date of birth" />
    </ProfileSection>
  );
}

export default PersonalInfo;
