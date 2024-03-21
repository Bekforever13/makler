import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subcategoryToEdit: null,
}

const SubcategorySlice = createSlice({
  name: 'SubcategorySlice',
  initialState,
  reducers: {
    setSubcategoryToEdit(state, { payload }) {
      state.subcategoryToEdit = payload
    },
  },
})
export const { setSubcategoryToEdit } = SubcategorySlice.actions

export default SubcategorySlice.reducer
