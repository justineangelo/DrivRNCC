import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "interfaces";

export interface RideState {
  isOnline?: boolean;
  list?: Ride[];
}

const initialState: RideState = {};

const requestSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.list = action.payload;
    },
  },
  selectors: {
    selectIsOnline: (state) => {
      return state.isOnline;
    },
    selectPendingRides: (state) => {
      return state.list?.filter((r) => r.status === "pending");
    },
  },
});

export default requestSlice;
