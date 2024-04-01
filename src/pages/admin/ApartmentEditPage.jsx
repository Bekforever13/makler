import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FaSave } from 'react-icons/fa'
import { Controller, useForm } from 'react-hook-form'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import {
  useAAddImageToApartmentMutation,
  useADeleteImageMutation,
  useAEditApartmentMutation,
  useGetAllRegionsQuery,
  useGetAllTagsQuery,
  useGetCategoriesQuery,
  useGetOneApartmentsQuery,
  useGetSubcategoriesQuery,
} from '../../store/index.api'
import Select from 'react-select'
import icon from '../../images/image/location.png'

const ApartmentEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()
  const { data, isSuccess } = useGetOneApartmentsQuery({ id })
  const [coordinates, setCoordinates] = useState([42.465139, 59.613292])
  const { data: categoriesData, isSuccess: categoriesIsSuccess } =
    useGetCategoriesQuery()
  const { data: subcategoriesData, isSuccess: subcategoriesIsSuccess } =
    useGetSubcategoriesQuery()
  const { data: regionsData, isSuccess: regionsIsSuccess } =
    useGetAllRegionsQuery()
  const { data: tagsData, isSuccess: tagsIsSuccess } = useGetAllTagsQuery()
  const [tagsOptions, setTagsOptions] = useState()
  const [regionsOptions, setRegionsOptions] = useState()
  const [subcategoriesOptions, setSubcategoriesOptions] = useState()
  const [categoriesOptions, setCategoriesOptions] = useState()
  const [editApartment] = useAEditApartmentMutation()
  const [deleteImage] = useADeleteImageMutation()
  const [addImage, { isLoading }] = useAAddImageToApartmentMutation()

  useEffect(() => {
    if (data?.data) {
      reset({
        ...data?.data,
        category_id: {
          label: data.data.category.name,
          value: data.data.category.id,
        },
        subcategory_id: {
          label: data.data.subcategory.name,
          value: data.data.subcategory.id,
        },
        region_id: { label: data.data.region.name, value: data.data.region.id },
        tag_ids: data.data.tags.map((el) => ({ label: el.name, value: el.id })),
      })
      setCoordinates([
        data?.data?.coordinates.latitude,
        data?.data?.coordinates.longitude,
      ])
    }
  }, [isSuccess])

  const onSubmit = (data) => {
    editApartment({
      category_id: data.category_id.value,
      subcategory_id: data.subcategory_id.value,
      region_id: data.region_id.value,
      id: data.id,
      tag_ids: data.tag_ids.map((el) => el.value),
      address: data.address,
      price: data.price,
      room_count: data.room_count,
      total_area: data.total_area,
      floor: data.floor,
      floor_home: data.floor_home,
      description: data.description,
      latitude: data.placemarkCoordinates?.[0] || coordinates[0],
      longitude: data.placemarkCoordinates?.[1] || coordinates[1],
    })
  }

  useEffect(() => {
    if (tagsData?.data) {
      const mappedData = tagsData?.data.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setTagsOptions(mappedData)
    }
  }, [tagsIsSuccess])
  useEffect(() => {
    if (regionsData?.data) {
      const mappedData = regionsData?.data.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setRegionsOptions(mappedData)
    }
  }, [regionsIsSuccess])
  useEffect(() => {
    if (subcategoriesData?.data) {
      const mappedData = subcategoriesData?.data.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setSubcategoriesOptions(mappedData)
    }
  }, [subcategoriesIsSuccess])
  useEffect(() => {
    if (categoriesData?.data) {
      const mappedData = categoriesData?.data.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesOptions(mappedData)
    }
  }, [categoriesIsSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/admin/apartments')}
              color="blue"
              size="sm"
              className="flex items-center gap-3"
            >
              <IoMdArrowRoundBack size="18" />
              <span>Назад</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-10">
            <div className="w-full h-full">
              <div className="flex flex-col items-start gap-5 w-full pr-4 overflow-y-scroll">
                <label className="flex flex-col w-full border-b-[1px]">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Категория:
                    <Controller
                      name="category_id"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Выберите категорию"
                          options={categoriesOptions}
                          className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                          classNamePrefix="select"
                        />
                      )}
                    />
                  </div>
                  {errors.category_id && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col w-full border-b-[1px]">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Подкатегория:
                    <Controller
                      name="subcategory_id"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Выберите подкатегорию"
                          options={subcategoriesOptions}
                          className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                          classNamePrefix="select"
                        />
                      )}
                    />
                  </div>
                  {errors.subcategory_id && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Регион:
                    <Controller
                      name="region_id"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Выберите регион"
                          options={regionsOptions}
                          className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                          classNamePrefix="select"
                        />
                      )}
                    />
                  </div>
                  {errors.region_id && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Выберите теги:
                    <Controller
                      name="tag_ids"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Выберите теги"
                          isMulti
                          options={tagsOptions}
                          className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                          classNamePrefix="select"
                        />
                      )}
                    />
                  </div>
                  {errors.tag_ids && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Адрес:
                    <input
                      className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                      type="text"
                      placeholder="Адрес"
                      {...register('address', { required: true })}
                    />
                  </div>
                  {errors.address && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Цена:
                    <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                      <input
                        className="border py-1 px-2 rounded-md flex-grow"
                        type="number"
                        placeholder="Цена"
                        {...register('price', { required: true })}
                      />
                      сум
                    </div>
                  </div>
                  {errors.price && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Количество комнат:
                    <input
                      className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                      type="number"
                      placeholder="Количество комнат"
                      {...register('room_count', { required: true })}
                    />
                  </div>
                  {errors.room_count && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Общая площадь:
                    <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                      <input
                        className="border py-1 px-2 rounded-md flex-grow"
                        type="number"
                        placeholder="Общая площадь"
                        {...register('total_area', { required: true })}
                      />
                      m<sup>2</sup>
                    </div>
                  </div>
                  {errors.total_area && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Этаж:
                    <input
                      className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                      type="number"
                      placeholder="Этаж"
                      {...register('floor', { required: true })}
                    />
                  </div>
                  {errors.floor && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Этажей в доме:
                    <input
                      className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                      type="number"
                      placeholder="Этажей в доме"
                      {...register('floor_home', { required: true })}
                    />
                  </div>
                  {errors.floor_home && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
                <label className="flex flex-col border-b-[1px] w-full">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Информация:
                    <textarea
                      className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full min-h-[200px] resize-none"
                      type="text"
                      placeholder="Информация"
                      {...register('description', { required: true })}
                    />
                  </div>
                  {errors.description && (
                    <span className="text-red-500">
                      Пожалуйста, заполните поле
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <label className="flex flex-col w-full border-b-[1px]">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Координаты:
                  <div className="w-1/2 h-full">
                    <YMaps
                      query={{ apikey: '17de01a8-8e68-4ee2-af08-82eed92f99ec' }}
                    >
                      <Map
                        style={{ width: '100%', height: '70vh' }}
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
                            draggable: true,
                            iconLayout: 'default#image',
                            iconImageHref: icon,
                            iconImageSize: [35, 35],
                          }}
                          geometry={coordinates}
                          instanceRef={(ref) => {
                            if (ref) {
                              register(
                                'placemarkCoordinates',
                                ref.geometry._coordinates,
                                {
                                  required: true,
                                },
                              )
                              setCoordinates(ref.geometry._coordinates)
                            }
                          }}
                        />
                      </Map>
                    </YMaps>
                  </div>
                </div>
              </label>
              <div className="flex items-start flex-wrap gap-5">
                <label className="flex flex-col w-full border-b-[1px]">
                  <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                    Изображения:
                    <>
                      {isLoading && (
                        <svg
                          className="text-gray-300 animate-spin"
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                        >
                          <path
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-900"
                          ></path>
                        </svg>
                      )}
                      <input
                        className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                        type="file"
                        placeholder="Изображения"
                        multiple
                        disabled={isLoading}
                        onChange={(e) => {
                          addImage({
                            apartment_id: id,
                            images: e.target.files,
                          })
                        }}
                        accept="image/*"
                      />
                    </>
                  </div>
                </label>
                {data?.data?.images.map((el) => (
                  <div key={el.id} className="w-[250px]">
                    <img src={el.url} alt={el.url} className="max-w-[250px]" />
                    <Button
                      onClick={() =>
                        deleteImage({ image_id: el.id, apartment_id: id })
                      }
                      type="button"
                      color="red"
                      size="sm"
                      className="-translate-y-[30px]"
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              color="blue"
              size="sm"
              className="flex items-center gap-3 w-fit"
            >
              <FaSave size="18" />
              <span>Сохранить</span>
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  )
}

export default ApartmentEditPage
