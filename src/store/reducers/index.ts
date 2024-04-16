import { combineReducers } from "redux";
import driverSlice, { DriverState } from "./driverSlice";
import rideSlice, { RideState } from "./rideSlice";

export interface RootState {
  driver: DriverState;
  ride: RideState;
}

export default combineReducers({ driver: driverSlice.reducer, ride: rideSlice.reducer });
