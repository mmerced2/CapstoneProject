import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const products_api = createApi({
    reducerPath: "products_api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://e-commerce-site-9at1.onrender.com/api",
    }),
    tagTypes: ["user", "products"], 
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/auth/register", 
                method: "POST", 
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login", 
                method: "POST", 
                body,
            }),
        }),
        getUser: builder.query({
            query: (token) => ({
                url: "/users", 
                headers: {
                    authorization: `Bearer ${token}`
                },
            }),
            providesTags: ["user"],
        }),
        getProducts: builder.query({
            query: (body) => ({
                url: "/products", 
                // headers: {
                //     authorization: `Bearer ${token}`
                // },
            }),
            providesTags: ["products"],
        }), 
        getProductsbyId: builder.query({
            query: (product_id) => ({
                url: `/products/${product_id}`, 
                // headers: {
                //     authorization: `Bearer ${token}`
                // },
            }),
            providesTags: ["products"],
        }), 
        createProducts: builder.mutation({
            query: ({token, body}) => ({
                url: "/api/products", 
                method: "POST", 
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body,
            }),
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useRegisterMutation, 
    useLoginMutation, 
    useGetProductsQuery, 
    useCreateProductsMutation,
    useGetProductsbyIdQuery,
    useGetUserQuery
}= products_api;