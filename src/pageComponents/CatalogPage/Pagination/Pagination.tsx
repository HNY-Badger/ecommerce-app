import React from 'react';
import * as styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

function Pagination({ currentPage, onPageChange, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pages}>
      {pages.map((page, index) => (
        <button
          type="button"
          className={`${styles.page} ${index === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(index)}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
