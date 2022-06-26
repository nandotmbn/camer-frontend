/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';

export const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    name: "",
    lastUpdate: ""
  },
  reducers: {
    changeApartmentComplete: (state, action) => {
      state.name = action.payload.name;
      state.lastUpdate = action.payload.lastUpdate;
    },
  },
});

export const {changeApartmentComplete} = apartmentSlice.actions;
export const getApartment = state => state;
export default apartmentSlice.reducer;
