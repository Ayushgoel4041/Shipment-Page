import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";
import Cookies from "js-cookie";

export const getLocationFromPincode = createAsyncThunk(
  "baseUrl/getLocationFromPincode",
  async (data, { rejectWithValue }) => {
    const params = {
      pincode: data,
      is_frameless: true,
    };
    const token = Cookies.get("BearerToken" || "");

    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "getLocationFromPincode",
        null,
        params,
        {
          Authorization: token ? `Bearer ${token}` : "", // Add token to Authorization header
          // Referer: "http://localhost:8000/",
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred."
      );
    }
  }
);

const commonApi = createSlice({
  name: "baseUrl",
  initialState: {
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocationFromPincode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getLocationFromPincode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocationFromPincode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default commonApi.reducer;
