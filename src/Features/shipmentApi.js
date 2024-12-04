import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiServices";

export const getFramelessShipment = createAsyncThunk(
  "cargoUrl/framelessShipment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.request(
        "cargoUrl",
        "framelessShipment",
        data,
        null,
        null
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

export const shipmentCharge = createAsyncThunk(
  "cargoUrl/charges",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.request(
        "cargoUrl",
        "charges",
        data,
        null,
        null
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

const shipmentApi = createSlice({
  name: "cargoUrl",
  initialState: {
    userFramelessData: null,
    chargesData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFramelessShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFramelessShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.userFramelessData = action.payload;
      })
      .addCase(getFramelessShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch frameless shipment";
      })

      .addCase(shipmentCharge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shipmentCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.chargesData = action.payload;
      })
      .addCase(shipmentCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch shipment charges";
      });
  },
});

export default shipmentApi.reducer;
