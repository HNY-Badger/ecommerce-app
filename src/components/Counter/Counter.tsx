import React from 'react';
import * as styles from './Counter.module.css';

type Props = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

function Counter({ value = 0, onChange, className }: Props) {
  return (
    <div className={`${styles.counter} ${className ?? ''}`}>
      <button type="button" className={styles.counter_btn} onClick={() => onChange(value - 1)}>
        -
      </button>
      <input className={styles.counter_input} type="number" readOnly value={value} />
      <button type="button" className={styles.counter_btn} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}

export default Counter;
