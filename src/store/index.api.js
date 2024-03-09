import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('makler_token')
      token && headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  refetchOnFocus: false,
  tagTypes: ['auth', 'apartments', 'subcategories', 'categories'],
  endpoints: (build) => ({
    // authorization queries =================================================================
    checkUser: build.query({
      query: () => ({
        url: '/check',
      }),
      providesTags: ['auth'],
    }),
    applyCode: build.mutation({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['auth'],
    }),
    sendCode: build.mutation({
      query: (body) => ({
        url: '/sms',
        method: 'POST',
        body: body,
      }),
    }),
    // apartments queries =================================================================
    getAllApartments: build.query({
      query: (body) => ({
        url: '/apartment',
        params: body,
      }),
      providesTags: ['apartments'],
    }),
    getOneApartments: build.query({
      query: ({ id }) => ({
        url: `/apartment/${id}`,
      }),
    }),
    // subcategories queries =================================================================
    getSubcategories: build.query({
      query: (body) => ({
        url: '/subcategory',
        params: body,
      }),
      providesTags: ['subcategories'],
    }),
    // categories queries =================================================================
    getCategories: build.query({
      query: (body) => ({
        url: '/category',
        params: body,
      }),
      providesTags: ['categories'],
    }),
  }),
})

export const {
  useGetAllApartmentsQuery,
  useGetOneApartmentsQuery,
  useSendCodeMutation,
  useApplyCodeMutation,
  useCheckUserQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} = api
