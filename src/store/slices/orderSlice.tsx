import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASEURL } from '../store';

interface User {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: string;
}

export interface PersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: string;
  document_data: string;
}

export interface SeatInfo {
  coach_id: string;
  person_info: PersonInfo;
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
}

interface RouteDetails {
  route_direction_id: string;
  seats: SeatInfo[];
}

interface FetchOrderArgs {
  user: User;
  departure: RouteDetails;
  arrival?: RouteDetails;
}

interface FetchOrderResponse {
  status: boolean;
}

export interface SeatsPrices {
  price: number;
  type: 'adult' | 'child';
}

interface OrderState {
  user: User;
  departure: RouteDetails;
  arrival?: RouteDetails;
  loading: boolean;
  error: string | null;
  success: boolean;
  prices: SeatsPrices[];
}

const initialState: OrderState = {
  user: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: '',
  },
  departure: {
    route_direction_id: '',
    seats: [],
  },
  arrival: {
    route_direction_id: '',
    seats: [],
  },
  loading: false,
  error: null,
  success: false,
  prices: [],
};

export const fetchOrder = createAsyncThunk<
  FetchOrderResponse,
  FetchOrderArgs,
  { rejectValue: string }
>('order/fetchOrder', async (args, thunkAPI) => {
  try {
    const response = await fetch(`${BASEURL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при оформлении заказа на сервере');
    }

    const data: FetchOrderResponse = await response.json();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Неизвестная ошибка');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateDepartureSeats: (state, action: PayloadAction<SeatInfo[]>) => {
      state.departure.seats = action.payload;
    },
    updateArrivalSeats: (state, action: PayloadAction<SeatInfo[]>) => {
      if (state.arrival) {
        state.arrival.seats = action.payload;
      }
    },
    updateRouteDirectionId: (
      state,
      action: PayloadAction<{ type: 'departure' | 'arrival'; id: string }>
    ) => {
      const { type, id } = action.payload;
      if (type === 'departure') state.departure.route_direction_id = id;
      if (type === 'arrival' && state.arrival)
        state.arrival.route_direction_id = id;
    },
    updateOrder: <K extends keyof OrderState>(
      state: OrderState,
      action: PayloadAction<{ key: K; value: OrderState[K] }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Что-то пошло не так';
      });
  },
});

export const {
  updateOrder,
  updateDepartureSeats,
  updateArrivalSeats,
  updateRouteDirectionId,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
