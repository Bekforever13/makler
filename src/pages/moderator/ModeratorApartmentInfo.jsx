import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import {
  useMEditApartmentStatusMutation,
  useMGetOneApartmentQuery,
} from '../../store/index.api'
import icon from '../../images/image/location.png'

const ModeratorApartmentInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useMGetOneApartmentQuery(id)
  const [editStatus] = useMEditApartmentStatusMutation()

  const handleClickAction = (status) => {
    editStatus({ id, status })
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate('/moderator')}
            color="blue"
            size="sm"
            className="flex items-center gap-3"
          >
            <IoMdArrowRoundBack size="18" />
            <span>Назад</span>
          </Button>
          <div className="flex items-center gap-5">
            <Button
              className="text-white"
              variant="gradient"
              color="red"
              size="sm"
              onClick={() => handleClickAction('canceled')}
            >
              Отклонить
            </Button>
            <Button
              className="text-white"
              variant="gradient"
              color="green"
              size="sm"
              onClick={() => handleClickAction('confirmed')}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-10">
          <div className="w-full h-full">
            <div className="flex flex-col items-start gap-5 w-full pr-4 overflow-y-scroll">
              <label className="flex flex-col w-full border-b-[1px]">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Категория:
                  <span>{data?.data?.category.name}</span>
                </div>
              </label>
              <label className="flex flex-col w-full border-b-[1px]">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Подкатегория:
                  <span>{data?.data?.subcategory.name}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Регион:
                  <span>{data?.data?.region.name}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Теги:
                  <span>{data?.data?.tags.map((el) => el.name + ', ')}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Адрес:
                  <span>{data?.data?.address}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Цена:
                  <div className="md:w-1/2 sm:w-full flex items-center justify-end gap-1">
                    <span>{data?.data?.price}</span>
                    сум
                  </div>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Количество комнат:
                  <span>{data?.data?.room_count}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Общая площадь:
                  <div className="md:w-1/2 sm:w-full flex items-center justify-end gap-1">
                    <span>{data?.data?.total_area}</span>m<sup>2</sup>
                  </div>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Этаж:
                  <span>{data?.data?.floor}</span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Этажей в доме:
                  <span>{data?.data?.floor_home}</span>
                </div>
              </label>
              <label className="flex flex-col w-full border-b-[1px]">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Статус:
                  <span
                    className={`font-normal py-2 px-4 rounded-lg text-center ${
                      data?.data?.status === 'confirmed'
                        ? 'bg-green-300 text-white'
                        : data?.data?.status === 'canceled'
                        ? 'bg-red-300 text-white'
                        : 'bg-yellow-300 text-black'
                    }`}
                  >
                    {data?.data?.status === 'confirmed'
                      ? 'Подтверждён'
                      : data?.data?.status === 'canceled'
                      ? 'Отклонён'
                      : 'В ожидании'}
                  </span>
                </div>
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Информация:
                  <p>{data?.data?.description}</p>
                </div>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <label className="flex flex-col w-full border-b-[1px]">
              <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                Координаты:
                <div className="w-1/2 h-full">
                  {/* карта */}
                  {/* <Map
                    style={{ width: '100%', height: '50vh' }}
                    defaultState={{
                      center: [
                        data?.data?.coordinates.latitude,
                        data?.data?.coordinates.longitude,
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
                        data?.data?.coordinates.latitude,
                        data?.data?.coordinates.longitude,
                      ]}
                    />
                  </Map> */}
                </div>
              </div>
            </label>
            <div className="flex items-start flex-wrap gap-5">
              {data?.data?.images.map((el) => (
                <div key={el.id} className="w-[250px]">
                  <img src={el.url} alt={el.url} className="max-w-[250px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default ModeratorApartmentInfo
