import { useEffect, useState } from 'react'
import Container from '../../components/shared/Container'
import CardItem from '../../components/client/CardItem'
import { useGetUsersFavoritesQuery } from '../../store/index.api'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'
import { IconButton, Typography } from '@material-tailwind/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const FavoritesPage = () => {
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const { data, isFetching } = useGetUsersFavoritesQuery({
    lan: lang,
  })
  const { t } = useTranslation()

  const decrementPage = () => setPage((prev) => prev - 1)
  const incrementPage = () => setPage((prev) => prev + 1)

  useEffect(() => {
    if (data?.data) setTotalPages(Math.ceil(data?.total / 20))
  }, [data?.data])

  return (
    <div className="py-4">
      <Container>
        <h1 className="text-[20px] text-gray-800 font-semibold my-3">
          {t('yourFavorites')}
        </h1>
        <div className="flex flex-col items-center gap-10">
          {/* loading spinner */}
          {isFetching && (
            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <AiOutlineLoading className="animate-spin" />
            </div>
          )}
          {/* show data */}
          {totalPages ? (
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

export default FavoritesPage
