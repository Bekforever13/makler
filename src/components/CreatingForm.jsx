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
  const [createApartment, { isSuccess }] = useCreateNewApartmentMutation()

  const onSubmit = (data) => {
    createApartment({
      ...data,
      tags: { tag_names: data.tags.tag_names.split(' '), ids: data.tags.ids.map((el) => el.value) },
      category_id: data.category_id[0].value,
      region_id: data.region_id[0].value,
      subcategory_id: data.subcategory_id[0].value,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
      reset()
    }
  }, [isSuccess])

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
            Категория:
            <Controller
              name="category_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoriesOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Подкатегория:
            <Controller
              name="subcategory_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={subcategoriesOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Регион:
            <Controller
              name="region_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={regionsOptions}
                  className="basic-multi-select border py-1 px-2 rounded-md w-1/2"
                  classNamePrefix="select"
                />
              )}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Выберите Теги:
            <Controller
              name="tags.ids"
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
            Напишите вручную теги:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="text"
              placeholder="tag names"
              {...register('tags.tag_names', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Адрес:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="text"
              placeholder="address"
              {...register('address', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Цена:
            <div className="w-1/2 flex items-center gap-1">
              <input
                className="border py-1 px-2 rounded-md flex-grow"
                type="number"
                placeholder="price"
                {...register('price', { required: true })}
              />
              сум
            </div>
          </label>
          <label className="flex items-center justify-between w-full">
            Количество комнат:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="room_count"
              {...register('room_count', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Общая площадь:
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
            Этаж:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="floor"
              {...register('floor', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Всего этажей в доме:
            <input
              className="border py-1 px-2 rounded-md w-1/2"
              type="number"
              placeholder="floor_home"
              {...register('floor_home', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Описание:
            <textarea
              className="border py-1 px-2 rounded-md w-1/2 min-h-[120px] resize-none"
              type="text"
              placeholder="description"
              {...register('description', { required: true })}
            />
          </label>
          <label className="flex items-center justify-between w-full">
            Изображения:
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
