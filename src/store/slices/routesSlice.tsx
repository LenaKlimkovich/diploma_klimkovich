import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASEURL } from '../store';

export interface CityDetail {
  _id: string;
  name: string;
}

export interface PartRouteInfo {
  railway_station_name: string;
  city: CityDetail;
  datetime: number;
}

export interface ClassPrice {
  price?: number;
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
}

export interface PriceInfo {
  first?: ClassPrice;
  second?: ClassPrice;
  third?: ClassPrice;
  fourth?: ClassPrice;
}

export interface AvailableSeatsInfo {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface TrainDetail {
  _id: string;
  name: string;
}

export interface RouteDetail {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info?: AvailableSeatsInfo;
  train: TrainDetail;
  from: PartRouteInfo;
  to: PartRouteInfo;
  price_info?: PriceInfo;
}

export interface Route {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info?: AvailableSeatsInfo;
  departure: RouteDetail;
  arrival?: RouteDetail | null;
}

interface FetchRoutesResponse {
  total_count: number;
  items: Route[];
  limit?: number;
  offset?: number;
}

interface FetchRoutesArg {
  from_city_id: string;
  to_city_id: string;
  date_start?: string;
  date_end?: string;
  date_start_arrival?: string;
  date_end_arrival?: string;
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  have_express?: boolean;
  have_air_conditioning?: boolean;
  price_from?: number | null;
  price_to?: number | null;
  start_departure_hour_from?: number;
  start_departure_hour_to?: number;
  start_arrival_hour_from?: number;
  start_arrival_hour_to?: number;
  end_departure_hour_from?: number;
  end_departure_hour_to?: number;
  end_arrival_hour_from?: number;
  end_arrival_hour_to?: number;
  limit?: number;
  offset?: number;
  sort?: string;
}

export type SortOption = 'time' | 'value' | 'duration';

export interface RoutesState {
  selectedRoute: any;
  fromName: string;
  fromId: string;
  toName: string;
  toId: string;
  dateStart: string | '';
  dateEnd: string | '';
  date_start_arrival: string | '';
  date_end_arrival: string | '';
  isSearched: boolean;
  total_count: number;
  items: Route[];
  loading: boolean;
  error: boolean;
  sortBy: SortOption;
  limit: number;
  offset: number;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_express: boolean;
  price_from: number | null;
  price_to: number | null;
  start_departure_hour_from: number;
  start_departure_hour_to: number;
  start_arrival_hour_from: number;
  start_arrival_hour_to: number;
  end_departure_hour_from: number;
  end_departure_hour_to: number;
  end_arrival_hour_from: number;
  end_arrival_hour_to: number;
}

const initialState: RoutesState = {
  selectedRoute: null,
  fromName: '',
  fromId: '',
  toName: '',
  toId: '',
  dateStart: '',
  dateEnd: '',
  date_start_arrival: '',
  date_end_arrival: '',
  isSearched: false,
  total_count: 0,
  items: [],
  loading: false,
  error: false,
  sortBy: 'time',
  limit: 5,
  offset: 0,
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_express: false,
  price_from: null,
  price_to: null,
  start_departure_hour_from: 0,
  start_departure_hour_to: 24,
  start_arrival_hour_from: 0,
  start_arrival_hour_to: 24,
  end_departure_hour_from: 0,
  end_departure_hour_to: 24,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 24,
};

const sortRoutes = (items: any[], sortBy: SortOption) => {
  return [...items].sort((a, b) => {
    if (sortBy === 'time') {
      const valA = a.departure.from.datetime;
      const valB = b.departure.from.datetime;

      const timeA =
        typeof valA === 'number' && valA < 99999999999 ? valA * 1000 : valA;
      const timeB =
        typeof valB === 'number' && valB < 99999999999 ? valB * 1000 : valB;

      return new Date(timeA).getTime() - new Date(timeB).getTime();
    }
    if (sortBy === 'value') {
      return a.departure.min_price - b.departure.min_price;
    }
    if (sortBy === 'duration') {
      return a.departure.duration - b.departure.duration;
    }
    return 0;
  });
};

export const fetchRoutes = createAsyncThunk<
  FetchRoutesResponse,
  FetchRoutesArg,
  { rejectValue: string }
>(
  'routes/fetchRoutes',
  async (
    {
      from_city_id,
      to_city_id,
      date_start,
      date_end,
      date_start_arrival,
      date_end_arrival,
      limit,
      offset,
      ...filters
    },
    thunkAPI
  ) => {
    const searchParams = new URLSearchParams({
      from_city_id,
      to_city_id,
    });

    try {
      if (date_start && date_start.trim() !== '') {
        let formattedDate = new Date(
          Number(date_start) * 1000
        ).toLocaleDateString('en-CA');
        searchParams.append('date_start', formattedDate);
      }

      if (date_end && date_end.trim() !== '') {
        let formattedDate = new Date(
          Number(date_end) * 1000
        ).toLocaleDateString('en-CA');
        searchParams.append('date_end', formattedDate);
      }

      if (date_start_arrival && date_start_arrival.trim() !== '') {
        let formattedDate = new Date(
          Number(date_start_arrival) * 1000
        ).toLocaleDateString('en-CA');
        searchParams.append('date_start_arrival', formattedDate);
      }

      if (date_end_arrival && date_end_arrival.trim() !== '') {
        let formattedDate = new Date(
          Number(date_end_arrival) * 1000
        ).toLocaleDateString('en-CA');
        searchParams.append('date_end_arrival', formattedDate);
      }

      if (limit) searchParams.append('limit', String(limit));
      if (offset !== undefined) searchParams.append('offset', String(offset));

      Object.entries(filters).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== false &&
          value !== '' &&
          value !== null
        ) {
          searchParams.append(key, String(value));
        }
      });

      const url = `${BASEURL}/routes?${searchParams.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Ошибка сервера: ${response.status} ${response.statusText}`
        );
      }

      const data: FetchRoutesResponse = await response.json();
      return data;
    } catch (err: any) {
      console.error('Ошибка при загрузке билетов:', err);
      return thunkAPI.rejectWithValue(
        err.message || 'Не удалось загрузить маршруты'
      );
    }
  }
);

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        name:
          | 'fromName'
          | 'toName'
          | 'dateStart'
          | 'dateEnd'
          | 'fromId'
          | 'toId'
          | 'date_start_arrival'
          | 'date_end_arrival';
        value: string;
      }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
      state.isSearched = false;
    },
    selectCity: (
      state,
      action: PayloadAction<{ type: 'from' | 'to'; name: string; id: string }>
    ) => {
      const { type, name, id } = action.payload;
      if (type === 'from') {
        state.fromName = name;
        state.fromId = id;
      } else {
        state.toName = name;
        state.toId = id;
      }
    },
    changeDirections: (state) => {
      const tempName = state.fromName;
      state.fromName = state.toName;
      state.toName = tempName;

      const tempId = state.fromId;
      state.fromId = state.toId;
      state.toId = tempId;
    },
    setSearched: (state, action: PayloadAction<boolean>) => {
      state.isSearched = action.payload;
    },
    toggleFilter: (
      state,
      action: PayloadAction<
        | 'have_first_class'
        | 'have_second_class'
        | 'have_third_class'
        | 'have_fourth_class'
        | 'have_wifi'
        | 'have_express'
      >
    ) => {
      const key = action.payload;
      state[key] = !state[key];
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      const [min, max] = action.payload;
      state.price_from = min;
      state.price_to = max;
    },
    setTimeRange: (
      state,
      action: PayloadAction<{
        name: keyof RoutesState;
        range: [number, number];
      }>
    ) => {
      const { name, range } = action.payload;

      const fromValue = Math.floor(range[0] / 60);
      const toValue = Math.floor(range[1] / 60);

      const fromKey = `${name.toString()}_from` as keyof RoutesState;
      const toKey = `${name.toString()}_to` as keyof RoutesState;
      (state as Record<keyof RoutesState, any>)[fromKey] = fromValue;
      (state as Record<keyof RoutesState, any>)[toKey] = toValue;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
      state.items = sortRoutes(state.items, action.payload);
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setOffSet(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    addRoutes: (state, action: PayloadAction<Route[]>) => {
      state.items = sortRoutes(action.payload, state.sortBy);
      state.error = false;
    },
    clearRoutes: (state) => {
      state.items = [];
      state.total_count = 0;
      state.error = false;
    },
    setSelectedRoute: (state, action: PayloadAction<any>) => {
      state.selectedRoute = action.payload;
    },
    clearSelectedRoute: (state) => {
      state.selectedRoute = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.dateStart = action.meta.arg.date_start || '';
        state.dateEnd = action.meta.arg.date_end || '';
        state.date_start_arrival = action.meta.arg.date_start_arrival || '';
        state.date_end_arrival = action.meta.arg.date_end_arrival || '';
      })
      .addCase(
        fetchRoutes.fulfilled,
        (state, action: PayloadAction<FetchRoutesResponse>) => {
          state.loading = false;
          state.total_count = action.payload.total_count;
          const rawItems = JSON.parse(
            JSON.stringify(action.payload.items || [])
          );

          const normalizedItems = rawItems.map((item: any) => {
            if (item.departure) {
              return {
                ...item,
                have_first_class: item.departure.have_first_class,
                have_second_class: item.departure.have_second_class,
                have_third_class: item.departure.have_third_class,
                have_fourth_class: item.departure.have_fourth_class,
                have_wifi: item.departure.have_wifi,
                have_air_conditioning: item.departure.have_air_conditioning,
                is_express: item.departure.is_express,
              };
            }
            if (item.arrival) {
              return {
                ...item,
                have_first_class: item.arrival.have_first_class,
                have_second_class: item.arrival.have_second_class,
                have_third_class: item.arrival.have_third_class,
                have_fourth_class: item.arrival.have_fourth_class,
                have_wifi: item.arrival.have_wifi,
                have_air_conditioning: item.arrival.have_air_conditioning,
                is_express: item.arrival.is_express,
              };
            }
            return item;
          });
          const sorted = normalizedItems.sort((a: any, b: any) => {
            return a.departure.from.datetime - b.departure.from.datetime;
          });
          state.items = sorted;
        }
      )
      .addCase(fetchRoutes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  updateField,
  setSearched,
  selectCity,
  changeDirections,
  setSortBy,
  toggleFilter,
  setPriceRange,
  setTimeRange,
  setLimit,
  setOffSet,
  addRoutes,
  clearRoutes,
  setSelectedRoute,
  clearSelectedRoute,
} = routesSlice.actions;
export default routesSlice.reducer;
