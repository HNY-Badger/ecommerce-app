import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import * as styles from './Categories.module.css';
import { Category } from '../../../types/products';
import CategoryItem from './CategoryItem';
import Button from '../../Button/Button';

type Props = {
  categories: Category[];
};

function Categories({ categories }: Props) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={styles.categories_wrapper}>
      <Button className={styles.toggle_btn} onClick={() => setActive(true)}>
        Categories
      </Button>
      <div className={`${styles.categories} ${active ? styles.active : ''}`}>
        <button aria-label="Close" type="button" className={styles.close_btn} onClick={() => setActive(false)}>
          <IoIosCloseCircle />
        </button>
        {categories.map((catg) => (
          <CategoryItem setInactive={() => setActive(false)} key={catg.id} category={catg} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
