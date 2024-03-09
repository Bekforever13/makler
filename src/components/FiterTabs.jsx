import { Button, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import SelectInput from './FilterInputs/SelectInput'
import RoomSelectInput from './FilterInputs/RoomSelectInput'
import { useGetCategoriesQuery } from '../store/index.api'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../store/slices/apartment.slice'

const FiterTabs = () => {
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState(1)
  const dispatch = useDispatch()
  const { filters } = useSelector((s) => s.apartments)
  const { data, isSuccess } = useGetCategoriesQuery()

  const handleClearFilters = () => {
    dispatch(setFilters({ category_id: filters.category_id }))
    setActiveTab(filters.category_id)
    setPriceFrom('')
    setPriceTo('')
  }

  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.data?.map((el) => {
        return { label: el.name, value: el.id }
      })
      setCategories(mappedData)
    }
  }, [isSuccess])

  if (!isSuccess) {
    return (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          className="text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <div>
      <Tabs value={activeTab} className={'overflow-visible'}>
        <TabsHeader
          className="w-[50%] p-0 bg-black rounded-none rounded-t-md"
          indicatorProps={{
            className: 'shadow-none rounded-none rounded-t-md bg-gray-100 h-[27px]',
          }}
        >
          {categories?.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={
                activeTab === value
                  ? 'text-gray-900 text-[12px] font-semibold'
                  : 'text-white text-[12px] font-semibold'
              }
              onClick={() => {
                setActiveTab(value)
                dispatch(setFilters({ category_id: value }))
              }}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className={'bg-white rounded-sm rounded-tl-none overflow-visible'}>
          {categories?.map(({ value }) => {
            return (
              <TabPanel key={value} value={value} className="overflow-visible">
                <div className="flex justify-between items-center gap-2">
                  <SelectInput />
                  <RoomSelectInput />
                  <Input
                    onChange={(e) => {
                      dispatch(setFilters({ ...filters, from_price: e.target.value }))
                      setPriceFrom(e.target.value)
                    }}
                    value={priceFrom}
                    label="Цена Oт"
                    type="number"
                  />
                  <Input
                    onChange={(e) => {
                      dispatch(setFilters({ ...filters, to_price: e.target.value }))
                      setPriceTo(e.target.value)
                    }}
                    value={priceTo}
                    label="Цена До"
                    type="number"
                  />
                </div>
              </TabPanel>
            )
          })}
        </TabsBody>
      </Tabs>
      <div className="flex justify-end gap-2 items-center mt-4">
        {/* <Button size="sm" variant="gradient" color="white" className="rounded-sm">
          Kartadan koriw
        </Button> */}
        <Button
          onClick={handleClearFilters}
          size="sm"
          variant="gradient"
          color="blue"
          className="rounded-sm"
        >
          Filterdi oshiriw
        </Button>
      </div>
    </div>
  )
}

export default FiterTabs
