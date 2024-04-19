import homeSlice, { fetchRidesNearMe } from "store/reducers/homeSlice";

const homeActions = { ...homeSlice.actions, fetchRidesNearMe };

export default homeActions;
