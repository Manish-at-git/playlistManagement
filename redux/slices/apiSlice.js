import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "https://propelious-backend.onrender.com",
    prepareHeaders(headers) {
      headers.set("accept", "application/json ");
      let token = null;
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user"));
        token = user?.token;
      }
      console.log(token, "toekn");
      headers.set("authorization", `Bearer ${token && token}`);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "GetPlaylists",
    "AddPlaylist",
    "UpdatePlaylist",
    "DeletePlaylist",
    "AddSongsToPlaylist",
    "DeleteSongsToPlaylist",
    "GetSongs"
  ],
  endpoints: (builder) => ({}),
});
