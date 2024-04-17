import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api";
import { Location, Profile } from "interfaces";

export const fetchProfile = createAsyncThunk<Profile>("driver/fetchProfile", async () => {
  return await api.fetchProfile();
});

export interface DriverState {
  isLoading?: boolean;
  profile?: Profile;
  location?: Location;
}

const initialState: DriverState = {};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  selectors: {
    selectRating: (state) => {
      return state.profile?.rating;
    },
    selectName: (state) => {
      return state.profile?.name;
    },
    selectCurrentLocation: (state) => {
      return state.location;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
  },
});

export default driverSlice;
