import { configureStore } from '@reduxjs/toolkit';
import eggReducer from './slices/eggSlice';
import feedReducer from './slices/feedSlice';
import medicationReducer from './slices/medicationSlice';

export const store = configureStore({
  reducer: {
    eggs: eggReducer,
    feed: feedReducer,
    medications: medicationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;