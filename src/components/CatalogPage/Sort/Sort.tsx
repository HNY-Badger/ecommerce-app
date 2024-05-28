import React, { ChangeEventHandler } from 'react';
import * as styles from './Sort.module.css';
import Select from '../../Select/Select';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

function Sort({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onChange={onChange}
      id="sort"
      options={[
        { text: 'Name (A-Z)', value: 'name-asc' },
        { text: 'Name (Z-A)', value: 'name-desc' },
        { text: 'Ascending price', value: 'price-asc' },
        { text: 'Descending price', value: 'price-desc' },
      ]}
      className={styles.sort}
    />
  );
}

export default Sort;
