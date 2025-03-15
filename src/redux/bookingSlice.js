import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetBooking: () => initialState
  }
});
export const { setBookingInfo, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;