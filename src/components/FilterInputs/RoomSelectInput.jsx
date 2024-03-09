/* eslint-disable react/no-unescaped-entities */
import { Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/slices/apartment.slice'

const RoomSelectInput = () => {
  const [value, setValue] = useState()
  const dispatch = useDispatch()
  const { filters } = useSelector((s) => s.apartments)

  const handleSelect = (val) => {
    setValue(val)
    dispatch(setFilters({ ...filters, room_count: val }))
  }

  useEffect(() => {
    if (!Object.keys(filters).length) {
      setValue(null)
    }
  }, [filters])

  return (
    <Select label="Bo'lmeler" value={value} onChange={handleSelect}>
      <Option value="1">1 bo'lme</Option>
      <Option value="2">2 bo'lme</Option>
      <Option value="3">3 bo'lme</Option>
      <Option value="4">4 bo'lme</Option>
      <Option value="5">5 bo'lme</Option>
      <Option value="6">6+ bo'lme</Option>
    </Select>
  )
}

export default RoomSelectInput
