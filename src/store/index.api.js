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
    // prepareParams: (params, api, { getState }) => {
    //   const lang = getState().lang // Assuming you have a slice called "lang"
    //   params.lan = lang
    //   return params
    // },
  }),
  refetchOnFocus: false,
  tagTypes: [
    'auth',
    'apartments',
    'subcategories',
    'categories',
    'favorites',
    'apartment',
    'regions',
    'tags',
  ],
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
        body,
      }),
      invalidatesTags: ['auth', 'apartments', 'favorites'],
    }),
    sendCode: build.mutation({
      query: (body) => ({
        url: '/sms',
        method: 'POST',
        body,
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
      query: ({ id, lang }) => ({
        url: `/apartment/${id}`,
        params: { lan: lang },
      }),
      providesTags: ['apartment'],
    }),
    getUsersFavorites: build.query({
      query: (body) => ({
        url: '/favoriteapartment',
        params: body,
      }),
      providesTags: ['favorites'],
    }),
    addToFavorite: build.mutation({
      query: (id) => ({
        url: `/favoriteapartment/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['apartments', 'favorites', 'apartment'],
    }),
    createNewApartment: build.mutation({
      query: (body) => ({
        url: '/apartment1',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['apartments'],
    }),
    deleteApartment: build.mutation({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['apartments'],
    }),
    getAllCoordinates: build.query({
      query: () => ({
        url: '/apartments/coordinates',
      }),
    }),
    // regions queries ====================================================================
    getAllRegions: build.query({
      query: (body) => ({
        url: '/region',
        params: body,
      }),
      providesTags: ['regions'],
    }),
    // tags queries ====================================================================
    getAllTags: build.query({
      query: (body) => ({
        url: '/tag',
        params: body,
      }),
      providesTags: ['tags'],
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
  useAddToFavoriteMutation,
  useGetUsersFavoritesQuery,
  useGetAllRegionsQuery,
  useGetAllTagsQuery,
  useCreateNewApartmentMutation,
  useGetAllCoordinatesQuery,
  useDeleteApartmentMutation,
} = api
