import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api";
import { Location, Profile, Ride } from "interfaces";

export const fetchProfile = createAsyncThunk<Profile>("driver/fetchProfile", async () => {
  return await api.fetchProfile();
});

export interface DriverState {
  isOnline?: boolean;
  profile?: Profile;
  isProfileLoading?: boolean;
  location?: Location;
  selecteRideId?: string;
  error?: string | null;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.isProfileLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isProfileLoading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.error = action.error.message;
      state.isProfileLoading = false;
    });
  },
});

export default driverSlice;
