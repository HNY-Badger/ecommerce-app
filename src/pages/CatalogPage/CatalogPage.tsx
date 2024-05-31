import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as styles from './CatalogPage.module.css';
import Products from '../../components/CatalogPage/Products/Products';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch } from '../../store/hooks/redux';
import Search from '../../components/CatalogPage/Search/Search';
import { Category, ProductsParams, SortType, isSortType } from '../../types/products';
import Categories from '../../components/CatalogPage/Categories/Categories';
import ProductParamBuilder from '../../data/Products/paramBuilder';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductsAPI from '../../api/products';
import Sort from '../../components/CatalogPage/Sort/Sort';
import { BreadcrumbLink } from '../../types/breadcrumb';

function CatalogPage() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType>('name.en-US asc');
  const [categories, setCategories] = useState<Category[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbLink[]>([]);

  const fetchHandler = () => {
    const params: ProductsParams = {};

    params['text.en-US'] = searchParams.get('search') ?? '';
    params.sort = sortType;

    const filter: string[] = [];
    if (id) {
      filter.push(ProductParamBuilder.filter.category(id));
    }
    params.filter = filter;
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    fetchHandler();
  }, [sortType, searchParams.get('search'), id]);

  useEffect(() => {
    if (id) {
      ProductsAPI.getCategoryById(id).then((cat) => {
        setBreadcrumb([{ name: cat.name['en-US'], to: `/category/${cat.id}` }]);
        if (cat.parent) {
          ProductsAPI.getCategoryById(cat.parent.id).then((parent) => {
            setBreadcrumb((prev) => [{ name: parent.name['en-US'], to: `/category/${parent.id}` }, ...prev]);
          });
        }
        ProductsAPI.getCategories(cat.id).then((ctgrs) => setCategories(ctgrs));
      });
    } else {
      setBreadcrumb([]);
      ProductsAPI.getCategories().then((ctgrs) => setCategories(ctgrs));
    }
  }, [id]);

  const sortHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    if (isSortType(value)) {
      setSortType(value as SortType);
    }
  };

  return (
    <div className={styles.catalog}>
      {categories.length > 0 && <Categories categories={categories} />}
      <div className={styles.content}>
        <div className={styles.sidebar}>Placeholder</div>
        <div className={styles.main}>
          <div className={styles.top_bar}>
            <Breadcrumb links={[{ name: 'All', to: '/catalog' }, ...breadcrumb]} />
            <Search />
            <Sort value={sortType} onChange={sortHandler} />
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
