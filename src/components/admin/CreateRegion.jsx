import { Card, Dialog } from '@material-tailwind/react'
import {
  useACreateRegionMutation,
  useAEditRegionMutation,
} from '../../store/index.api.js'
import { Button, IconButton } from '@material-tailwind/react'
import { CgClose } from 'react-icons/cg'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRegionToEdit } from '../../store/slices/region.slice.js'
import { AiOutlineLoading } from 'react-icons/ai'

const CreateRegionModal = ({ open, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const dispatch = useDispatch()
  const { regionToEdit } = useSelector((s) => s.region)
  const [createRegion, { isLoading, isSuccess }] = useACreateRegionMutation()

  const [editRegion, { isSuccess: EditSuccess, isLoading: EditLoading }] =
    useAEditRegionMutation()

  const onSubmit = (data) => {
    if (regionToEdit) {
      editRegion({
        id: regionToEdit.id,
        name: {
          ru: data.ru,
          kr: data.kr,
          qr: data.qr,
        },
      })
    } else {
      createRegion({
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
      dispatch(setRegionToEdit(null))
    }
  }, [isSuccess, EditSuccess])

  useEffect(() => {
    if (!open) {
      reset({
        ru: '',
        qr: '',
        kr: '',
      })
      dispatch(setRegionToEdit(null))
    }
  }, [open])

  useEffect(() => {
    if (regionToEdit) {
      reset({
        ru: regionToEdit.name.ru,
        qr: regionToEdit.name.qr,
        kr: regionToEdit.name.kr,
      })
    }
  }, [regionToEdit])

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
              <h1 className="font-semibold text-xl">Новый регион</h1>
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
                  Русский:
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Название"
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
                    placeholder="Название"
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
                    placeholder="Название"
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

export default CreateRegionModal
