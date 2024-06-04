import React, { ChangeEventHandler } from 'react';
import * as styles from './Select.module.css';

export type Option = {
  text: string;
  value: string;
};

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  id: string;
  options: Option[];
  className?: string;
};

function Select({ value, onChange, id, options, className }: Props) {
  return (
    <select value={value} onChange={onChange} id={id} className={`${styles.select} ${className || ''}`}>
      {options.map((option) => (
        <option key={option.value} className={styles.option} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
