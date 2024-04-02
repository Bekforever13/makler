import { useEffect, useState } from 'react'
import Container from '../../components/shared/Container'
import CardItem from '../../components/client/CardItem'
import { useGetAllApartmentsQuery } from '../../store/index.api'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [sort, setSort] = useState('')
  const [apartments, setApartments] = useState(null)
  const { filters } = useSelector((s) => s.apartments)
  const { t } = useTranslation()
  const lang = localStorage.getItem('makler_lang') || 'ru'

  const { data, isLoading } = useGetAllApartmentsQuery({
    ...filters,
    page,
    limit: 20,
    lan: lang,
    price: sort !== '' && sort,
  })

  const decrementPage = () => setPage((prev) => prev - 1)
  const incrementPage = () => setPage((prev) => prev + 1)

  useEffect(() => {
    if (data?.data) {
      setTotalPages(Math.ceil(data?.total / 20))
    }
  }, [data?.data])

  useEffect(() => {
    if (data) {
      setApartments(data.data)
    }
  }, [data, sort])

  return (
    <Container>
      <div
        className="flex items-center justify-between p-10 flex-wrap"
        id="heading-home"
      >
        <h1 className="text-[20px] text-gray-800 font-semibold my-3">
          {t('hero_title')}
        </h1>
        <div>
          <Select value={sort} label={t('sort')} onChange={(e) => setSort(e)}>
            <Option value="">{t('select')}</Option>
            <Option value="asc">{t('cheap')}</Option>
            <Option value="desc">{t('expensive')}</Option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white px-5">
        {/* loading spinner */}
        {isLoading && (
          <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
        {/* show data */}
        {totalPages > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-4 bg-white px-5">
            {apartments?.map((el) => (
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
  )
}

export default HomePage
