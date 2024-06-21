import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import * as styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

function Pagination({ currentPage, onPageChange, totalPages }: Props) {
  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (totalPages > 7) {
    const minOffset = currentPage - 2;
    const min = minOffset < 0 ? 0 : minOffset;
    const maxOffset = currentPage + 3;
    const max = maxOffset > totalPages - 1 ? totalPages : maxOffset;
    pages = pages.slice(min, max);
  }

  return (
    <div className={styles.pages}>
      {totalPages > 7 ? (
        <>
          {pages[0] !== 1 && (
            <>
              <button type="button" className={`${styles.page}`} onClick={() => onPageChange(0)}>
                1
              </button>
              <FaAngleDoubleLeft />
            </>
          )}
          {pages.map((page) => (
            <button
              type="button"
              className={`${styles.page} ${page - 1 === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page - 1)}
              key={page}
            >
              {page}
            </button>
          ))}
          {pages[pages.length - 1] !== totalPages && (
            <>
              <FaAngleDoubleRight />
              <button type="button" className={`${styles.page}`} onClick={() => onPageChange(totalPages - 1)}>
                {totalPages}
              </button>
            </>
          )}
        </>
      ) : (
        pages.map((page) => (
          <button
            type="button"
            className={`${styles.page} ${page - 1 === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page - 1)}
            key={page}
          >
            {page}
          </button>
        ))
      )}
    </div>
  );
}

export default Pagination;
