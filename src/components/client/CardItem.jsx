import { AiFillHeart, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { formatPrice } from "../../utils/shared";
import { useNavigate } from "react-router-dom/dist";
import { useAddToFavoriteMutation } from "../../store/index.api";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CardItem = ({ item }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();

  const handleClick = () => navigate(`/info/${item.id}`);

  const handleClickFavorite = (id) => {
    if (isAuthenticated) {
      addToFavorite(id);
    }
  };

  return (
    <Card className='max-w-[24rem] animate-fade-up overflow-hidden rounded-md border-[1px] group'>
      <CardHeader
        floated={false}
        shadow={false}
        color='transparent'
        className='relative h-56'
      >
        <img
          src={item?.images?.url}
          alt='image'
          onClick={handleClick}
          className='h-full w-full group-hover:scale-105 object-center transition duration-300 ease-linear cursor-pointer card-image'
        />
        <IconButton
          size='sm'
          variant='outlined'
          color='white'
          onClick={() => handleClickFavorite(item.id)}
          className='absolute top-3 right-3 rounded-full text-[20px] bg-black bg-opacity-30'
        >
          {isLoading && <AiOutlineLoading className='animate-spin' />}
          {!isLoading &&
            (item.favorite === 1 ? (
              <AiFillHeart color='red' />
            ) : (
              <AiOutlineHeart className='text-white' />
            ))}
        </IconButton>
      </CardHeader>
      <CardBody className='p-3 flex flex-col'>
        <Typography
          variant='h6'
          color='blue-gray'
          className='font-[Montserrat] text-sm'
        >
          {item.address}
        </Typography>
        <div className='text-gray-600 text-sm font-medium flex flex-col gap-auto'>
          <span>
            {t("rooms")}: <b>{item.room_count}</b> · {t("total_area")}:{" "}
            <b>
              {item.total_area}м<sup>2</sup>
            </b>
          </span>
          <span>
            {t("category")}: <b>{item.category.name}</b>
          </span>
          <span>{item.region.name}</span>
          <div className='flex items-center justify-between'>
            <b>
              {formatPrice(item.price)} {t("sum")}
            </b>
            <Button onClick={handleClick} size='sm' color='blue'>
              {t("more")}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
