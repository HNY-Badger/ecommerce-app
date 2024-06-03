import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './CategoryItem.module.css';
import { Category } from '../../../types/products';

type Props = {
  category: Category;
  setInactive: () => void;
};

function CategoryItem({ category, setInactive }: Props) {
  const navigate = useNavigate();

  const categoryHandler = (id: string) => {
    setInactive();
    navigate(`/category/${id}`);
  };
  return (
    <div className={styles.category_item}>
      <button type="button" onClick={() => categoryHandler(category.id)} className={styles.category_btn}>
        {category.name}
      </button>
      {category.subcategories.length > 0 && (
        <ul className={styles.subcategories}>
          {category.subcategories.map((sub) => (
            <li key={sub.id}>
              <button type="button" onClick={() => categoryHandler(sub.id)} className={styles.subcategory_btn}>
                {sub.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryItem;
