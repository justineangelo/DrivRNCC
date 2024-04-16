import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DriverState {
  firstName?: string;
  lastName?: string;
  rating?: number;
  isOnline?: boolean;
}

const initialState: DriverState = {};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DriverState>) => {
      state = action.payload;
    },
  },
  selectors: {
    selectRating: (state) => {
      return state.rating;
    },
    selectName: (state) => {
      if (state.firstName && state.lastName) {
        return state.firstName + state.lastName;
      }
      return undefined;
    },
  },
});

export default driverSlice;
