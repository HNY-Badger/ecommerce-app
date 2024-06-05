import React from 'react';
import * as styles from './PersonalInfoField.module.css';

type Props = {
  value: string;
  name: string;
};

function PersonalInfoField({ value, name }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{`${name}:`}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default PersonalInfoField;
