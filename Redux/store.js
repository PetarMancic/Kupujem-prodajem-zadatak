import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './adsSlice';

export const store = configureStore({
  reducer: {
    ads: adsReducer,  
  },
});
