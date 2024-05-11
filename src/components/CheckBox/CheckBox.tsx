import React, { ChangeEventHandler } from 'react';
import * as styles from './CheckBox.module.css';

type CheckBoxProps = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  disabled?: boolean;
};

function CheckBox({ checked, onChange, label, id, disabled }: CheckBoxProps) {
  return (
    <div className={styles.checkbox_wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        className={styles.checkbox}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
