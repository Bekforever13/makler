import { Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useGetSubcategoriesQuery } from '../../../store/index.api'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../../store/slices/apartment.slice'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'

const SelectInput = () => {
  const { t } = useTranslation()
  const { filters } = useSelector((s) => s.apartments)
  const [subcategory_id, setCategoryId] = useState(null)
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const { data, isSuccess } = useGetSubcategoriesQuery({
    category_id: filters.category_id,
    lan: lang,
  })
  const dispatch = useDispatch()

  const handleSelect = (e) => {
    setCategoryId(e)
    dispatch(setFilters({ ...filters, subcategory_id: e }))
  }

  useEffect(() => {
    if (!Object.keys(filters).length) {
      setCategoryId(null)
    }
  }, [filters])

  if (!isSuccess) {
    return (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <AiOutlineLoading className="animate-spin" />
      </div>
    )
  }

  return (
    <Select
      label={t('selectSubcategory')}
      value={subcategory_id}
      onChange={(e) => handleSelect(e)}
    >
      {data?.data?.map((el) => (
        <Option key={el.id} value={el.id.toString()}>
          {el.name}
        </Option>
      ))}
    </Select>
  )
}

export default SelectInput
