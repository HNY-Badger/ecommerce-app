import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as styles from './CatalogPage.module.css';
import Products from '../../components/CatalogPage/Products/Products';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import Search from '../../components/CatalogPage/Search/Search';
import { Attribute, Category, ProductsParams, SortType, isSortType } from '../../types/products';
import Categories from '../../components/CatalogPage/Categories/Categories';
import ProductParamBuilder from '../../data/Products/paramBuilder';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductsAPI from '../../api/products';
import Sort from '../../components/CatalogPage/Sort/Sort';
import { BreadcrumbLink } from '../../types/breadcrumb';
import Filters from '../../components/CatalogPage/Filters/Filters';
import productsToFilterData from '../../data/Filters/productsToFilterData';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function CatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType>('name.en-US asc');
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbLink[]>([]);

  const [attributes, setAttributes] = useState<Attribute[] | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number] | undefined>();
  const [, setPriceTimer] = useState<NodeJS.Timeout>();
  const [priceLimit, setPriceLimit] = useState<[number, number] | undefined>();

  const fetchHandler = (range?: [number, number]) => {
    const params: ProductsParams = {};

    params['text.en-US'] = searchParams.get('search') ?? '';
    params.sort = sortType;

    const filter: string[] = [];
    if (id) {
      filter.push(ProductParamBuilder.filter.category(id));
    }
    const price = range ?? priceRange;
    if (price) {
      filter.push(ProductParamBuilder.filter.centValueRange(price[0] * 100, price[1] * 100));
    }
    if (attributes) {
      attributes.forEach((attr) => {
        const { name } = attr;
        const values: string[] = [];
        Array.from(attr.values.entries()).forEach(([key, value]) => {
          if (value) {
            values.push(key);
          }
        });
        if (values.length > 0) {
          filter.push(ProductParamBuilder.filter.attribute(name, values));
        }
      });
    }
    params.filter = filter;
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    fetchHandler();
  }, [sortType, searchParams.get('search'), id, attributes]);

  const priceHandler = (min: number, max: number) => {
    if (
      priceLimit &&
      min >= priceLimit[0] &&
      min <= priceLimit[1] &&
      max >= priceLimit[0] &&
      max <= priceLimit[1] &&
      min < max
    ) {
      setPriceRange([min, max]);
      const timeout = setTimeout(() => {
        fetchHandler([min, max]);
      }, 1000);
      setPriceTimer((prev) => {
        clearTimeout(prev);
        return timeout;
      });
    }
  };

  const attributeHandler = (name: string, key: string, value: boolean) => {
    setAttributes((prev) => {
      if (prev) {
        let attrs = [...prev];
        attrs = attrs.map((attr) => {
          if (attr.name === name) {
            attr.values.set(key, value);
          }
          return attr;
        });
        return attrs;
      }
      return undefined;
    });
  };

  // Update attributes if they're undefined
  useEffect(() => {
    if (
      !products.loading &&
      products.error.length === 0 &&
      attributes === undefined &&
      priceRange === undefined &&
      priceLimit === undefined
    ) {
      const { attributes: attrs, minCentPrice, maxCentPrice } = productsToFilterData(products.products);
      setAttributes(attrs);
      const limits: [number, number] = [minCentPrice / 100, maxCentPrice / 100];
      setPriceLimit(limits);
      setPriceRange(limits);
    }
  }, [products]);

  // Reset and update attributes only if search query or category changes
  useEffect(() => {
    setAttributes(undefined);
    setPriceRange(undefined);
    setPriceLimit(undefined);
  }, [searchParams.get('search'), id]);

  // If category changes, update the breadcrumb
  useEffect(() => {
    if (id) {
      ProductsAPI.getCategoryById(id)
        .then((cat) => {
          const links: BreadcrumbLink[] = [{ name: cat.name['en-US'], to: `/category/${cat.id}` }];
          if (cat.parent) {
            ProductsAPI.getCategoryById(cat.parent.id).then((parent) => {
              links.unshift({ name: parent.name['en-US'], to: `/category/${parent.id}` });
              setBreadcrumb(links);
            });
          } else {
            setBreadcrumb(links);
          }
          ProductsAPI.getCategories(cat.id).then((ctgrs) => setCategories(ctgrs));
        })
        .catch(() => {
          setCategories(null);
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

  const resetHandler = () => {
    setAttributes((prev) => {
      if (prev) {
        const attrs = [...prev];
        attrs.forEach((attr) => {
          attr.values.forEach((_, key) => {
            attr.values.set(key, false);
          });
        });
        return attrs;
      }
      return undefined;
    });
    if (priceLimit) {
      setPriceRange([priceLimit[0], priceLimit[1]]);
    }
  };
  if (categories === null) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.catalog}>
      {categories && categories.length > 0 && <Categories categories={categories} />}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Filters
            attributes={attributes ?? []}
            onAttributeCheck={attributeHandler}
            priceLimits={priceLimit ?? [0, 0]}
            priceRange={priceRange ?? [0, 0]}
            onPriceChange={priceHandler}
            onReset={resetHandler}
          />
        </div>
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
