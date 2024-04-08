import { useGetAllCoordinatesQuery } from '../../store/index.api'
import { formatPrice } from '../../utils/shared'
import { useNavigate } from 'react-router-dom'
import icon from '../../images/image/location.png'

const MapPage = () => {
  const navigate = useNavigate()
  const { data } = useGetAllCoordinatesQuery()

  return (
    <div>{/* карта */}</div>
    // <Map
    //   style={{ width: '90vw', height: '75vh', margin: '50px auto 0' }}
    //   defaultState={{ center: [42.465139, 59.613292], zoom: 13 }}
    // >
    //   {data?.data?.map((item) => {
    //     return (
    //       <Placemark
    //         key={item.id}
    //         options={{
    //           draggable: false,
    //           iconLayout: 'default#image',
    //           iconImageHref: icon,
    //           iconImageSize: [35, 35],
    //         }}
    //         modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
    //         geometry={
    //           item?.coordinates?.latitude !== null &&
    //           item?.coordinates?.longitude !== null
    //             ? [item?.coordinates?.latitude, item?.coordinates?.longitude]
    //             : [25.117531, 55.134291]
    //         }
    //         properties={{ hintContent: `${formatPrice(item.price)} sum` }}
    //         onClick={() => navigate(`/info/${item.id}`)}
    //       />
    //     )
    //   })}
    // </Map>
  )
}

export default MapPage
