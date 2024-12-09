import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";
import Cookies from "js-cookie";

export const kycUpload = createAsyncThunk(
  "baseUrl/kycDocUpload",
  async (data, { rejectWithValue }) => {
    // const token = Cookies.get("BearerToken" || "");
    // if (!token) {
    //   return rejectWithValue("No token found. Please log in.");
    // }
    try {
      const response = await apiService.request(
        "baseUrl",
        "kycDocUpload",
        data,
        null,
       null,
      );
      return response; // Return the API response
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const gstRequestOtp = createAsyncThunk(
  "baseUrl/gstRequestOtp",
  async (data, { rejectWithValue }) => {
    // const token = Cookies.get("BearerToken" || "");
    // if (!token) {
    //   return rejectWithValue("No token found. Please log in.");
    // }
    try {
      const response = await apiService.request(
        "baseUrl",
        "gstRequestOtp",
        data,
        null,
        null,
      );
      return response; // Return the API response
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);
export const gstValidateOtp = createAsyncThunk(
  "baseUrl/gstValidateOtp",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "gstValidateOtp",
        data,
        null,
        {
          Authorization: token ? `Bearer ${token}` : "", // Add token to Authorization header
        }
      );
      return response; // Return the API response
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);

const gstSliceApi = createSlice({
  name: "baseUrl",
  initialState: {
    error: null,
    loading: false,
    kycUploadData: null,
    gstRequestOtpData: null,
    gstValidateOtpData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kycUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.kycUploadData = action.payload ?? "Failed to fetch gst Upload";
      })
      .addCase(kycUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(kycUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      //request otp
      .addCase(gstRequestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.gstRequestOtpData =
          action.payload ?? "Failed to fetch gst Upload";
      })
      .addCase(gstRequestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gstRequestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      //validate otp
      .addCase(gstValidateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.gstValidateOtpData =
          action.payload ?? "Failed to fetch gst Upload";
      })
      .addCase(gstValidateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gstValidateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default gstSliceApi.reducer;
