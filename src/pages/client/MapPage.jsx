import { useGetAllCoordinatesQuery } from '../../store/index.api'
import { formatPrice } from '../../utils/shared'
import { useNavigate } from 'react-router-dom'
import icon from '../../images/image/location.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-tailwind/react'

const MapPage = () => {
  const navigate = useNavigate()
  const { data } = useGetAllCoordinatesQuery()
  const { t } = useTranslation()

  return (
    <MapContainer
      center={[42.465139, 59.613292]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: '90vw', height: '75vh', margin: '50px auto 0' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data?.data?.map((item) => (
        <Marker
          key={item.id}
          position={
            item?.coordinates?.latitude !== null &&
            item?.coordinates?.longitude !== null
              ? [item?.coordinates?.latitude, item?.coordinates?.longitude]
              : [25.117531, 55.134291]
          }
        >
          <Popup>
            <div>
              <p>
                {t('address')}:{' '}
                <span className="font-semibold">{item?.address}</span>
              </p>
              <p>
                {t('room_count')}:{' '}
                <span className="font-semibold">{item?.room_count}</span>
              </p>
              <p>
                {t('total_area')}:{' '}
                <span className="font-semibold">
                  {item?.total_area} м<sup>2</sup>
                </span>
              </p>
              <p>
                {t('floor')}:{' '}
                <span className="font-semibold">{item?.floor}</span>
              </p>
              <p>
                {t('price')}:{' '}
                <span className="font-semibold">
                  {formatPrice(item?.price)} {t('sum')}
                </span>
              </p>
              <Button
                onClick={() => navigate(`/info/${item.id}`)}
                color="blue"
                size="sm"
              >
                Смотреть
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapPage
