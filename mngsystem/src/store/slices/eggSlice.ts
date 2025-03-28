import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EggProduction } from '../../types/Egg';

interface EggState {
  productions: EggProduction[];
  loading: boolean;
  error: string | null;
}

const initialState: EggState = {
  productions: [],
  loading: false,
  error: null
};

const eggSlice = createSlice({
  name: 'eggs',
  initialState,
  reducers: {
    addEggProduction: (state, action: PayloadAction<EggProduction>) => {
      state.productions.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { addEggProduction, setLoading, setError } = eggSlice.actions;
export default eggSlice.reducer;