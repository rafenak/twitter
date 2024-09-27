import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { TENOR_KEY } from "../../config";
import { TenorCategories } from "../../utils/GlobalInterfaces";

interface GifSliceState {
  searchTerm: string;
  perview: boolean;
  next: string;
  gifs: string[];
  gifCategories: TenorCategories[];
  loading: boolean;
  error: boolean;
}

const initialState: GifSliceState = {
  searchTerm: "",
  perview: false,
  next: "",
  gifs: [],
  gifCategories: [],
  loading: false,
  error: false,
};

export const fetchGifCategories = createAsyncThunk(
  "gif/category",
  async (payload, thuckAPI) => {
    try {
      let clientKey = "Twitter";
      let url = `https://tenor.googleapis.com/v2/categories?key=${TENOR_KEY}&client_key=${clientKey}`;
      let res = await axios.get(url);
      console.log(res);

      let data = [];

      for (let i = 0; i < 8; i++) {
        data.push(res.data.tags[i]);
      }

      return data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

export const GifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    updateSerachTerm(state, action: PayloadAction<string>) {
      state = {
        ...state,
        searchTerm: action.payload,
      };
      return state;
    },

    updatePerview(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        perview: action.payload,
      };
      return state;
    },

    clearGifs(state) {
      state = {
        ...state,
        gifs: [],
      };
      return state;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchGifCategories.fulfilled, (state, action) => {
        state = {
          ...state,
          loading: false,
          gifCategories: action.payload,
        };
        return state;
      });

    builder.addMatcher(isPending, (state, action) => {
      state = {
        ...state,
        loading: true,
        error: false,
      };
      return state;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state = {
        ...state,
        loading: false,
        error: true,
      };
      return state;
    });
  },
});

export const { updateSerachTerm, updatePerview, clearGifs } = GifSlice.actions;

export default GifSlice.reducer;
