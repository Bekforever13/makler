import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apartmentToEdit: 0,
}

const AdminSlice = createSlice({
  name: 'AdminSlice',
  initialState,
  reducers: {
    setApartmentToEdit(state, { payload }) {
      state.apartmentToEdit = payload
    },
  },
})
export const { setApartmentToEdit } = AdminSlice.actions

export default AdminSlice.reducer
