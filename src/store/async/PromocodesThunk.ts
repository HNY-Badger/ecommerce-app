import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../../types/api';
import PromocodeAPI from '../../api/promocode';
import { Promocode } from '../../types/promocode';

const fetchActivePromocodes = createAsyncThunk<Promocode[] | undefined, void, { rejectValue: string | undefined }>(
  'promocodes/fetchActivePromocodes',
  async (_, thunkAPI) =>
    PromocodeAPI.getActivePromocodes()
      .then((resp) => resp.results)
      .catch((e: AxiosError<APIErrorResponse>) => thunkAPI.rejectWithValue(e.response?.data.message))
);

export default fetchActivePromocodes;
