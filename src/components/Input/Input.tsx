import React, { ChangeEventHandler } from 'react';
import * as styles from './Input.module.css';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  type?: 'password' | 'date' | 'text' | 'email';
  error?: boolean;
  max?: string;
  testid?: string;
};

function Input({ value, onChange, id, type = 'text', error, max, testid }: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className={`${styles.input} ${error ? styles.input_error : ''}`}
      max={max}
      data-testid={testid}
    />
  );
}

export default Input;
