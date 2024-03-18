import { Card, Dialog } from '@material-tailwind/react'
import { useACreateCategoryMutation } from '../store/index.api'
import { Button, IconButton } from '@material-tailwind/react'
import { CgClose } from 'react-icons/cg'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const CreateCategoryModal = ({ open, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [createCategory, { isLoading, isSuccess }] = useACreateCategoryMutation()

  const onSubmit = (data) => createCategory({ name: data })

  useEffect(() => {
    if (isSuccess) {
      reset('')
      setIsOpen(false)
    }
  }, [isSuccess])

  return (
    <Dialog open={open} className="w-full shadow-none" size="lg">
      <Card className="w-full rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-5 p-5 w-full text-black">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-semibold text-xl">Новая категория</h1>
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
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Русский:
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Категория"
                    {...register('ru', { required: true })}
                  />
                </div>
                {errors.ru && <span className="text-red-500">Пожалуйста, заполните поле</span>}
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Каракалпакша :
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Категория"
                    {...register('kr', { required: true })}
                  />
                </div>
                {errors.kr && <span className="text-red-500">Пожалуйста, заполните поле</span>}
              </label>
              <label className="flex flex-col border-b-[1px] w-full">
                <div className="flex md:items-center justify-between w-full md:flex-row sm:flex-col sm:items-start">
                  Qaraqalpaqsha:
                  <input
                    className="border py-1 px-2 rounded-md md:w-1/2 sm:w-full"
                    type="text"
                    placeholder="Категория"
                    {...register('qr', { required: true })}
                  />
                </div>
                {errors.qr && <span className="text-red-500">Пожалуйста, заполните поле</span>}
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
              Сохранить
            </Button>
          </div>
        </form>
      </Card>
    </Dialog>
  )
}

export default CreateCategoryModal
