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
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'
import { IMaskInput } from 'react-imask'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

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
  const {
    data: subcategoriesData,
    isSuccess: subcategoriesIsSuccess,
    isFetching: subcategoryFetching,
  } = useGetSubcategoriesQuery({
    category_id: watch('category_id')?.value,
  })
  const { data: categoriesData, isSuccess: categoriesIsSuccess } =
    useGetCategoriesQuery()
  const { data: regionsData, isSuccess: regionsIsSuccess } =
    useGetAllRegionsQuery()
  const { data: tagsData, isSuccess: tagsIsSuccess } = useGetAllTagsQuery()
  const [price, setPrice] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [tagsOptions, setTagsOptions] = useState()
  const [regionsOptions, setRegionsOptions] = useState()
  const [files, setFiles] = useState([])
  const ref = useRef(null)
  const inputRef = useRef(null)
  const [subcategoriesOptions, setSubcategoriesOptions] = useState()
  const [categoriesOptions, setCategoriesOptions] = useState()
  const [createApartment, { isSuccess, isLoading }] =
    useCreateNewApartmentMutation()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('category_id', data.category_id.value)
    formData.append('subcategory_id', data.subcategory_id.value)
    formData.append('region_id', data.region_id.value)
    formData.append(
      'tag_ids',
      selectedTags.map((el) => el.value),
    )
    formData.append('address', data.address)
    formData.append('price', data.price)
    formData.append('room_count', data.room_count)
    formData.append('total_area', data.total_area)
    formData.append('floor', data.floor)
    formData.append('floor_home', data.floor_home)
    formData.append('description', data.description)
    // formData.append(
    //   'latitude',
    //   data.placemarkCoordinates?.[0] || coordinates[0],
    // )
    // formData.append(
    //   'longitude',
    //   data.placemarkCoordinates?.[1] || coordinates[1],
    // )

    for (const image of files) {
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
  }, [subcategoriesIsSuccess, subcategoryFetching])
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
            {errors.category_id && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
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
            {errors.subcategory_id && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
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
            {errors.region_id && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
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
            {errors.address && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('price')}:
              <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <IMaskInput
                      mask={Number}
                      {...field}
                      radix="."
                      thousandsSeparator=" "
                      value={price}
                      unmask={false}
                      ref={ref}
                      className="border py-1 px-2 rounded-md flex-grow"
                      inputRef={inputRef}
                      onAccept={(_, mask) => setPrice(mask._unmaskedValue)}
                      placeholder={t('price')}
                    />
                  )}
                />
                сум
              </div>
            </div>
            {errors.price && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
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
            {errors.room_count && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('total_area')}:
              <div className="md:w-1/2 sm:w-full flex items-center gap-1">
                <input
                  className="border py-1 px-2 rounded-md flex-grow"
                  type="number"
                  placeholder={t('total_area')}
                  {...register('total_area')}
                />
                m<sup>2</sup>
              </div>
            </div>
            {errors.total_area && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('floor')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="number"
                placeholder={t('floor')}
                {...register('floor')}
              />
            </div>
            {errors.floor && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('total_floor')}:
              <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="number"
                placeholder={t('total_floor')}
                {...register('floor_home')}
              />
            </div>
            {errors.floor_home && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('selectTags')}:
              <div className="md:w-1/2 sm:w-full flex flex-col gap-3">
                <div className="flex items-center flex-wrap gap-3">
                  {selectedTags?.map((el) => (
                    <span
                      key={el.value}
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.filter((tag) => tag.value !== el.value),
                        )
                        setTagsOptions((prev) => [...prev, el])
                      }}
                      className="bg-blue-500 py-1 px-3 rounded-md hover:bg-blue-300 cursor-pointer"
                    >
                      - {el.label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  {tagsOptions?.map((tag) => (
                    <span
                      onClick={() => {
                        const filter = tagsOptions.filter(
                          (el) => el.value !== tag.value,
                        )
                        setTagsOptions(filter)
                        setSelectedTags((prev) => [...prev, tag])
                      }}
                      key={tag.value}
                      className="bg-blue-200 py-1 px-3 rounded-md hover:bg-blue-300 cursor-pointer"
                    >
                      + {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {errors.tag_ids && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col border-b-[1px] w-full">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('information')}:
              <textarea
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full min-h-[120px] resize-none"
                type="text"
                placeholder={t('information')}
                {...register('description', { maxLength: 255 })}
              />
            </div>
            {errors.description && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
          </label>
          <label className="flex flex-col w-full border-b-[1px]">
            <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
              {t('images')}:
              <div className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full">
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple
                  allowReorder
                  maxFiles={10}
                  {...register('images')}
                  name="files"
                  labelIdle='Перетащите сюда файлы или <span class="filepond--label-action">выберите вручную</span>'
                />
                {/* <Controller
                  name="images"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FilePond
                      files={files}
                      {...field}
                      onupdatefiles={setFiles}
                      allowMultiple
                      allowReorder
                      maxFiles={10}
                      {...register('images', { required: true })}
                      name="files" 
                      labelIdle='Перетащите сюда файлы или <span class="filepond--label-action">выберите вручную</span>'
                    />
                  )}
                /> */}
              </div>
              {/* <input
                className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                type="file"
                placeholder={t('images')}
                multiple
                accept="image/*"
                {...register('images', { required: true })}
              /> */}
            </div>
            {errors.images && (
              <span className="text-red-500">{t('errorFillForm')}</span>
            )}
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
          {isLoading && <AiOutlineLoading className="animate-spin" />}
          {t('send')}
        </Button>
      </div>
    </form>
  )
}

export default CreatingForm
