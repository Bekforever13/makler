import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from '@material-tailwind/react'
import { useMGetApartmentsQuery } from '../../store/index.api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { formatPrice } from '../../utils/shared'

const TABLE_HEAD = [
  'Адрес',
  'Категория',
  'Статус',
  'Цена',
  'Регион',
  'Комната',
  'Общая площадь',
  'Действия',
]

const ModeratorHome = () => {
  const [page, setPage] = useState(1)
  const [active, setActive] = useState('all')
  const [confirmed, setConfirmed] = useState(1)
  const [waiting, setWaiting] = useState(1)
  const [canceled, setCanceled] = useState(1)
  const navigate = useNavigate()
  const { data } = useMGetApartmentsQuery({
    page,
    limit: 20,
    confirmed: confirmed,
    waiting: waiting,
    canceled: canceled,
  })

  const totalPages = Math.ceil(data?.total / 20) ?? 1

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Дома
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Здесь находятся информации о домах
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button
              className={active === 'all' ? 'text-white' : 'text-gray-900'}
              variant="gradient"
              color={active === 'all' ? 'blue' : 'light-blue'}
              size="sm"
              onClick={() => {
                setActive('all')
                setConfirmed(1)
                setWaiting(1)
                setCanceled(1)
              }}
            >
              Все
            </Button>
            <Button
              className={active === 'confirmed' ? 'text-white' : 'text-gray-900'}
              variant="gradient"
              color={active === 'confirmed' ? 'blue' : 'light-blue'}
              size="sm"
              onClick={() => {
                setActive('confirmed')
                setConfirmed(1)
                setWaiting(0)
                setCanceled(0)
              }}
            >
              Подтвержденные
            </Button>
            <Button
              className={active === 'cancelled' ? 'text-white' : 'text-gray-900'}
              variant="gradient"
              color={active === 'cancelled' ? 'blue' : 'light-blue'}
              size="sm"
              onClick={() => {
                setActive('cancelled')
                setConfirmed(0)
                setWaiting(0)
                setCanceled(1)
              }}
            >
              Отклоненные
            </Button>
            <Button
              className={active === 'waiting' ? 'text-white' : 'text-gray-900'}
              variant="gradient"
              color={active === 'waiting' ? 'blue' : 'light-blue'}
              size="sm"
              onClick={() => {
                setActive('waiting')
                setConfirmed(0)
                setWaiting(1)
                setCanceled(0)
              }}
            >
              Ожидающие
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map(
              ({ id, address, status, category, region, price, room_count, total_area }, index) => {
                const isLast = index === data?.data?.length - 1
                const classes = isLast ? 'px-4 py-3' : 'px-4 py-3 border-b border-blue-gray-50'

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {category.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal py-2 px-4 rounded-lg text-center text-white ${
                          status === 'confirmed'
                            ? 'bg-green-300'
                            : status === 'canceled'
                            ? 'bg-red-300'
                            : 'bg-yellow-300 text-black'
                        }`}
                      >
                        {status === 'confirmed'
                          ? 'Подтверждён'
                          : status === 'canceled'
                          ? 'Отклонён'
                          : 'В ожидании'}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {formatPrice(price) + " сум"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {region.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {room_count} комнат
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {total_area} м<sup>2</sup>
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Button
                        onClick={() => navigate(`/moderator/apartments/${id}`)}
                        variant="text"
                        className="flex items-center gap-3 w-full"
                      >
                        <FaRegEye color="blue" size="18" />
                        Смотреть
                      </Button>
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center gap-5 border-t border-blue-gray-50 p-4">
        <Button
          color="blue"
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          size="sm"
        >
          Назад
        </Button>
        <div className="flex items-center gap-2">{page + ' / ' + totalPages}</div>
        <Button
          disabled={page === totalPages}
          color="blue"
          variant="outlined"
          onClick={() => setPage((prev) => prev + 1)}
          size="sm"
        >
          Вперёд
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ModeratorHome
