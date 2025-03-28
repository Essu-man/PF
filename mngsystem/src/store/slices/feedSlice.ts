import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface FeedState {
  items: any[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FeedState = {
  items: [],
  loading: false,
  error: null
};

// Create the slice
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchFeedStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeedSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchFeedFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Export the actions and reducer
export const { fetchFeedStart, fetchFeedSuccess, fetchFeedFailure } = feedSlice.actions;
export default feedSlice.reducer;