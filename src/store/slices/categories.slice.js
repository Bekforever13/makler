import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryToEdit: null,
}

const CategorySlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {
    setCategoryToEdit(state, { payload }) {
      state.categoryToEdit = payload
    },
  },
})
export const { setCategoryToEdit } = CategorySlice.actions

export default CategorySlice.reducer
