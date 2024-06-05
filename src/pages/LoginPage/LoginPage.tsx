import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import * as styles from './LoginPage.module.css';
import FormInput from '../../components/FormInput/FormInput';
import { InputType } from '../../types/input';
import Validation from '../../data/Validation/validation';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import AuthAPI from '../../api/auth';
import { APIErrorResponse } from '../../types/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setCustomer } from '../../store/reducers/CustomerSlice';
import FormPassInput from '../../components/FormPassInput/FormPassInput';
import { resetCartStore } from '../../store/reducers/CartSlice';

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customerReducer);
  useEffect(() => {
    if (customer) {
      navigate('/');
    }
  }, [customer]);

  const [loading, setLoading] = useState<boolean>(false);
  const [inputsData, setInputsData] = useState<Inputs>({ email: '', password: '' });
  const [inputsErrors, setInputsErrors] = useState<Inputs>({ email: '', password: '' });
  const [globalError, setGlobalError] = useState<string>('');

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
  const loginHandler = async () => {
    // If any errors are present, don't submit
    if (Object.values(inputsErrors).some((error) => error.length > 0)) {
      return;
    }
    // If any field is empty, don't submit
    if (
      Object.entries(inputsData).some(([key, value]) => {
        if (value.length === 0) {
          setInputsErrors((prev) => ({
            ...prev,
            [key]: 'Please fill out this field',
          }));
          return true;
        }
        return false;
      })
    ) {
      return;
    }
    try {
      setLoading(true);
      const resp = await AuthAPI.login(inputsData.email, inputsData.password);
      dispatch(setCustomer(resp.customer));
      dispatch(resetCartStore());
      navigate('/');
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      const message = err.response?.data.message ?? 'An unexpected error occurred, please, try again later';
      setGlobalError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Login</h2>
        <FormInput
          label="Email"
          id="email"
          value={inputsData.email}
          error={inputsErrors.email}
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
        <p className={styles.error}>{globalError}</p>
        <div className={styles.buttons}>
          <Button onClick={() => navigate('/registration')}>To registration</Button>
          <Button onClick={loginHandler} testid="login-button">
            <div className={styles.button_loading}>
              <p>Login</p>
              {loading && <Spinner height="16px" />}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
