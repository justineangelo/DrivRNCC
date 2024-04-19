import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api";
import { Location, Profile, ResponseError } from "interfaces";

export const fetchProfile = createAsyncThunk<Profile>("driver/fetchProfile", async () => {
  return await api.fetchProfile();
});

export interface DriverState {
  profile?: Profile;
  isProfileLoading?: boolean;
  location?: Location;
  selecteRideId?: string;
  error?: string;
}

const initialState: DriverState = {};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    setSelectedRideId: (state, action: PayloadAction<string | undefined>) => {
      state.selecteRideId = action.payload;
    },
  },
  selectors: {
    selectDriverId: (state) => {
      return state.profile?.driverId;
    },
    selectRating: (state) => {
      return state.profile?.rating;
    },
    selectName: (state) => {
      return state.profile?.name;
    },
    selectCurrentLocation: (state) => {
      return state.location;
    },
    selectSelectedRideId: (state) => {
      return state.selecteRideId;
    },
    selectError: (state) => {
      return state.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.error = undefined;
      state.isProfileLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      if (action.payload.driverId) {
        state.profile = action.payload;
      } else {
        state.profile = undefined;
        state.error = (action.payload as ResponseError).data;
      }
      state.isProfileLoading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.error = action.error.message;
      state.isProfileLoading = false;
    });
  },
});

export default driverSlice;
