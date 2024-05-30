import React, { ChangeEventHandler, useEffect, useState } from 'react';
import * as styles from './CatalogPage.module.css';
import Products from '../../components/CatalogPage/Products/Products';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch } from '../../store/hooks/redux';
import Search from '../../components/CatalogPage/Search/Search';
import { ProductsParams, SortType, isSortType } from '../../types/products';
import Sort from '../../components/CatalogPage/Sort/Sort';

function CatalogPage() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('name.en-US asc');

  const fetchHandler = (prodParams: ProductsParams) => {
    const params: ProductsParams = { ...prodParams };
    if (searchQuery.length > 0) params['text.en-US'] = searchQuery;
    if (!prodParams.sort) params.sort = sortType;
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    fetchHandler({});
  }, []);

  const sortHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    if (isSortType(value)) {
      setSortType(value as SortType);
      fetchHandler({ sort: value as SortType });
    }
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.content}>
        <div className={styles.sidebar}>Placeholder</div>
        <div className={styles.main}>
          <div className={styles.top_bar}>
            <Search
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={() => fetchHandler({})}
            />
            <Sort value={sortType} onChange={sortHandler} />
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
