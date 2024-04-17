import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import api from "api";
import { Location, ResponseError, Ride } from "interfaces";
import ride from "store/actions/ride";

export const fetchRidesNearMe = createAsyncThunk<Ride[] | ResponseError, Location>("ride/fetchRidesNearMe", async (location, thunkAPI) => {
  const rides = await api.fetchRidesNearMe(location);
  const pickupLocations = rides.map((r) => r.pickupLocation!);
  const destinationLocations = rides.map((r) => r.destination!);
  const [driverToPickup, pickupToDestination] = await Promise.all([api.fetchMapsDistanceMatrix([location], pickupLocations), api.fetchMapsDistanceMatrix(pickupLocations, destinationLocations)]);

  rides.forEach((r, i) => {
    r.pickupLocation!.name = pickupToDestination.origin_addresses![i];
    r.destination!.name = pickupToDestination.destination_addresses![i];
    r.driverToPickupDistance = driverToPickup.rows![0].elements![i].distance!.value;
    r.driverToPickupDistanceReadable = driverToPickup.rows![0].elements![i].distance!.text;
    r.driverToPickupDuration = driverToPickup.rows![0].elements![i].duration!.value;
    r.driverToPickupDurationReadable = driverToPickup.rows![0].elements![i].duration!.text;
    r.pickupToDestinationDistance = pickupToDestination.rows![i].elements![i].distance!.value;
    r.pickupToDestinationDistanceReadable = pickupToDestination.rows![i].elements![i].distance!.text;
    r.pickupToDestinationDuration = pickupToDestination.rows![i].elements![i].duration!.value;
    r.pickupToDestinationDurationReadable = pickupToDestination.rows![i].elements![i].duration!.text;
  });
  return rides;
});

export interface RideState {
  isOnline?: boolean;
  list?: Ride[];
  isLoading?: boolean;
  error?: string;
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
    selectIsLoading: (state) => {
      return state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRidesNearMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRidesNearMe.fulfilled, (state, action) => {
      if (action.payload instanceof Array) {
        state.list = action.payload;
      } else {
        state.error = action.payload.data;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchRidesNearMe.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default requestSlice;
