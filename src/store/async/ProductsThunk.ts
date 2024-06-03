import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ProductsData, ProductsParams } from '../../types/products';
import ProductsAPI from '../../api/products';
import { APIErrorResponse } from '../../types/api';

const fetchProducts = createAsyncThunk<ProductsData | undefined, ProductsParams, { rejectValue: string | undefined }>(
  'products/fetchProducts',
  async (params: ProductsParams, thunkAPI) => {
    try {
      const resp = await ProductsAPI.getProducts(params);
      return resp;
    } catch (e) {
      const err = e as AxiosError<APIErrorResponse>;
      thunkAPI.rejectWithValue(err.response?.data.message);
      return undefined;
    }
  }
);

export default fetchProducts;
