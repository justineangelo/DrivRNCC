import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./reducers";

export { RootState };
export default configureStore({ reducer: rootReducer });
