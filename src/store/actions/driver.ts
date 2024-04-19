import driverSlice, { fetchProfile } from "store/reducers/driverSlice";

const driverActions = { ...driverSlice.actions, fetchProfile };

export default driverActions;
