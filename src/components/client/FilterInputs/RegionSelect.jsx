import { Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../../store/slices/apartment.slice'
import { useTranslation } from 'react-i18next'
import { useGetAllRegionsQuery } from '../../../store/index.api'

const RegionSelect = () => {
  const [value, setValue] = useState(null)
  const { data } = useGetAllRegionsQuery()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { filters } = useSelector((s) => s.apartments)
  const [regionOptions, setRegionOptions] = useState([])

  const handleSelect = (val) => {
    setValue(val)
    dispatch(setFilters({ ...filters, region_id: val }))
  }

  useEffect(() => {
    if (data?.data) {
      const map = data?.data?.map((el) => ({ label: el?.name, value: el?.id }))
      setRegionOptions(map)
    }
  }, [data?.data])

  useEffect(() => {
    if (!Object.keys(filters).length) {
      setValue(null)
    }
  }, [filters])

  return (
    <Select label={t('region')} value={value} onChange={(e) => handleSelect(e)}>
      <Option value={'0'}>{t('all')}</Option>
      {regionOptions?.map((el) => (
        <Option className='text-black' key={el?.value} value={el.value.toString()}>
          {el?.label}
        </Option>
      ))}
    </Select>
  )
}

export default RegionSelect
