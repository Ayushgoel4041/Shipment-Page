import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";

export const requestOtp = createAsyncThunk(
  "otp/requestOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.request("otp", "requestOtp", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred."
      );
    }
  }
);

export const validateOtp = createAsyncThunk(
  "otp/validateOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.request("otp", "validateOtp", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred."
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: { 
    error: null,
    loading: false,
    user: null,
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
        state.error = action.payload || action.error.message;
      })
      .addCase(validateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isOtpValidate = true;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default otpSlice.reducer;
