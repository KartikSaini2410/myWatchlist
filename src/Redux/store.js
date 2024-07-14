import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from "./Reducers/WatchList";
import AllMailReducer from './Reducers/AllMailReducer';

export const store = configureStore({
  reducer: {
    myLists: watchListReducer,
    allMail: AllMailReducer,
  },
})
