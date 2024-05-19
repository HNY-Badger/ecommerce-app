import React, { ChangeEventHandler, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import * as styles from './FormPassInput.module.css';
import Input from '../Input/Input';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  error?: string;
};

function FormPassInput({ value, onChange, label, id, error }: Props) {
  const [passIsVisible, setPassIsVisible] = useState<boolean>(false);
  const passVisibilityHandler = () => {
    setPassIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.password_box}>
      <div className={styles.label_box}>
        <label htmlFor={id}>{label}</label>
        <button className={styles.password_hide} type="button" onClick={passVisibilityHandler}>
          {passIsVisible ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>
      <Input
        id={id}
        value={value}
        error={error !== undefined && error.length > 0}
        onChange={onChange}
        type={passIsVisible ? 'text' : 'password'}
      />
      <p className={styles.error}>{error}</p>
    </div>
  );
}

export default FormPassInput;
