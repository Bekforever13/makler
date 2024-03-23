import { MdLocationPin } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
// import { AiTwotoneHeart } from "react-icons/ai";
import { AiOutlineHeart } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { Card, CardBody, CardHeader, IconButton, Typography } from '@material-tailwind/react'
import { formatPrice } from '../../utils/shared'
import { useNavigate } from 'react-router-dom/dist'
import { useAddToFavoriteMutation } from '../../store/index.api'
import { useTranslation } from 'react-i18next'

const CardItem = ({ item }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [addToFavorite] = useAddToFavoriteMutation()

  const handleClick = () => navigate(`/info/${item.id}`)

  const handleClickFavorite = (id) => addToFavorite(id)

  return (
    <Card className="max-w-[24rem] overflow-hidden rounded-md border-[1px] cursor-pointer group">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none min-h-[250px]"
      >
        <img
          onClick={handleClick}
          src={item?.images?.url}
          alt="image"
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300 ease-linear brightness-90"
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="white"
          onClick={() => handleClickFavorite(item.id)}
          className="!absolute top-3 right-3 rounded-full text-[20px] bg-black bg-opacity-30"
        >
          {item.favorite === 1 ? (
            <AiFillHeart color="red" />
          ) : (
            <AiOutlineHeart className="text-white" />
          )}
        </IconButton>
      </CardHeader>
      <CardBody onClick={handleClick} className="p-3">
        <Typography variant="h6" color="blue-gray" className="font-[Montserrat] text-[18px]">
          {formatPrice(item.price)} {t('sum')}
        </Typography>
        <div className="mt-1">
          <div className="text-gray-600 text-[15px] font-medium flex items-center gap-3">
            <BsHouseDoor size="22" />
            <div className="flex items-start flex-col">
              <span>
                {t('rooms')}: {item.room_count}
              </span>
              <span>
                {t('total_area')}: {item.total_area}м<sup>2</sup>
              </span>
              <span>
                {t('category')}: {item.category.name}
              </span>
            </div>
          </div>
          <Typography color="gray" className="text-[15px] font-medium flex items-center gap-3">
            <MdLocationPin size="22" className="text-red-500 mt-[3px]" />
            <span>{item.region.name}</span>
          </Typography>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardItem
