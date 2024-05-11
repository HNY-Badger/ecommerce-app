import React, { ChangeEventHandler } from 'react';
import * as styles from './Input.module.css';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  type?: 'text' | 'password' | 'email' | 'date';
  error?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
};

function Input({ value, onChange, type = 'text', label, id, error, placeholder, required, min, max }: Props) {
  return (
    <div className={styles.input_box}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.input_error : ''}`}
        required={required}
        min={min}
        max={max}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
