import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import routesReducer from './slices/routesSlice';
import seatsReducer from './slices/seatsSlice';
import orderSlice from './slices/orderSlice';

export const BASEURL = 'https://students.netoservices.ru/fe-diplom';

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    seats: seatsReducer,
    order: orderSlice,
  },
});
