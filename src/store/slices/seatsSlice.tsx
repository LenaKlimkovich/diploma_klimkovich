import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../store';

export interface Seat {
  index: number;
  available: boolean;
}

export interface CoachDetails {
  _id: string;
  name: string;
  class_type: string;
  have_firts_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_foorth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
}

export interface WagonData {
  coach: CoachDetails;
  seats: Seat[];
}

type FetchSeatsResponse = WagonData[];

export interface SeatsState {
  departure: FetchSeatsResponse;
  arrival: FetchSeatsResponse;
  loading: boolean;
  error: string | null;
}

const initialState: SeatsState = {
  departure: [],
  arrival: [],
  loading: false,
  error: null,
};

interface FetchSeatsArgs {
  _id: string;
  direction: 'departure' | 'arrival';
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  have_air_conditioning?: boolean;
  have_express?: boolean;
}

export const fetchSeats = createAsyncThunk<
  { data: FetchSeatsResponse; direction: 'departure' | 'arrival' },
  FetchSeatsArgs,
  { rejectValue: string }
>('seats/fetchSeats', async (args, thunkAPI) => {
  try {
    const { _id, direction, ...filters } = args;

    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value === true) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const url = `${BASEURL}/routes/${_id}/seats${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Ошибка сервера: ${response.status} ${response.statusText}`
      );
    }

    const data: FetchSeatsResponse = await response.json();
    return { data, direction };
  } catch (err) {
    console.error('Ошибка при загрузке билетов:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Не удалось загрузить маршруты';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.loading = false;
        const { data, direction } = action.payload;
        state[direction] = data;
      })
      .addCase(fetchSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export default seatsSlice.reducer;
