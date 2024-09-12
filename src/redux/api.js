import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const products_api = createApi({
  reducerPath: "products_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-site-9at1.onrender.com/api",
  }),
  tagTypes: ["user", "products", "reviews"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      providesTags: ["user"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      providesTags: ["user"],
    }),
    getUser: builder.query({
      query: (token) => ({
        url: "/users",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
    getProducts: builder.query({
      query: (body) => ({
        url: "/products",
      }),
      providesTags: ["products"],
    }),
    getReviewsbyUserId: builder.query({
      query: ({ token }) => ({
        url: "/reviews/user/",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["reviews"],
    }),
    getProductsbyId: builder.query({
      query: (product_id) => ({
        url: `/products/${product_id}`,
      }),
      providesTags: ["products"],
    }),
    createProducts: builder.mutation({
      query: ({ token, body }) => ({
        url: "/api/products",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["products"],
    }),
    getReviews: builder.query({
      query: (body) => ({
        url: "/reviews",
      }),
      providesTags: ["reviews"],
    }),
    getReviewsbyId: builder.query({
      query: (review_id) => ({
        url: `/reviews/${review_id}`,
      }),
      providesTags: ["reviews"],
    }),
    getReviewsbyProductId: builder.query({
      query: (product_id) => ({
        url: `/reviews/${product_id}`,
      }),
      providesTags: ["reviews"],
    }),
    createReviews: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["reviews"],
    }),
    editReview: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["reviews"],
    }),
    deleteReview: builder.mutation({
      query: ({ id, token }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProductsQuery,
  useCreateProductsMutation,
  useGetProductsbyIdQuery,
  useGetUserQuery,
  useGetReviewsQuery,
  useGetReviewsbyUserIdQuery,
  useGetReviewsbyIdQuery,
  useCreateReviewsMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsbyProductIdQuery,
} = products_api;
