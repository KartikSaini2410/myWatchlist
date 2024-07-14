import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = [];

export const watchListSlice = createSlice({
  name: 'addMail',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = watchListSlice.actions;

export default watchListSlice.reducer;
