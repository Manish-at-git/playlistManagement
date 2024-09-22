import { apiSlice } from "../apiSlice";

export const playlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPlaylists: builder.query({
      query: () => "/api/getPlaylists",
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
        url: `/api/updatePlaylist/${data?.id}`,
        method: "PUT",
        body: data?.body,
      }),
      invalidatesTags: ["UpdatePlaylist"],
    }),
    deletePlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/deletePlayList/${data?.id}`,
        method: "DELETE",
        // body: {},
      }),
      invalidatesTags: ["DeletePlaylist"],
    }),
    addSongsToPlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/addSongInPlayList/${data?.id}`,
        method: "PUT",
        body: data?.payload,
      }),
      invalidatesTags: ["AddSongsToPlaylist"],
    }),
    deleteSongsToPlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/deleteSongInPlayList/${data?.id}`,
        method: "DELETE",
        // body: data?.payload,
      }),
      invalidatesTags: ["DeleteSongsToPlaylist"],
    }),
    fetchSongs: builder.query({
      query: (data) => `/api/getSongs?text=${data?.text}`,
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
  useFetchSongsQuery
} = playlistSlice;
