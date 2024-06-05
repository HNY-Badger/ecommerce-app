import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as styles from './CatalogPage.module.css';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { Attribute, Category, ProductsParams, SortType, isSortType } from '../../types/products';
import ProductParamBuilder from '../../data/Products/paramBuilder';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductsAPI from '../../api/products';
import { BreadcrumbLink } from '../../types/breadcrumb';
import productsToFilterData from '../../data/Filters/productsToFilterData';
import Spinner from '../../components/Spinner/Spinner';
import { refreshCart } from '../../store/async/CartThunk';
import Pagination from '../../pageComponents/CatalogPage/Pagination/Pagination';
import Categories from '../../pageComponents/CatalogPage/Categories/Categories';
import Filters from '../../pageComponents/CatalogPage/Filters/Filters';
import Sort from '../../pageComponents/CatalogPage/Sort/Sort';
import Search from '../../pageComponents/CatalogPage/Search/Search';
import Products from '../../pageComponents/CatalogPage/Products/Products';

const productsOnPage = 10;

function CatalogPage() {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.productsReducer);

  // Refresh cart if its hasn't been fetched yet
  const cartState = useAppSelector((state) => state.cartReducer);
  useEffect(() => {
    if ((!cartState.data && !cartState.loading) || cartState.error.length > 0) {
      dispatch(refreshCart());
    }
  }, [cartState]);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType>('name.en-US asc');
  const [categories, setCategories] = useState<Category[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbLink[]>([]);

  const [attributes, setAttributes] = useState<Attribute[] | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number] | undefined>();
  const [, setPriceTimer] = useState<NodeJS.Timeout>();
  const [priceLimit, setPriceLimit] = useState<[number, number] | undefined>();
  const [page, setPage] = useState<number>(0);

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
    params.limit = productsOnPage;
    params.offset = productsOnPage * page;
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    fetchHandler();
  }, [sortType, page]);

  useEffect(() => {
    setPage(0);
    fetchHandler();
  }, [searchParams.get('search'), attributes, id]);

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
        setPage(0);
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
      !productsState.loading &&
      productsState.error.length === 0 &&
      attributes === undefined &&
      priceRange === undefined &&
      priceLimit === undefined
    ) {
      const params: ProductsParams = {
        limit: 300,
      };
      params['text.en-US'] = searchParams.get('search') ?? '';
      if (id) {
        params.filter = [ProductParamBuilder.filter.category(id)];
      }
      ProductsAPI.getProducts(params)
        .then((data) => {
          const { attributes: attrs, minCentPrice, maxCentPrice } = productsToFilterData(data.products);
          setAttributes(attrs);
          const limits: [number, number] = [minCentPrice / 100, maxCentPrice / 100];
          setPriceLimit(limits);
          setPriceRange(limits);
        })
        .catch(() => {
          setAttributes([]);
          const limits: [number, number] = [0, 0];
          setPriceLimit(limits);
          setPriceRange(limits);
        });
    }
  }, [productsState]);

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
          setCategories([]);
        });
    } else {
      setBreadcrumb([]);
      ProductsAPI.getCategories().then((ctgrs) => setCategories(ctgrs));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
          {productsState.loading ? (
            <div className={styles.spinner_wrapper}>
              <Spinner width="200px" />
            </div>
          ) : (
            <>
              <Products />
              <Pagination
                currentPage={page}
                onPageChange={(clickedPage) => setPage(clickedPage)}
                totalPages={Math.ceil(productsState.data.total / productsOnPage)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
