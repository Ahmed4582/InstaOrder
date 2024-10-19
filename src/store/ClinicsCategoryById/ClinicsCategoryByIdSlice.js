import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ClinicsCategoryById: [],
  error: null,
  loading: "idle",
};

export const actClinicsCategoryById = createAsyncThunk(
  "places/clinic/list",
  async (id, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      console.log(id);
      const res = await axios.get(
        `https://insta-order-site.web-allsafeeg.com/api/places/clinic/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            lang: localStorage.getItem("i18nextLng"),
          },
          signal,
        }
      );
      console.log(res.data, "Fetched data");
      return res.data.data;
    } catch (error) {
      console.error(error, "API call error");
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const ClinicsCategoryByIdSlice = createSlice({
  name: "ClinicsCategoryById",
  initialState,
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.ClinicsCategoryById = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actClinicsCategoryById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actClinicsCategoryById.fulfilled, (state, action) => {
        state.loading = "success";
        state.ClinicsCategoryById = action.payload;
      })
      .addCase(actClinicsCategoryById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default ClinicsCategoryByIdSlice.reducer;
export const { categoriesRecordsCleanUp } = ClinicsCategoryByIdSlice.actions;
