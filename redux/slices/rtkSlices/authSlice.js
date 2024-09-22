import { apiSlice } from "../apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/login", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/register", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authSlice;
