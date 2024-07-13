import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shoonyaApi = createApi({
  reducerPath: "shoonyaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.shoonya.com/NorenWClientTP`
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/QuickAuth",
        method: "POST",
        body: `jData=${data}`,
      }),
    }),
    userDetails: builder.mutation({
      query: ({ data, key }) => ({
        url: "/UserDetails",
        method: "POST",
        body: `jData=${data}&jKey=${key}`
      })
    }),
    searchScrips: builder.mutation({
      query: ({ data, key }) => ({
        url: '/SearchScrip',
        method: "POST",
        body: `jData=${data}&jKey=${key}`
      })
    })
  }),
});

export const {
  useLoginMutation,
  useUserDetailsMutation,
  useSearchScripsMutation
} = shoonyaApi;
