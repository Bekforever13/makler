import Container from '../../components/shared/Container'
import { useEffect, useState } from 'react'
import { useGetAllApartmentsQuery, useGetSubcategoriesQuery } from '../../store/index.api'
import CardItem from '../../components/client/CardItem'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'
import { setFilters } from '../../store/slices/apartment.slice'
import { useTranslation } from 'react-i18next'

const SatiwPage = () => {
  const { t } = useTranslation()
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [page, setPage] = useState(1)
  const { filters } = useSelector((s) => s.apartments)
  const dispatch = useDispatch()
  const { data, isFetching, isSuccess, refetch } = useGetAllApartmentsQuery({
    category_id: 2,
    page,
    limit: 20,
    lan: lang,
    ...filters,
  })
  const { data: subcategories } = useGetSubcategoriesQuery({ category_id: 2, lan: lang })
  const totalPages = Math.ceil(data?.total / 20) ?? 1

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full ${
            i === page ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10' : 'text-gray-900'
          } text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:${
            i !== page ? 'bg-gray-900/10' : ''
          } active:${
            i !== page ? 'bg-gray-900/20' : ''
          } disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
          type="button"
          onClick={() => setPage(i)}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {i}
          </span>
        </button>,
      )
    }
    return pageNumbers
  }

  const decrementPage = () => {
    setPage((prev) => prev - 1)
  }
  const incrementPage = () => {
    setPage((prev) => prev + 1)
  }

  const handleSelectSubcategory = (el) => {
    setActiveSubcategory(el.name)
    dispatch(setFilters({ ...filters, category_id: 2, subcategory_id: el.id }))
  }

  const handleSelectAll = () => {
    setActiveSubcategory('all')
    dispatch(setFilters({ ...filters, category_id: 2, subcategory_id: '' }))
  }

  useEffect(() => {
    refetch()
    return () => dispatch(setFilters({}))
  }, [])

  return (
    <div className="py-4">
      <Container>
        <div className="mb-10">
          <h1 className="text-[20px] text-gray-800 font-semibold my-3">{t('houseForSale')}</h1>
          <div className="flex items-center gap-5 flex-wrap">
            <Button
              onClick={() => handleSelectAll()}
              className={`normal-case rounded-[5px] md:py-2 sm:px-3 sm:py-1 text-xs font-semibold  ${
                activeSubcategory !== 'all' ? 'text-blue-100' : 'text-white'
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
                  {activeSubcategory !== el.name ? (
                    <Button
                      onClick={() => handleSelectSubcategory(el)}
                      className="normal-case rounded-[5px] md:py-2 sm:px-3 sm:py-1  text-blue-100 text-xs font-semibold"
                      variant="gradient"
                      color="light-blue"
                      size="sm"
                    >
                      {el.name}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectSubcategory(el)}
                      className="normal-case rounded-[5px] px-6 text-xs font-medium sm:hidden md:flex"
                      color="blue"
                      variant="gradient"
                      size="sm"
                    >
                      {el.name}
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          {/* loading spinner */}
          {isFetching && (
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
          )}
          {/* show data */}
          {isSuccess && (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-4">
              {data?.data?.map((el) => (
                <CardItem key={el.id} item={el} />
              ))}
            </div>
          )}
          {/* PAGINATION */}
          {data?.data?.length ? (
            <div className="flex items-center gap-4">
              <button
                disabled={page === 1}
                onClick={decrementPage}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                {t('back')}
              </button>
              <div className="flex items-center gap-2">{renderPageNumbers()}</div>
              <button
                disabled={page === Math.ceil(data?.total / 20)}
                onClick={incrementPage}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                {t('next')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            'Пусто'
          )}
        </div>
      </Container>
    </div>
  )
}

export default SatiwPage
