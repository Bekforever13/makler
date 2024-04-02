import { useEffect, useState } from 'react'
import Container from '../../components/shared/Container'
import {
  useGetAllApartmentsQuery,
  useGetSubcategoriesQuery,
} from '../../store/index.api'
import CardItem from '../../components/client/CardItem'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/slices/apartment.slice'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const ArendaPage = () => {
  const [totalPages, setTotalPages] = useState(0)
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const { filters } = useSelector((s) => s.apartments)
  const dispatch = useDispatch()
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const { data, isFetching, refetch } = useGetAllApartmentsQuery({
    category_id: 1,
    page,
    limit: 20,
    lan: lang,
    ...filters,
  })
  const { data: subcategories } = useGetSubcategoriesQuery({
    category_id: 1,
    lan: lang,
  })

  const decrementPage = () => setPage((prev) => prev - 1)
  const incrementPage = () => setPage((prev) => prev + 1)

  const handleSelectSubcategory = (el) => {
    setActiveSubcategory(el.name)
    dispatch(setFilters({ ...filters, subcategory_id: el.id }))
  }

  const handleSelectAll = () => {
    setActiveSubcategory('all')
    dispatch(setFilters({ ...filters, category_id: 1, subcategory_id: '' }))
  }

  useEffect(() => {
    if (data?.data) setTotalPages(Math.ceil(data?.total / 20))
  }, [data?.data])

  useEffect(() => {
    refetch()
    return () => dispatch(setFilters({}))
  }, [])

  return (
    <div className="py-4">
      <Container>
        <div className="mb-10">
          <h1 className="text-[20px] text-gray-800 font-semibold my-3">
            {t('houseForRent')}
          </h1>
          <div className="flex items-center gap-5 flex-wrap">
            <Button
              onClick={() => handleSelectAll()}
              className={`normal-case rounded-[5px] px-6 text-xs font-semibold py-2 ${
                activeSubcategory !== 'all' ? 'text-gray-900' : 'text-white'
              }`}
              variant="gradient"
              color={activeSubcategory !== 'all' ? 'light-blue' : 'blue'}
              size="sm"
            >
              {t('all')}
            </Button>
            {subcategories?.data?.map((el) => {
              return (
                <div key={el.id}>
                  <Button
                    className="normal-case rounded-[5px] md:py-2 sm:px-3 sm:py-1 text-xs font-semibold text-black"
                    variant="gradient"
                    color={
                      activeSubcategory !== el.name ? 'light-blue' : 'blue'
                    }
                    size="sm"
                    onClick={() => handleSelectSubcategory(el)}
                  >
                    {el.name}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          {/* loading spinner */}
          {isFetching && (
            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <AiOutlineLoading className="animate-spin" />
            </div>
          )}
          {/* show data */}
          {totalPages > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-4">
              {data?.data?.map((el) => (
                <CardItem key={el.id} item={el} />
              ))}
            </div>
          ) : (
            <div className="p-10">{t('empty')}</div>
          )}
          {/* PAGINATION */}
          {totalPages > 0 && (
            <div className="flex items-center gap-8 p-10">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={decrementPage}
                disabled={page === 1}
              >
                <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                {t('page')} <strong className="text-gray-900">{page}</strong> /{' '}
                <strong className="text-gray-900">{totalPages}</strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={incrementPage}
                disabled={page === totalPages}
              >
                <FaArrowRight strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default ArendaPage
