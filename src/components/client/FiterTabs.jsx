import {
  Button,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import SelectInput from './FilterInputs/SelectInput'
import RoomSelectInput from './FilterInputs/RoomSelectInput'
import { useGetCategoriesQuery } from '../../store/index.api'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/slices/apartment.slice'
import useWindowSize from '../../hooks/useWindowSize'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'

const FiterTabs = () => {
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState(1)
  const dispatch = useDispatch()
  const { filters } = useSelector((s) => s.apartments)
  const { data, isSuccess } = useGetCategoriesQuery({ lan: lang })
  const { width } = useWindowSize()
  const { t } = useTranslation()

  const handleClearFilters = () => {
    dispatch(setFilters({}))
    setActiveTab('')
    setPriceFrom('')
    setPriceTo('')
  }

  useEffect(() => {
    if (isSuccess ?? data) {
      const mappedData = data?.data?.map((el) => {
        return { label: el.name, value: el.id }
      })
      setCategories(mappedData)
    }
  }, [data])

  if (!isSuccess) {
    return (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <AiOutlineLoading className="animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Tabs value={activeTab} className={'overflow-visible'}>
        <TabsHeader
          className="w-[50%] p-0 bg-blue-400 rounded-none rounded-t-md z-10"
          indicatorProps={{
            className:
              'shadow-none rounded-none rounded-t-md bg-gray-100 h-[27px]',
          }}
        >
          {categories?.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={`text-xs font-semibold text-black`}
              onClick={() => {
                dispatch(setFilters({ category_id: value }))
                setActiveTab(value)
              }}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="bg-white rounded-sm rounded-tl-none overflow-visible">
          {categories?.map(({ value }) => {
            return (
              <TabPanel key={value} value={value} className="overflow-visible">
                <div
                  className={`flex justify-between items-center gap-2 ${
                    width < 1000 && 'flex-wrap'
                  }`}
                >
                  <SelectInput />
                  <RoomSelectInput />
                  <Input
                    onChange={(e) => {
                      dispatch(
                        setFilters({ ...filters, from_price: e.target.value }),
                      )
                      setPriceFrom(e.target.value)
                    }}
                    value={priceFrom}
                    label={t('price_from')}
                    type="number"
                  />
                  <Input
                    onChange={(e) => {
                      dispatch(
                        setFilters({ ...filters, to_price: e.target.value }),
                      )
                      setPriceTo(e.target.value)
                    }}
                    value={priceTo}
                    label={t('price_to')}
                    type="number"
                  />
                </div>
              </TabPanel>
            )
          })}
        </TabsBody>
      </Tabs>
      <div className="flex justify-end gap-2 items-center mt-4">
        <Button
          onClick={handleClearFilters}
          size="sm"
          variant="gradient"
          color="blue"
          className="rounded-lg"
        >
          {t('clearFilters')}
        </Button>
      </div>
    </div>
  )
}

export default FiterTabs
