// // store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './slices/apiSlice';

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
// });

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice"; 
import authReducer from './slices/stateSlices/authSlice'
import { playlistSlice } from "./slices/rtkSlices/playlistSlice";
import playlistSliceState from "./slices/stateSlices/playlistSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.name]: apiSlice.reducerPath,
    [playlistSlice.reducerPath]: playlistSlice.reducer,
    auth: authReducer,
    playlist:playlistSliceState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
