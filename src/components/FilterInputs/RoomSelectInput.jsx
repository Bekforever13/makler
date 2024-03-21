/* eslint-disable react/no-unescaped-entities */
import { Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/slices/apartment.slice'
import { useTranslation } from 'react-i18next'

const RoomSelectInput = () => {
  const [value, setValue] = useState()
  const dispatch = useDispatch()
  const { t } = useTranslation()
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
    <Select label={t('rooms')} value={value} onChange={handleSelect}>
      <Option value="1">1 {t('room')}</Option>
      <Option value="2">2 {t('rooms')}</Option>
      <Option value="3">3 {t('rooms')}</Option>
      <Option value="4">4 {t('rooms')}</Option>
      <Option value="5">5 {t('rooms')}</Option>
      <Option value="6">6+ {t('rooms')}</Option>
      <Option value="7">7 {t('rooms')}</Option>
      <Option value="8">8 {t('rooms')}</Option>
      <Option value="9">9 {t('rooms')}</Option>
      <Option value="11">10+ {t('rooms')}</Option>
    </Select>
  )
}

export default RoomSelectInput
