import rideSlice, { fetchRidesNearMe } from "store/reducers/rideSlice";

const rideActions = rideSlice.actions;

export default { ...rideActions, fetchRidesNearMe };
