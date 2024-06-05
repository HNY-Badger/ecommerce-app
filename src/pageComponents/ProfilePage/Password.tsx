import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/redux';
import ProfileSection from './ProfileSection';
import { Customer } from '../../types/customer';
import ProfileEditSection from './ProfileEditSection';
import UpdateAPI from '../../api/updateCustomer';
import Validation from '../../data/Validation/validation';
import { deleteCustomer, setCustomer } from '../../store/reducers/CustomerSlice';
import { APIErrorResponse } from '../../types/api';
import { notify } from '../../store/reducers/NotificationSlice';
import * as styles from './PersonalInfo.module.css';
import AuthAPI from '../../api/auth';
import FormPassInput from '../../components/FormPassInput/FormPassInput';

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PasswordInputType = keyof PasswordData;

type Props = {
  customer: Customer;
};

function Password({ customer }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>('');

  const initialData: PasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const [inputsData, setInputsData] = useState<PasswordData>(initialData);
  const [inputsErrors, setInputsErrors] = useState<PasswordData>(initialData);

  const inputHandler = (value: string, input: PasswordInputType) => {
    setInputsData((prev) => ({
      ...prev,
      [input]: value,
    }));

    if (input === 'currentPassword') {
      setInputsErrors((prev) => ({
        ...prev,
        currentPassword: value.length > 0 ? '' : 'This field is required',
      }));
    }
    if (input === 'newPassword') {
      const { confirmPassword } = inputsData;
      setInputsErrors((prev) => ({
        ...prev,
        newPassword: Validation.checkValidity(value, 'password'),
        confirmPassword:
          value !== confirmPassword && confirmPassword.length > 0
            ? 'This field value must be equal to the new password'
            : '',
      }));
    }
    if (input === 'confirmPassword') {
      const { newPassword } = inputsData;
      setInputsErrors((prev) => ({
        ...prev,
        confirmPassword: value !== newPassword ? 'This field value must be equal to the new password' : '',
      }));
    }
    setGlobalError('');
  };

  const cancelHandler = () => {
    setIsEditModeOn(false);
    setInputsData(initialData);
    setInputsErrors(initialData);
    setGlobalError('');
  };

  const sendRequest = async (customerID: string, customerVersion: number): Promise<void> => {
    setLoading(true);
    try {
      await UpdateAPI.updatePassword({
        id: customerID,
        version: customerVersion,
        currentPassword: inputsData.currentPassword,
        newPassword: inputsData.newPassword,
      });
      const resp = await AuthAPI.login(customer.email, inputsData.newPassword);
      dispatch(setCustomer(resp.customer));
      dispatch(notify({ text: 'Password successfully updated', type: 'success' }));
      setIsEditModeOn(false);
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      if (message.toLowerCase().includes('current password')) {
        setInputsErrors((prev) => ({
          ...prev,
          currentPassword: message,
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
      setInputsData(initialData);
    }
  };

  const saveHandler = async () => {
    if (Object.values(inputsErrors).some((error) => error.length > 0)) {
      return;
    }
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
    if (Object.values(inputsData).every((value) => value === inputsData.currentPassword)) {
      setGlobalError('New password must be different from the current one');
      return;
    }

    sendRequest(customer.id, customer.version);
  };

  return isEditModeOn ? (
    <ProfileEditSection heading="Password" loading={loading} onCancel={cancelHandler} onSave={saveHandler}>
      <form className={styles.form}>
        <FormPassInput
          label="Current password"
          id="password"
          value={inputsData.currentPassword}
          error={inputsErrors.currentPassword}
          onChange={(e) => inputHandler(e.target.value, 'currentPassword')}
          testid="currentPassword"
        />
        <FormPassInput
          label="New password"
          id="newPassword"
          value={inputsData.newPassword}
          error={inputsErrors.newPassword}
          onChange={(e) => inputHandler(e.target.value, 'newPassword')}
          testid="newPassword"
        />
        <FormPassInput
          label="Confirm new password"
          id="confirmPassword"
          value={inputsData.confirmPassword}
          error={inputsErrors.confirmPassword}
          onChange={(e) => inputHandler(e.target.value, 'confirmPassword')}
          testid="confirmPassword"
        />
      </form>
      {globalError && <p className={styles.error}>{globalError}</p>}
    </ProfileEditSection>
  ) : (
    <ProfileSection heading="Password" buttonCaption="Change Password" onEdit={() => setIsEditModeOn(true)} />
  );
}

export default Password;
