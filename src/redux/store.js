import apartmentReducer from './slices/apartment';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
  },
});
