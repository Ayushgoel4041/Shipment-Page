import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./OtpSlice";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    //add more reducers
  },
});
