import { apiSlice } from "../apiSlice";

export const playlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPlaylists: builder.query({
      query: () => "/api/getAllPlaylists",
      method: "GET",
      providesTags: ["GetPlaylists"],
    }),
    addPlaylist: builder.mutation({
      query: (data) => ({
        url: "/api/addPlayList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AddPlaylist"],
    }),
    updatePlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/playlists/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: ["UpdatePlaylist"],
    }),
    deletePlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/playlists/${data?.id}`,
        method: "DELETE",
        // body: {},
      }),
      invalidatesTags: ["DeletePlaylist"],
    }),
    addSongsToPlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/addSongToPlaylist/${data?.id}`,
        method: "POST",
        body: data?.payload,
      }),
      invalidatesTags: ["AddSongsToPlaylist"],
    }),
    deleteSongsToPlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/playlists/${data?.id}/${data?.songId}`,
        method: "DELETE",
        // body: data?.payload,
      }),
      invalidatesTags: ["DeleteSongsToPlaylist"],
    }),
    fetchSongs: builder.query({
      query: (data) => `/api/search?searchQuery=${data?.text}`,
      method: "GET",
      providesTags: ["GetSongs"],
    }),
    fetchSpotifyPlaylist: builder.query({
      query: (data) => `/api/fetchPlaylist?searchQuery=top`,
      method: "GET",
      providesTags: ["GetSongs"],
    }),
    
  }),
});

export const {
  useAddPlaylistMutation,
  useFetchPlaylistsQuery,
  useAddSongsToPlaylistMutation,
  useDeletePlaylistMutation,
  useDeleteSongsToPlaylistMutation,
  useUpdatePlaylistMutation,
  useFetchSongsQuery,
  useFetchSpotifyPlaylistQuery
} = playlistSlice;
