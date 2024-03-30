import { useParams } from 'react-router-dom'
import { useAddToFavoriteMutation, useGetOneApartmentsQuery } from '../../store/index.api'
import Container from '../../components/shared/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { formatPhone, formatPrice } from '../../utils/shared'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { TbViewportWide } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { RWebShare } from 'react-web-share'
import { GiLadder } from 'react-icons/gi'
import { FaRegSquareCheck } from 'react-icons/fa6'
import { setAuthModal } from '../../store/slices/auth.slice'

const InfoPage = () => {
  const { isAuthenticated, authModal } = useSelector((s) => s.auth)
  const { id } = useParams()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const { data: apartmentData, isFetching, refetch } = useGetOneApartmentsQuery({ id, lang })
  const [addToFavorite] = useAddToFavoriteMutation()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const fullURL = window.location.href

  useEffect(() => {
    if (!authModal) {
      refetch()
    }
  }, [authModal])

  if (!apartmentData) {
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

  const handleClickFavorite = () => addToFavorite(apartmentData.data.id)

  return (
    <Container>
      <div className="flex items-center justify-between mt-10 flex-wrap gap-5">
        <h1 className="text-center text-3xl font-semibold">{t('information')}</h1>
        <div className="flex items-center gap-5">
          <RWebShare
            data={{
              text: 'Makler',
              url: fullURL,
              title: 'Makler - Uy Jay',
            }}
          >
            <Button
              className="normal-case flex items-center gap-3 rounded-[5px] px-6 py-2 text-white text-xs font-semibold"
              variant="gradient"
              color="blue"
              size="sm"
            >
              {t('share')}
            </Button>
          </RWebShare>
          <Button
            className="normal-case flex items-center gap-3 rounded-[5px] px-6 py-2 text-blue-100 text-xs font-semibold"
            variant="gradient"
            color="light-blue"
            size="sm"
            onClick={handleClickFavorite}
          >
            {isFetching && (
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
            )}
            {apartmentData?.data?.favorite === 1 ? (
              <MdFavorite size={22} />
            ) : (
              <MdFavoriteBorder size={22} />
            )}
            {apartmentData?.data?.favorite === 1 ? t('removeFromFavorite') : t('addToFavorite')}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-20 py-20">
        <div>
          <Swiper
            modules={[Navigation, Thumbs, FreeMode]}
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={10}
            navigation
            className="mySwiper2"
          >
            {apartmentData?.data?.images?.map((img) => {
              return (
                <SwiperSlide key={img.id}>
                  <img src={img.url} alt="img" />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={10}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {apartmentData?.data?.images?.map((img) => {
              return (
                <SwiperSlide key={img.id}>
                  <img src={img.url} className="cursor-pointer" alt="img" />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex items-center justify-evenly flex-wrap gap-5">
            <div className="flex items-center gap-5">
              <TbViewportWide size="36" />
              <div className="flex flex-col gap-3">
                <span>{t('total_area')}</span>
                <span>
                  {apartmentData?.data?.total_area}м<sup>2</sup>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <GiLadder size="36" />
              <div className="flex flex-col gap-3">
                <span>{t('floor')}</span>
                <span>
                  {apartmentData?.data?.floor} / {apartmentData?.data?.floor_home}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <FaRegSquareCheck size="36" />
              <div className="flex flex-col gap-3">
                <span>{t('rooms')}</span>
                <span>{apartmentData?.data?.room_count}</span>
              </div>
            </div>
          </div>
          <p>{apartmentData?.data?.description}</p>
        </div>
        <div className="flex flex-col gap-y-20">
          <ul className="flex flex-col gap-y-5">
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('address')}:</b> {apartmentData?.data?.region?.name}
            </li>
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('category')}: </b> {apartmentData?.data?.category?.name}
            </li>
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('subcategory')}: </b> {apartmentData?.data?.subcategory?.name}
            </li>
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('tags')}: </b>{' '}
              <div className="flex items-center gap-2">
                {apartmentData?.data.tags.map((el, i) => (
                  <span key={el.id}>
                    {el.name}
                    {apartmentData?.data.tags.length !== i + 1 && ','}
                  </span>
                ))}
              </div>
            </li>
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('price')}:</b>{' '}
              <b>
                {formatPrice(apartmentData?.data?.price)} {t('sum')}
              </b>
            </li>
            <li className="flex items-center justify-between border-b-[1px]">
              <b>{t('phone')}: </b>{' '}
              {isAuthenticated ? (
                formatPhone(`+${apartmentData?.data?.phone}`)
              ) : (
                <Button onClick={() => dispatch(setAuthModal(true))} color="blue">
                  {t('loginToSee')}
                </Button>
              )}
            </li>
            <li className="mt-10">
              <YMaps query={{ apikey: '17de01a8-8e68-4ee2-af08-82eed92f99ec' }}>
                <Map
                  style={{ width: '100%', height: '500px' }}
                  defaultState={{
                    center: [
                      apartmentData?.data?.coordinates?.latitude,
                      apartmentData?.data?.coordinates?.longitude,
                    ],
                    zoom: 13,
                  }}
                >
                  <Placemark
                    geometry={[
                      apartmentData?.data?.coordinates?.latitude,
                      apartmentData?.data?.coordinates?.longitude,
                    ]}
                  />
                </Map>
              </YMaps>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default InfoPage
