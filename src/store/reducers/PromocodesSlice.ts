import { createSlice } from '@reduxjs/toolkit';
import fetchActivePromocodes from '../async/PromocodesThunk';
import { Promocode } from '../../types/promocode';

type PromocodesState = { data: Promocode[] | null; loading: boolean; error: string };

const initialState: PromocodesState = {
  data: null,
  loading: true,
  error: '',
};

export const promocodesSlice = createSlice({
  name: 'promocodes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActivePromocodes.fulfilled, (_, action) => ({
        data: action.payload ? action.payload : null,
        loading: false,
        error: '',
      }))
      .addCase(fetchActivePromocodes.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        return newState;
      })
      .addCase(fetchActivePromocodes.rejected, (state, action) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = action.payload ? action.payload : 'Unexpected error occured';
        return newState;
      });
  },
});

export default promocodesSlice.reducer;
