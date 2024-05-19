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
  testid?: string;
};

function FormInput({ value, onChange, type = 'text', label, id, error, max, testid }: Props) {
  return (
    <div className={styles.input_box}>
      <label htmlFor={id} className={styles.label} data-testid={`${testid}-label`}>
        {label}
      </label>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        error={error !== undefined && error.length > 0}
        max={max}
        testid={`${testid}-input`}
      />
      {error && (
        <p className={styles.error} data-testid={`${testid}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
