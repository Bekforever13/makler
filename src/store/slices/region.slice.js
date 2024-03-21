import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  regionToEdit: null,
}

const RegionSlice = createSlice({
  name: 'RegionSlice',
  initialState,
  reducers: {
    setRegionToEdit(state, { payload }) {
      state.regionToEdit = payload
    },
  },
})
export const { setRegionToEdit } = RegionSlice.actions

export default RegionSlice.reducer
