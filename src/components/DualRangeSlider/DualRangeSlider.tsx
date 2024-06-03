import React, { ChangeEventHandler } from 'react';
import * as styles from './DualRangeSlider.module.css';

type Props = {
  minValue: number;
  maxValue: number;
  onChange: (minValue: number, maxValue: number) => void;
  min?: number;
  max?: number;
  gap?: number;
};

function DualRangeSlider({ minValue, maxValue, onChange, min = 0, max = 100, gap = 1 }: Props) {
  const minHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newMinVal = parseInt(e.target.value, 10);
    if (newMinVal + gap >= maxValue) {
      if (newMinVal + gap <= max) {
        onChange(newMinVal, newMinVal + gap);
      }
    } else {
      onChange(newMinVal, maxValue);
    }
  };
  const maxHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newMaxVal = parseInt(e.target.value, 10);
    if (newMaxVal - gap <= minValue) {
      if (newMaxVal - gap >= min) {
        onChange(newMaxVal - gap, newMaxVal);
      }
    } else {
      onChange(minValue, newMaxVal);
    }
  };

  return (
    <span className={styles.dual_slider}>
      <input className={styles.min} type="range" value={minValue} min={min} max={max} onChange={minHandler} />
      <input className={styles.max} type="range" value={maxValue} min={min} max={max} onChange={maxHandler} />
    </span>
  );
}

export default DualRangeSlider;
