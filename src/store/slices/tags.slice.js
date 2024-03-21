import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tagToEdit: null,
}

const TagsSlice = createSlice({
  name: 'TagsSlice',
  initialState,
  reducers: {
    setTagToEdit(state, { payload }) {
      state.tagToEdit = payload
    },
  },
})
export const { setTagToEdit } = TagsSlice.actions

export default TagsSlice.reducer
