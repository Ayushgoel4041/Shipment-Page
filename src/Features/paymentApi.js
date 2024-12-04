import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";
import Cookies from "js-cookie";

export const createOrderId = createAsyncThunk(
  "baseUrl/createPayment",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "createPayment",
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

export const createRazorPayOrder = createAsyncThunk(
  "baseUrl/razorpayOrderCreate",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "razorpayOrderCreate",
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

const paymentApi = createSlice({
  name: "baseUrl",
  initialState: {
    error: null,
    loading: false,
    createOrder: null,
    razorPayOrder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.createOrder = action.payload?? "Failed to fetch Payment Order";
      })
      .addCase(createOrderId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createRazorPayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorPayOrder = action.payload ?? "Failed to fetch Razorpay Payment Order";
      })
      .addCase(createRazorPayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorPayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default paymentApi.reducer;