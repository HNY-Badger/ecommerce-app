import React, { ChangeEventHandler, useEffect, useState } from 'react';
import * as styles from './CatalogPage.module.css';
import Products from '../../components/CatalogPage/Products/Products';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch } from '../../store/hooks/redux';
import Search from '../../components/CatalogPage/Search/Search';
import { ProductsParams } from '../../types/products';
import Sort from '../../components/CatalogPage/Sort/Sort';
import ProductParamBuilder from '../../data/Products/paramBuilder';

function formatSortType(sortType: string): string {
  switch (sortType) {
    case 'name-asc':
      return ProductParamBuilder.sort.format('name', 'asc');
    case 'name-desc':
      return ProductParamBuilder.sort.format('name', 'desc');
    case 'price-asc':
      return ProductParamBuilder.sort.format('price', 'asc');
    case 'price-desc':
      return ProductParamBuilder.sort.format('price', 'desc');
    default:
      return ProductParamBuilder.sort.format('name', 'asc');
  }
}

function CatalogPage() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortType, setSortType] = useState<string>('name-asc');

  const fetchHandler = (prodParams: ProductsParams) => {
    const params: ProductsParams = { ...prodParams };
    if (searchQuery.length > 0) params['text.en-US'] = searchQuery;
    if (!prodParams.sort) params.sort = formatSortType(sortType);
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    fetchHandler({});
  }, []);

  const sortHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSortType(e.target.value);
    fetchHandler({ sort: formatSortType(e.target.value) });
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
