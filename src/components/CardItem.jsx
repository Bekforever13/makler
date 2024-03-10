import { MdLocationPin } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
// import { AiTwotoneHeart } from "react-icons/ai";
import { AiOutlineHeart } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { Card, CardBody, CardHeader, IconButton, Typography } from '@material-tailwind/react'
import { formatPrice } from '../utils/shared'
import { useNavigate } from 'react-router-dom/dist'
import { useAddToFavoriteMutation } from '../store/index.api'

const CardItem = ({ item }) => {
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
          src={item.images.url}
          alt="image 3"
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
            <AiFillHeart color='red' />
          ) : (
            <AiOutlineHeart className="text-white" />
          )}
        </IconButton>
      </CardHeader>
      <CardBody onClick={handleClick} className="p-3">
        <Typography variant="h6" color="blue-gray" className="font-[Montserrat] text-[18px]">
          {formatPrice(item.price)} swm
        </Typography>
        <div className="mt-1">
          <Typography color="gray" className="text-[15px] font-medium flex items-center gap-1">
            <BsHouseDoor />
            <span>
              {item.room_count} bo'lme kv {item.total_area}m<sup>2</sup>
            </span>
          </Typography>
          <Typography color="gray" className="text-[15px] font-medium flex gap-1">
            <MdLocationPin className="text-red-500 mt-[3px]" />
            <span>{item.region.name}</span>
          </Typography>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardItem
