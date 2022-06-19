import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

interface InitialStateTyped {
  status: string;
  error: string;
  playlists: {};
}

const initialState: InitialStateTyped = {
  status: "idle",
  error: "",
  playlists: {}
};

export const getUserPlaylists = createAsyncThunk(
  "spotify/getUserPlaylists",
  async () => {
    const response = await api.getUserPlaylists();
    return response.data;
  }
);

export const spotifySlice = createSlice({
  name: "spotifySlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserPlaylists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.playlists = action.payload.items;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.status = "failed";
        //type assertion https://bobbyhadz.com/blog/typescript-type-unknown-is-not-assignable-to-type
        state.error = action.error.message as string;
      });
  }
});

//export all reducers as default to be able to be used in store reducer
export default spotifySlice.reducer;
