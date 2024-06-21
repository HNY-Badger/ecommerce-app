import React, { CSSProperties } from 'react';
import * as styles from './Spinner.module.css';

function Spinner(style: CSSProperties) {
  return (
    <div className={styles.spinner} style={style} data-testid="spinner">
      <div className={styles.part1} />
      <div className={styles.part2} />
      <div className={styles.part3} />
      <div className={styles.part4} />
    </div>
  );
}

export default Spinner;
