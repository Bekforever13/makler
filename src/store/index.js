import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './index.api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authReducer from './slices/auth.slice.js'
import apartmentReducer from './slices/apartment.slice.js'

const reducers = combineReducers({
  auth: authReducer,
  apartments: apartmentReducer,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)
