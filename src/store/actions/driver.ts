import driverSlice, { fetchProfile } from "store/reducers/driverSlice";

const driverActions = driverSlice.actions;

export default { ...driverActions, fetchProfile };
