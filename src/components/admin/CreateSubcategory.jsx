import { Card, Dialog } from '@material-tailwind/react'
import {
  useACreateSubcategoryMutation,
  useAEditSubcategoryMutation,
  useGetCategoriesQuery,
} from '../../store/index.api'
import { Button, IconButton } from '@material-tailwind/react'
import { CgClose } from 'react-icons/cg'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { setSubcategoryToEdit } from '../../store/slices/subcategory.slice'
import { AiOutlineLoading } from 'react-icons/ai'

const CreateSubcategoryModal = ({ open, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()
  const dispatch = useDispatch()
  const [categoriesOptions, setCategoriesOptions] = useState()
  const { subcategoryToEdit } = useSelector((s) => s.subcategory)
  const [createSubcategory, { isLoading, isSuccess }] =
    useACreateSubcategoryMutation()
  const [editSubcategory, { isSuccess: EditSuccess, isLoading: EditLoading }] =
    useAEditSubcategoryMutation()
  const { data: categoriesData, isSuccess: categoriesIsSuccess } =
    useGetCategoriesQuery({ lan: 'ru' })

  const onSubmit = (data) => {
    if (subcategoryToEdit) {
      editSubcategory({
        id: subcategoryToEdit.id,
        category_id: data.category_id.value,
        name: {
          ru: data.ru,
          kr: data.kr,
          qr: data.qr,
        },
      })
    } else {
      createSubcategory({
        category_id: data.category_id.value,
        name: {
          ru: data.ru,
          kr: data.kr,
          qr: data.qr,
        },
      })
    }
  }

  useEffect(() => {
    if (isSuccess || EditSuccess) {
      reset({
        ru: '',
        qr: '',
        kr: '',
      })
      setIsOpen(false)
      dispatch(setSubcategoryToEdit(null))
    }
  }, [isSuccess, EditSuccess])

  useEffect(() => {
    if (subcategoryToEdit) {
      reset({
        category_id: categoriesOptions.find(
          (el) => el.value === subcategoryToEdit.category_id,
        ),
        ru: subcategoryToEdit.name.ru,
        qr: subcategoryToEdit.name.qr,
        kr: subcategoryToEdit.name.kr,
      })
    }
  }, [subcategoryToEdit])

  useEffect(() => {
    if (!open) {
      reset({
        ru: '',
        qr: '',
        kr: '',
      })
      dispatch(setSubcategoryToEdit(null))
    }
  }, [open])

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
    <Dialog
      open={open}
      handler={() => setIsOpen(false)}
      className="w-full shadow-none"
      size="lg"
    >
      <Card className="w-full rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-5 p-5 w-full text-black">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-semibold text-xl">Новая подкатегория</h1>
              <IconButton
                onClick={() => setIsOpen((s) => !s)}
                variant="text"
                size="sm"
                className="text-[20px] flex justify-center items-center"
              >
                <CgClose />
              </IconButton>
            </div>
            <div className="flex flex-col items-start gap-5 pb-5 w-full pr-4 overflow-y-scroll">
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Категория:
                  <Controller
                    name="category_id"
                    control={control}
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
                {errors.ru && (
                  <span className="text-red-500">
                    Пожалуйста, заполните поле
                  </span>
                )}
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Русский:
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Подкатегория"
                    {...register('ru', { required: true })}
                  />
                </div>
                {errors.ru && (
                  <span className="text-red-500">
                    Пожалуйста, заполните поле
                  </span>
                )}
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Қарақалпақша :
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Подкатегория"
                    {...register('kr', { required: true })}
                  />
                </div>
                {errors.kr && (
                  <span className="text-red-500">
                    Пожалуйста, заполните поле
                  </span>
                )}
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Qaraqalpaqsha:
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Подкатегория"
                    {...register('qr', { required: true })}
                  />
                </div>
                {errors.qr && (
                  <span className="text-red-500">
                    Пожалуйста, заполните поле
                  </span>
                )}
              </label>
            </div>
            <Button
              disabled={isLoading || EditLoading}
              fullWidth
              type="submit"
              className="items-center justify-center rounded-md float-right flex gap-5"
              variant="gradient"
              size="md"
              color="blue"
            >
              {isLoading ||
                (EditLoading && <AiOutlineLoading className="animate-spin" />)}
              Сохранить
            </Button>
          </div>
        </form>
      </Card>
    </Dialog>
  )
}

export default CreateSubcategoryModal
