import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./OtpSlice";
import CommonApi from "./CommonApi";
import shipmentApi from "./shipmentApi";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    commonApi: CommonApi,
    shipmentApi:shipmentApi,
    //add more reducers
  },
});
