import { Button, IconButton } from '@material-tailwind/react'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'
import {
  useCreateNewApartmentMutation,
  useGetAllRegionsQuery,
  useGetAllTagsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from '../../store/index.api'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

const CreatingForm = ({ setIsOpen }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm()
  const { data: categoriesData, isSuccess: categoriesIsSuccess } = useGetCategoriesQuery()
  const {
    data: subcategoriesData,
    isSuccess: subcategoriesIsSuccess,
    isFetching: subcategoryFetching,
  } = useGetSubcategoriesQuery({
    category_id: watch('category_id')?.value,
  })
  const { data: regionsData, isSuccess: regionsIsSuccess } = useGetAllRegionsQuery()
  const { data: tagsData, isSuccess: tagsIsSuccess } = useGetAllTagsQuery()
  const [tagsOptions, setTagsOptions] = useState()
  const [regionsOptions, setRegionsOptions] = useState()
  const [subcategoriesOptions, setSubcategoriesOptions] = useState()
  const [categoriesOptions, setCategoriesOptions] = useState()
  const [createApartment, { isSuccess, isLoading }] = useCreateNewApartmentMutation()
  const [coordinates, setCoordinates] = useState([42.465139, 59.613292])

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('category_id', data.category_id.value)
    formData.append('subcategory_id', data.subcategory_id.value)
    formData.append('region_id', data.region_id.value)
    formData.append(
      'tag_ids',
      data.tag_ids.map((el) => el.value),
    )
    formData.append('address', data.address)
    formData.append('price', data.price)
    formData.append('room_count', data.room_count)
    formData.append('total_area', data.total_area)
    formData.append('floor', data.floor)
    formData.append('floor_home', data.floor_home)
    formData.append('description', data.description)
    formData.append('latitude', data.placemarkCoordinates?.[0] || coordinates[0])
    formData.append('longitude', data.placemarkCoordinates?.[1] || coordinates[1])

    for (const image of data.images) {
      formData.append('images[]', image)
    }

    await createApartment(formData)
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
  }, [subcategoriesIsSuccess, subcategoryFetching])
  useEffect(() => {
    if (categoriesData?.data) {
      const mappedData = categoriesData?.data.map((el) => ({ value: el.id, label: el.name }))
      setCategoriesOptions(mappedData)
    }
  }, [categoriesIsSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="flex flex-col items-start gap-5 p-5 w-full text-black">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-semibold text-xl">{t('newApartment')}</h1>
          <IconButton
            onClick={() => setIsOpen((s) => !s)}
            variant="text"
            size="sm"
            className="text-[20px] flex justify-center items-center"
          >
            <CgClose />
          </IconButton>
        </div>
        <div className="flex flex-col items-start gap-5 w-full h-[50vh] pr-4 overflow-y-scroll">
          <label className="flex flex-col w-full border-b-[1px]">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('category')}:
              <Controller
                name="category_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectCategory')}
                    options={categoriesOptions}
                    className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
            {errors.category_id && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col w-full border-b-[1px]">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('subcategory')}:
              <Controller
                name="subcategory_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={!watch('category_id')}
                    placeholder={t('selectSubcategory')}
                    options={subcategoriesOptions}
                    className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
            {errors.subcategory_id && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('region')}:
              <Controller
                name="region_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectRegion')}
                    options={regionsOptions}
                    className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
            {errors.region_id && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('selectTags')}:
              <Controller
                name="tag_ids"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectTags')}
                    isMulti
                    options={tagsOptions}
                    className="basic-multi-select py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
            {errors.tag_ids && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('address')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="text"
                placeholder={t('address')}
                {...register('address', { required: true })}
              />
            </div>
            {errors.address && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('price')}:
              <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                <input
                  className="border py-1 px-2 rounded-md flex-grow"
                  type="number"
                  placeholder={t('price')}
                  {...register('price', { required: true })}
                />
                сум
              </div>
            </div>
            {errors.price && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('room_count')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="number"
                placeholder={t('room_count')}
                {...register('room_count', { required: true })}
              />
            </div>
            {errors.room_count && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('total_area')}:
              <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                <input
                  className="border py-1 px-2 rounded-md flex-grow"
                  type="number"
                  placeholder={t('total_area')}
                  {...register('total_area', { required: true })}
                />
                m<sup>2</sup>
              </div>
            </div>
            {errors.total_area && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('floor')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="number"
                placeholder={t('floor')}
                {...register('floor', { required: true })}
              />
            </div>
            {errors.floor && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('total_floor')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="number"
                placeholder={t('total_floor')}
                {...register('floor_home', { required: true })}
              />
            </div>
            {errors.floor_home && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('information')}:
              <textarea
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full min-h-[120px] resize-none"
                type="text"
                placeholder={t('information')}
                {...register('description', { required: true })}
              />
            </div>
            {errors.description && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('coordinates')}:
              <YMaps query={{ apikey: '17de01a8-8e68-4ee2-af08-82eed92f99ec' }}>
                <Map
                  style={{ width: '50%', height: '300px' }}
                  defaultState={{ center: [42.465139, 59.613292], zoom: 13 }}
                >
                  <Placemark
                    options={{
                      draggable: true,
                    }}
                    geometry={coordinates}
                    instanceRef={(ref) => {
                      if (ref) {
                        register('placemarkCoordinates', ref.geometry._coordinates, {
                          required: true,
                        })
                        setCoordinates(ref.geometry._coordinates)
                      }
                    }}
                  />
                </Map>
              </YMaps>
            </div>
            {errors.placemarkCoordinates && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col w-full border-b-[1px]">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('images')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="file"
                placeholder={t('images')}
                multiple
                accept="image/*"
                {...register('images', { required: true })}
              />
            </div>
            {errors.images && <span className="text-red-500">{t('errorFillForm')}</span>}
          </label>
        </div>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
          className="items-center justify-center rounded-md float-right flex gap-5"
          variant="gradient"
          size="md"
          color="blue"
        >
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
          {t('send')}
        </Button>
      </div>
    </form>
  )
}

export default CreatingForm
