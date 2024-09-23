import { apiSlice } from "../apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/signin", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup", 
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
