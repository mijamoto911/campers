import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/campersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['campers/getCampers/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload'],
        ignoredPaths: ['items'],
      },
    }),
});
