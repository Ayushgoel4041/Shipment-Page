import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./OtpSlice";
import CommonApi from "./CommonApi";
import shipmentApi from "./shipmentApi";
import paymentApi from "./paymentApi";
import gstSlice from "./gstSlice";
import shipmentOrderApi from "./shipmentOrderApi";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    commonApi: CommonApi,
    shipmentApi: shipmentApi,
    paymentApi: paymentApi,
    gstSlice: gstSlice,
    shipmentOrderApi: shipmentOrderApi,
    //add more reducers
  },
});
