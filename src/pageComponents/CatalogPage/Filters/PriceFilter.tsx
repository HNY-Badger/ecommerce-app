import React from 'react';
import * as styles from './PriceFilter.module.css';
import Input from '../../../components/Input/Input';
import DualRangeSlider from '../../../components/DualRangeSlider/DualRangeSlider';

type Props = {
  priceRange: [number, number];
  priceLimits: [number, number];
  onPriceChange: (min: number, max: number) => void;
};

function PriceFilter({ priceRange, priceLimits, onPriceChange }: Props) {
  return (
    <div className={styles.price_filter}>
      <div className={styles.inputs}>
        <Input
          id="min"
          value={priceRange[0].toString()}
          onChange={(e) => onPriceChange(parseInt(e.target.value, 10), priceRange[1])}
        />
        <Input
          id="max"
          value={priceRange[1].toString()}
          onChange={(e) => onPriceChange(priceRange[0], parseInt(e.target.value, 10))}
        />
      </div>
      <DualRangeSlider
        minValue={priceRange[0]}
        maxValue={priceRange[1]}
        min={priceLimits[0]}
        max={priceLimits[1]}
        gap={100}
        onChange={onPriceChange}
      />
    </div>
  );
}

export default PriceFilter;
