import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./redux/bookingSlice";
export const store = configureStore({
  reducer:{
    booking: bookingReducer
  }
})