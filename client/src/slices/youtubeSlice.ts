import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

interface InitialStateTyped {
  status: string;
  error: string;
  playlists: [];
}

//initialize the slice with some initial state and type expected outcomes.
const initialState: InitialStateTyped = {
  status: "idle",
  error: "",
  playlists: []
};

//create the thunk to request the playlists from the server
export const getYoutubePlaylists = createAsyncThunk(
  "youtube/getYoutubePlaylists",
  async () => {
    const response = await api.getYoutubePlaylists();
    return response.data;
  }
);

export const youtubeSlice = createSlice({
  name: "youtubeSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getYoutubePlaylists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getYoutubePlaylists.fulfilled, (state, action) => {
        state.status = "fulfilled";
        //set the state to be the array of playlist objects from the server response
        state.playlists = action.payload.data.items;
      })
      .addCase(getYoutubePlaylists.rejected, (state, action) => {
        state.status = "failed";
        //type assertion https://bobbyhadz.com/blog/typescript-type-unknown-is-not-assignable-to-type
        state.error = action.error.message as string;
      });
  }
});

//export all reducers as default to be able to be used in store reducer
export default youtubeSlice.reducer;
