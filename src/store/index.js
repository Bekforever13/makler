import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './index.api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authReducer from './slices/auth.slice.js'
import apartmentReducer from './slices/apartment.slice.js'
import adminReducer from './slices/admin.slice.js'
import categoryReducer from './slices/categories.slice.js'
import subcategoryReducer from './slices/subcategory.slice.js'
import regionReducer from './slices/region.slice.js'
import tagReducer from './slices/tags.slice.js'

const reducers = combineReducers({
  auth: authReducer,
  apartments: apartmentReducer,
  admin: adminReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  region: regionReducer,
  tag: tagReducer,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)
