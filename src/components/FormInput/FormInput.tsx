import React, { ChangeEventHandler } from 'react';
import * as styles from './FormInput.module.css';
import Input from '../Input/Input';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  type?: 'password' | 'date' | 'text' | 'email';
  error?: string;
  max?: string;
};

function FormInput({ value, onChange, type = 'text', label, id, error, max }: Props) {
  return (
    <div className={styles.input_box}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        error={error !== undefined && error.length > 0}
        max={max}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default FormInput;
