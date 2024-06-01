import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import * as styles from './Filters.module.css';
import FilterSection from './FilterSection';
import PriceFilter from './PriceFilter';
import { Attribute } from '../../../types/products';
import CheckBox from '../../CheckBox/CheckBox';
import Button from '../../Button/Button';

type Props = {
  attributes: Attribute[];
  onAttributeCheck: (name: string, key: string, value: boolean) => void;
  priceRange: [number, number];
  priceLimits: [number, number];
  onPriceChange: (min: number, max: number) => void;
  onReset: () => void;
};

function Filters({ attributes, onAttributeCheck, priceRange, priceLimits, onPriceChange, onReset }: Props) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <>
      <Button className={styles.toggle_btn} onClick={() => setActive(true)}>
        Filters
      </Button>
      <div className={`${styles.filters} ${active ? styles.active : ''}`}>
        <button aria-label="Close" type="button" className={styles.close_btn} onClick={() => setActive(false)}>
          <IoIosCloseCircle />
        </button>
        <Button onClick={onReset}>Reset</Button>
        {attributes.length > 1 &&
          attributes.map((attr) => (
            <FilterSection key={attr.name} heading={attr.name}>
              {Array.from(attr.values.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([key, value]) => (
                  <CheckBox
                    label={key}
                    key={key}
                    id={key}
                    checked={value}
                    onChange={(e) => onAttributeCheck(attr.name, key, e.target.checked)}
                  />
                ))}
            </FilterSection>
          ))}
        {priceLimits[0] !== priceLimits[1] && (
          <FilterSection heading="Price">
            <PriceFilter priceRange={priceRange} priceLimits={priceLimits} onPriceChange={onPriceChange} />
          </FilterSection>
        )}
      </div>
    </>
  );
}

export default Filters;
