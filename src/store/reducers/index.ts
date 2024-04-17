import { combineReducers } from "redux";
import driverSlice from "./driverSlice";
import rideSlice from "./rideSlice";

export default combineReducers({ driver: driverSlice.reducer, ride: rideSlice.reducer });
