import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api";
import { Location, MapRegion, ResponseError, Ride, RideStatus } from "interfaces";
import { calculateFareFromDistance } from "utils";

export const fetchRidesNearMe = createAsyncThunk<Ride[] | ResponseError, Location>("home/fetchRidesNearMe", async (location, thunkAPI) => {
  const rides = await api.fetchRidesNearMe(location);
  if (!(rides instanceof Array)) {
    return rides as ResponseError;
  }
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
    if (r.pickupToDestinationDistance) {
      r.estimatedFare = calculateFareFromDistance(r.pickupToDestinationDistance / 1_000);
    }
  });
  return rides;
});

export interface HomeState {
  isOnline?: boolean;
  isLoading?: boolean;
  mapRegion?: MapRegion;
  rides?: Ride[];
  error?: string;
}

const initialState: HomeState = {};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setMapRegion: (state, action: PayloadAction<MapRegion>) => {
      state.mapRegion = action.payload;
    },
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
    setRideStatus: (state, action: PayloadAction<{ id: string; status: RideStatus; driverId?: string }>) => {
      const index = state.rides?.findIndex((ride) => ride.id === action.payload.id);

      if (index != undefined) {
        state.rides![index].status = action.payload.status;
        if (action.payload.status === "accepted" && action.payload.driverId) {
          state.rides![index].driverId = action.payload.driverId;
        }
      }
    },
  },
  selectors: {
    selectIsOnline: (state) => {
      return state.isOnline;
    },
    selectMapRegion: (state) => {
      return state.mapRegion;
    },
    selectAvailableRides: (state, driverId?: string) => {
      if (!state.isLoading && state.isOnline) {
        const acceptedRide = driverId && state.rides?.find((ride) => ride.status === "accepted" && ride.driverId === driverId);

        if (acceptedRide) {
          return [acceptedRide];
        }
        return state.rides?.filter((r) => r.status === "pending");
      }
      return undefined;
    },
    selectIsLoading: (state) => {
      return state.isLoading;
    },
    selectRideById: (state, rideId?: string) => {
      return state.rides?.find((ride) => ride.id == rideId);
    },
    selectError: (state) => {
      return state.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRidesNearMe.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchRidesNearMe.fulfilled, (state, action) => {
      if (action.payload instanceof Array) {
        state.rides = action.payload;
      } else {
        console.log("error: ", action.payload.data, " - ", action.payload.url);
        state.rides = undefined;
        state.error = action.payload.data;
        state.isOnline = false;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchRidesNearMe.rejected, (state, action) => {
      console.log("error: ", action.error);
      state.error = action.error.message;
      state.isOnline = false;
      state.isLoading = false;
    });
  },
});

export default homeSlice;
