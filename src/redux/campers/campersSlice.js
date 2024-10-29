import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById, bookCamper } from './campersOperations';

export const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    filters: {
      location: '',
      AC: false,
      kitchen: false,
      TV: false,
      bathroom: false,
      form: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    appendCampers: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.page += 1;
    },
    resetBookingSuccess(state) {
      state.bookingStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.camperDetails = action.payload;
        state.loading = false;
      })
      .addCase(bookCamper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookCamper.fulfilled, (state) => {
        state.bookingSuccess = 'Booking successful!';
        state.loading = false;
      })
      .addCase(bookCamper.rejected, (state, action) => {
        state.bookingSuccess = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCampers, resetBookingSuccess, appendCampers } =
  campersSlice.actions;
export default campersSlice.reducer;
