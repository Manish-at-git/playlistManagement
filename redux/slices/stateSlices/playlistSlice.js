import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: { playlists: [], },
  reducers: {
    playLists(state, action) {
      state.playlists = action.payload;
    },
  },
});

export const { playLists } = playlistSlice.actions; 
export default playlistSlice.reducer;
