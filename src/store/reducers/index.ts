import { combineReducers } from "redux";
import driverSlice from "./driverSlice";
import homeSlice from "./homeSlice";

export default combineReducers({ driver: driverSlice.reducer, home: homeSlice.reducer });
