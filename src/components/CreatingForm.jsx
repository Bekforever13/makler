import { Button, IconButton } from '@material-tailwind/react'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'
import {
  useCreateNewApartmentMutation,
  useGetAllRegionsQuery,
  useGetAllTagsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from '../store/index.api'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const CreatingForm = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()
  const { data: categoriesData, isSuccess: categoriesIsSuccess } = useGetCategoriesQuery()
  const { data: subcategoriesData, isSuccess: subcategoriesIsSuccess } = useGetSubcategoriesQuery()
  const { data: regionsData, isSuccess: regionsIsSuccess } = useGetAllRegionsQuery()
  const { data: tagsData, isSuccess: tagsIsSuccess } = useGetAllTagsQuery()
  const [tagsOptions, setTagsOptions] = useState()
  const [regionsOptions, setRegionsOptions] = useState()
  const [subcategoriesOptions, setSubcategoriesOptions] = useState()
  const [categoriesOptions, setCategoriesOptions] = useState()
  const [createApartment] = useCreateNewApartmentMutation()

  const onSubmit = (data) => {
    createApartment({
      ...data,
      tags: { ids: data.tags.map((el) => el.value), tag_names: data.tags.map((el) => el.label) },
    })
    setIsOpen(false)
    reset()
  }

  useEffect(() => {
    if (tagsData?.data) {
      const mappedData = tagsData?.data.map((el) => ({ value: el.id, label: el.name }))
      setTagsOptions(mappedData)
    }
  }, [tagsIsSuccess])
  useEffect(() => {
    if (regionsData?.data) {
      const mappedData = regionsData?.data.map((el) => ({ value: el.id, label: el.name }))
      setRegionsOptions(mappedData)
    }
  }, [regionsIsSuccess])
  useEffect(() => {
    if (subcategoriesData?.data) {
      const mappedData = subcategoriesData?.data.map((el) => ({ value: el.id, label: el.name }))
      setSubcategoriesOptions(mappedData)
    }
  }, [subcategoriesIsSuccess])
  useEffect(() => {
    if (categoriesData?.data) {
      const mappedData = categoriesData?.data.map((el) => ({ value: el.id, label: el.name }))
      setCategoriesOptions(mappedData)
    }
  }, [categoriesIsSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-5 p-5 w-full text-black">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-semibold text-xl">Новое объявление</h1>
          <IconButton
            onClick={() => setIsOpen((s) => !s)}
            variant="text"
            size="sm"
            className="text-[20px] flex justify-center items-center"
          >
            <CgClose />
          </IconButton>
        </div>
        <div className="flex flex-col items-start gap-5 w-full h-[600px] pr-4 overflow-y-scroll">
          <label className="flex items-center justify-between w-full">
            Санат:
            <Controller
              name="category_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={categoriesOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
            {/* <select
              className="border py-1 px-2 rounded-md w-1/2"
              {...register('category_id', { required: true })}
            >
              {categoriesData?.data?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select> */}
          </label>
          <label className="flex items-center justify-between w-full">
            Санатша:
            <Controller
              name="subcategory_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={subcategoriesOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
            {/* <select
              className="border py-1 px-2 rounded-md w-1/2"
              {...register('subcategory_id', { required: true })}
            >
              {subcategoriesData?.data?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select> */}
          </label>
          <label className="flex items-center justify-between w-full">
            Аймақ:
            <Controller
              name="region_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={regionsOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
            {/* <select
              className="border py-1 px-2 rounded-md w-1/2"
              {...register('region_id', { required: true })}
            >
              {regionsData?.data?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select> */}
          </label>
          <label className="flex items-center justify-between w-full">
            Тегтер:
            <Controller
              name="tags"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={tagsOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Айналу:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="text"
              placeholder="address"
              {...register('address', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Бахасы:
            <div className="w-1/2 flex items-center gap-1">
              <input
                className="border py-1 px-2 rounded-md flex-grow"
                type="number"
                placeholder="price"
                {...register('price', { required: true })}
              />
              sum
            </div>
          </label>
          <label className="flex items-center justify-between w-full">
            Бөлмелер саны:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="room_count"
              {...register('room_count', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Жалпы алаңы:
            <div className="w-1/2 flex items-center gap-1">
              <input
                className="border py-1 px-2 rounded-md flex-grow"
                type="number"
                placeholder="total_area"
                {...register('total_area', { required: true })}
              />
              m<sup>2</sup>
            </div>
          </label>
          <label className="flex items-center justify-between w-full">
            Еден:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="floor"
              {...register('floor', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Ғимараттағы еден:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="floor_home"
              {...register('floor_home', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Түсіндірме:
            <textarea
              className="border py-1 px-2 rounded-md w-1/2 min-h-[120px] resize-none"
              type="text"
              placeholder="description"
              {...register('description', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Суреттер:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="file"
              placeholder="images"
              multiple
              accept="image/*"
              {...register('images', { required: true })}
            />
          </label>
        </div>
        <Button
          fullWidth
          type="submit"
          className="items-center justify-center rounded-md float-right"
          variant="gradient"
          size="md"
          color="blue"
        >
          Жіберу
        </Button>
      </div>
    </form>
  )
}

export default CreatingForm
