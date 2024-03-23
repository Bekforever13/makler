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
  tagTypes: ['auth', 'apartments', 'subcategories', 'categories', 'favorites', 'regions', 'tags'],
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
      providesTags: ['apartments'],
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
      invalidatesTags: ['apartments', 'favorites', 'apartments'],
    }),
    createNewApartment: build.mutation({
      query: (body) => ({
        url: '/apartment1',
        method: 'POST',
        body,
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

    // admin queries ===================================
    // apartment
    ACreateApartment: build.mutation({
      query: (body) => ({
        url: '/apartment_admin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['apartments'],
    }),
    ADeleteApartment: build.mutation({
      query: (id) => ({
        url: `/apartment_moderator/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['apartments'],
    }),
    AEditApartment: build.mutation({
      query: (body) => ({
        url: `/apartment/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['apartments'],
    }),
    AAddImageToApartment: build.mutation({
      query: ({ apartment_id, images }) => {
        const formData = new FormData()
        for (const image of images) {
          formData.append('images[]', image)
        }
        return {
          url: `/apartment/${apartment_id}/image`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['apartments'],
    }),
    ADeleteImage: build.mutation({
      query: (body) => ({
        url: `/apartment/${body.apartment_id}/image/${body.image_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['apartments'],
    }),
    // categories
    AGetCategories: build.query({
      query: () => ({
        url: '/category/languages',
      }),
      providesTags: ['categories'],
    }),
    ACreateCategory: build.mutation({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['categories'],
    }),
    ADeleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
    AEditCategory: build.mutation({
      query: (body) => {
        return {
          url: `/category/${body.id}`,
          method: 'PUT',
          body: { name: body.name },
        }
      },
      invalidatesTags: ['categories'],
    }),
    // subcategories
    AGetSubcategories: build.query({
      query: () => ({
        url: '/subcategory/languages',
      }),
      providesTags: ['subcategories'],
    }),
    ACreateSubcategory: build.mutation({
      query: (body) => ({
        url: '/subcategory',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['subcategories'],
    }),
    ADeleteSubcategory: build.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subcategories'],
    }),
    AEditSubcategory: build.mutation({
      query: (body) => ({
        url: `/subcategory/${body.id}`,
        method: 'PUT',
        body: {
          category_id: body.category_id,
          name: body.name,
        },
      }),
      invalidatesTags: ['subcategories'],
    }),
    // region
    AGetRegions: build.query({
      query: () => ({
        url: '/region/languages',
      }),
      providesTags: ['regions'],
    }),
    ACreateRegion: build.mutation({
      query: (body) => ({
        url: '/region',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['regions'],
    }),
    ADeleteRegion: build.mutation({
      query: (id) => ({
        url: `/region/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['regions'],
    }),
    AEditRegion: build.mutation({
      query: (body) => {
        return {
          url: `/region/${body.id}`,
          method: 'PUT',
          body: { name: body.name },
        }
      },
      invalidatesTags: ['regions'],
    }),
    // tags
    AGetTags: build.query({
      query: () => ({
        url: '/tag/languages',
      }),
      providesTags: ['tags'],
    }),
    ACreateTag: build.mutation({
      query: (body) => ({
        url: '/tag',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['tags'],
    }),
    ADeleteTag: build.mutation({
      query: (id) => ({
        url: `/tag/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tags'],
    }),
    AEditTag: build.mutation({
      query: (body) => {
        return {
          url: `/tag/${body.id}`,
          method: 'PUT',
          body: {
            category_id: body.category_id,
            name: body.name,
          },
        }
      },
      invalidatesTags: ['tags'],
    }),

    // moderator queries ===============================================================================
    // apartment
    MGetApartments: build.query({
      query: (params) => ({
        url: '/apartment/moderator',
        params,
      }),
      providesTags: ['apartments'],
    }),
    MGetOneApartment: build.query({
      query: (id) => ({
        url: `/apartment/${id}/moderator`,
      }),
      providesTags: ['apartments'],
    }),
    MEditApartmentStatus: build.mutation({
      query: (body) => {
        return {
          url: `/apartment/status/${body.id}`,
          method: 'PUT',
          body: { status: body.status },
        }
      },
      invalidatesTags: ['apartments'],
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
  useACreateApartmentMutation,
  useADeleteApartmentMutation,
  useAEditApartmentMutation,
  useACreateCategoryMutation,
  useADeleteCategoryMutation,
  useAEditCategoryMutation,
  useAGetCategoriesQuery,
  useAGetSubcategoriesQuery,
  useACreateSubcategoryMutation,
  useADeleteSubcategoryMutation,
  useAEditSubcategoryMutation,
  useAGetRegionsQuery,
  useACreateRegionMutation,
  useADeleteRegionMutation,
  useAEditRegionMutation,
  useAGetTagsQuery,
  useACreateTagMutation,
  useADeleteTagMutation,
  useAEditTagMutation,
  useADeleteImageMutation,
  useAAddImageToApartmentMutation,
  useMGetApartmentsQuery,
  useMGetOneApartmentQuery,
  useMEditApartmentStatusMutation,
} = api
