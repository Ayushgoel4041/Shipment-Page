import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";

export const requestOtp = createAsyncThunk("otp/requestOtp", async (data) => {
  return await apiService.request("otp", "requestOtp", data);
});

export const validateOtp = createAsyncThunk("otp/validateOtp", async (data) => {
  return await apiService.request("otp", "validateOtp", data);
});

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    error: null,
    loading: false,
    isOtpRequest: false,
    isOtpValidate: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.fulfilled, (state) => {
        state.loading = false;
        state.isOtpRequest = true;
      })
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(validateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state) => {
        state.loading = false;
        state.isOtpValidate = true;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default otpSlice.reducer;
