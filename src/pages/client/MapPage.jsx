import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { useGetAllCoordinatesQuery } from '../../store/index.api'
import { formatPrice } from '../../utils/shared'
import { useNavigate } from 'react-router-dom'

const MapPage = () => {
  const navigate = useNavigate()
  const { data } = useGetAllCoordinatesQuery()

  return (
    <YMaps query={{ apikey: '17de01a8-8e68-4ee2-af08-82eed92f99ec' }}>
      <Map
        style={{ width: '90vw', height: '75vh', margin: '0 auto' }}
        defaultState={{ center: [42.465139, 59.613292], zoom: 13 }}
      >
        {data?.data?.map((item) => {
          return (
            <Placemark
              key={item.id}
              options={{ draggable: false }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              geometry={
                item?.coordinates?.latitude !== null && item?.coordinates?.longitude !== null
                  ? [item?.coordinates?.latitude, item?.coordinates?.longitude]
                  : [25.117531, 55.134291]
              }
              properties={{ hintContent: `${formatPrice(item.price)} sum` }}
              onClick={() => navigate(`/info/${item.id}`)}
            />
          )
        })}
      </Map>
    </YMaps>
  )
}

export default MapPage
