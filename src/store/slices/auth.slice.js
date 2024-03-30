import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  token: '',
  phoneNumber: '',
  user: null,
  authModal: false,
}

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload
    },
    setToken(state, { payload }) {
      localStorage.setItem('makler_token', `${payload}`)
      state.token = payload
    },
    setCurrentUserRole(state, { payload }) {
      state.currentUserRole = payload
    },
    removeToken(state) {
      state.token = ''
    },
    setPhoneNumber(state, { payload }) {
      state.phoneNumber = payload
    },
    setUser(state, { payload }) {
      state.user = payload
    },
    setAuthModal(state, { payload }) {
      state.authModal = payload
    },
  },
})
export const {
  removeToken,
  setCurrentUserRole,
  setIsAuthenticated,
  setToken,
  setPhoneNumber,
  setUser,
  setAuthModal,
} = AuthSlice.actions

export default AuthSlice.reducer
