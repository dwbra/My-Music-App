import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

//type the playlist objects that will be in the api response array
interface IPlaylist {
  description: string;
  external_urls: { spotify: string };
  id: string;
  name: string;
  images: [
    {
      url: string;
    }
  ];
}

//add inital typing to the original state
interface InitialStateTyped {
  status: string;
  error: string;
  //show that the arrays will contain objects typed above
  playlists: IPlaylist[];
}

//initialize the slice with some initial state and type expected outcomes.
const initialState: InitialStateTyped = {
  status: "idle",
  error: "",
  playlists: []
};

interface SpotifyParams {
  limit: number;
  offset: number;
}

//create the thunk to request the playlists from the server
export const getUserPlaylists = createAsyncThunk(
  "spotify/getUserPlaylists",
  async (options: SpotifyParams) => {
    const response = await api.getUserPlaylists(options);
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
        return {
          ...state,
          status: "loading"
        };
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        return {
          ...state,
          status: "fulfilled",
          //use the spread operator to join the two arrays
          playlists: [...state.playlists, ...action.payload.items]
        };
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          //type assertion https://bobbyhadz.com/blog/typescript-type-unknown-is-not-assignable-to-type
          error: action.error.message as string
        };
      });
  }
});

//export all reducers as default to be able to be used in store reducer
export default spotifySlice.reducer;
