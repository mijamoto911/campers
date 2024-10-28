import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ filters, page }, thunkAPI) => {
    try {
      const { data } = await axios.get('/campers', {
        params: {
          location: filters.location,
          page,
          limit: 4,
        },
      });
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/campers/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const bookCamper = createAsyncThunk(
  'campers/bookCamper',
  async (bookingData, thunkAPI) => {
    try {
      console.log(
        'Дані для бронювання перед відправкою:',
        JSON.stringify(bookingData)
      );
      const { data } = await axios.post(`/bookings`, bookingData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error) {
      console.error(
        'Помилка при бронюванні:',
        error.response?.data || error.message
      );
      console.error(
        'Деталі помилки від сервера:',
        JSON.stringify(error.response?.data)
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
