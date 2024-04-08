import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apartments: [],
  filters: {
    category_id: 1,
    subcategory_id: 0,
    from_price: 0,
    to_price: 0,
    room_count: 0,
    region_id: 0,
  },
}

const ApartmentSlice = createSlice({
  name: 'ApartmentSlice',
  initialState,
  reducers: {
    setApartments(state, { payload }) {
      state.apartments = payload
    },
    setFilters(state, { payload }) {
      state.filters = payload
    },
  },
})
export const { setApartments, setFilters, setIsSearch } = ApartmentSlice.actions

export default ApartmentSlice.reducer
