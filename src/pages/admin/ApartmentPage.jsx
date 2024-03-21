import { FaPencil } from 'react-icons/fa6'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from '@material-tailwind/react'
import { IoAdd } from 'react-icons/io5'
import { useADeleteApartmentMutation, useGetAllApartmentsQuery } from '../../store/index.api'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import UserCreateModal from '../../components/UserCreateModal'
import { useNavigate } from 'react-router-dom'

const TABLE_HEAD = ['Адрес', 'Категория', 'Цена', 'Регион', 'Комната', 'Общая площадь', 'Действия']

const ApartmentPage = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const { data } = useGetAllApartmentsQuery({
    page,
    limit: 20,
    lan: 'ru',
  })
  const [deleteApartment] = useADeleteApartmentMutation()
  const totalPages = Math.ceil(data?.total / 20) ?? 1

  const handleDelete = (id) => {
    deleteApartment(id)
  }

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
              onClick={() => setOpen(true)}
              className="flex items-center gap-3"
              color="blue"
              size="sm"
            >
              <IoAdd size="20" /> Добавить
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
              ({ id, address, category, region, price, room_count, total_area }, index) => {
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
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {price}
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
                      <Tooltip content="Edit Apartment">
                        <IconButton
                          onClick={() => navigate(`/admin/apartments/${id}`)}
                          variant="text"
                        >
                          <FaPencil color="blue" className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Apartment">
                        <IconButton onClick={() => handleDelete(id)} variant="text">
                          <FaRegTrashAlt color="red" className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
      <UserCreateModal open={open} setIsOpen={setOpen} />
    </Card>
  )
}

export default ApartmentPage
