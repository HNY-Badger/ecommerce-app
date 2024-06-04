import React, { ChangeEventHandler } from 'react';
import * as styles from './FormSelect.module.css';
import Select from '../Select/Select';

export type Option = {
  text: string;
  value: string;
};

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  id: string;
  label: string;
  options: Option[];
};

function FormSelect({ value, onChange, id, label, options }: Props) {
  return (
    <div className={styles.select_wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Select value={value} onChange={onChange} id={id} options={options} />
    </div>
  );
}

export default FormSelect;
