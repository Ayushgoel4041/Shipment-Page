import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";
import Cookies from "js-cookie";

export const createFromWarehouse = createAsyncThunk(
  "baseUrl/createWarehouse",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "createWarehouse",
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
export const createToWarehouse = createAsyncThunk(
  "baseUrl/createToWarehouse",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "createWarehouse",
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

export const createOrderApi = createAsyncThunk(
  "baseUrl/orders",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "orders",
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

export const orderShipmentAssociationApi = createAsyncThunk(
  "baseUrl/orderShipmentAssociation",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("BearerToken" || "");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const response = await apiService.request(
        "baseUrl",
        "orderShipmentAssociation",
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

const shipmentOrderApi = createSlice({
  name: "baseUrl",
  initialState: {
    fromWareHouseData: null,
    toWareHouseData: null,
    createOrderData: null,
    orderShipmentAssociation: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createFromWarehouse.fulfilled, (state, action) => {
        state.fromWareHouseData =
          action.payload ?? "Failed to fetch warehouse data";
      })
      .addCase(createToWarehouse.fulfilled, (state, action) => {
        state.toWareHouseData =
          action.payload ?? "Failed to fetch warehouse data";
      })

      .addCase(createOrderApi.fulfilled, (state, action) => {
        state.createOrderData =
          action.payload ?? "Failed to fetch create order data";
      })
      .addCase(orderShipmentAssociationApi.fulfilled, (state, action) => {
        state.orderShipmentAssociation =
          action.payload ?? "Failed to fetch order shipment association data";
      });
  },
});

export default shipmentOrderApi.reducer;
