import { useParams } from 'react-router-dom'
import {
  useAddToFavoriteMutation,
  useGetOneApartmentsQuery,
} from '../../store/index.api'
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
import icon from '../../images/image/location.png'
import { AiOutlineLoading } from 'react-icons/ai'

const InfoPage = () => {
  const { isAuthenticated, authModal } = useSelector((s) => s.auth)
  const { id } = useParams()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const lang = localStorage.getItem('makler_lang') || 'ru'
  const {
    data: apartmentData,
    isFetching,
    refetch,
  } = useGetOneApartmentsQuery({ id, lang })
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
        <AiOutlineLoading className="animate-spin" />
      </div>
    )
  }

  const handleClickFavorite = () => addToFavorite(apartmentData.data.id)

  return (
    <Container>
      <div className="flex items-center justify-between mt-10 flex-wrap gap-5">
        <h1 className="text-center text-3xl font-semibold">
          {t('information')}
        </h1>
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
            className="normal-case flex items-center gap-3 rounded-[5px] px-6 py-2 text-gray-900 text-xs font-semibold"
            variant="gradient"
            color="light-blue"
            size="sm"
            onClick={handleClickFavorite}
          >
            {isFetching && <AiOutlineLoading className="animate-spin" />}
            {apartmentData?.data?.favorite === 1 ? (
              <MdFavorite size={22} />
            ) : (
              <MdFavoriteBorder size={22} />
            )}
            {apartmentData?.data?.favorite === 1
              ? t('removeFromFavorite')
              : t('addToFavorite')}
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
                  {apartmentData?.data?.floor} /{' '}
                  {apartmentData?.data?.floor_home}
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
              <b>{t('subcategory')}: </b>{' '}
              {apartmentData?.data?.subcategory?.name}
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
                <Button
                  onClick={() => dispatch(setAuthModal(true))}
                  color="blue"
                >
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
                    options={{
                      draggable: false,
                      iconLayout: 'default#image',
                      iconImageHref: icon,
                      iconImageSize: [35, 35],
                    }}
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
