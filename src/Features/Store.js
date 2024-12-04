import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./OtpSlice";
import CommonApi from "./CommonApi";
import shipmentApi from "./shipmentApi";
import paymentApi from "./paymentApi";
import gstSlice from "./gstSlice";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    commonApi: CommonApi,
    shipmentApi: shipmentApi,
    paymentApi: paymentApi,
    gstSlice: gstSlice,
    //add more reducers
  },
});
