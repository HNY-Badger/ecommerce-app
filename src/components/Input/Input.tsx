import React, { ChangeEventHandler } from 'react';
import * as styles from './Input.module.css';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  type?: 'password' | 'date' | 'text' | 'email' | 'search';
  error?: boolean;
  max?: string;
  placeholder?: string;
  testid?: string;
  className?: string;
};

function Input({ value, onChange, id, type = 'text', error, max, placeholder, testid, className }: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className={`${styles.input} ${error ? styles.input_error : ''} ${className || ''}`}
      max={max}
      placeholder={placeholder}
      data-testid={testid}
    />
  );
}

export default Input;
