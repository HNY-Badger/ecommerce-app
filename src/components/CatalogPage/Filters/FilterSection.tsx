import React from 'react';
import * as styles from './FilterSection.module.css';

type Props = {
  heading: string;
  children: React.ReactNode;
};

function FilterSection({ heading, children }: Props) {
  return (
    <div className={styles.filter_section} data-testid="filter-section">
      <p className={styles.heading}>{heading}</p>
      {children}
    </div>
  );
}

export default FilterSection;
