import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo/logo.svg'
import signBg from '../../images/image/sign-bg.jpg'
import { Button, Typography } from '@material-tailwind/react'
import PhoneNumberInput from '../../components/shared/PhoneNumberInput'
import LoginRegister from '../../components/shared/LoginRegister'
import { useDispatch } from 'react-redux'
import { useCheckUserQuery } from '../../store/index.api'
import { setIsAuthenticated, setUser } from '../../store/slices/auth.slice'

const SignUp = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((cur) => !cur)
  const navigate = useNavigate()
  const { data, isSuccess } = useCheckUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsAuthenticated(true))
      dispatch(setUser(data?.data))
      navigate('/admin')
    }
  }, [isSuccess])

  return (
    <div className="flex justify-between gap-2 p-[1%] mx-auto h-[100vh]">
      <div className="flex-[1] sm:hidden md:block w-full">
        <img src={signBg} className="h-full object-cover rounded-md" />
      </div>
      <div className="flex-[1] border-[1px solid] px-3">
        <div className="mx-auto w-full shadow-none">
          <div className="flex flex-col gap-2 mt-2">
            <Link to={'/'}>
              <div className="flex justify-start items-end gap-[2px] cursor-pointer">
                <img src={logo} className="max-h-[30px] max-w-[30px]" />
                <span className="text-[15px] font-bold text-blue-100 uppercase italic min-w-max">
                  Makler
                </span>
              </div>
            </Link>
            <Link to={'/'} className="max-w-max">
              <div className="flex text-[15px] justify-start mt-[20px] float-start items-center gap-1 font-semibold text-gray-900 hover:text-blue-100">
                <AiOutlineArrowLeft />
                <span>Bas betke qaytiw</span>
              </div>
            </Link>
            <Typography variant="h4" color="blue-gray" className="mt-4 text-center">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Dizimnen o'tiw
            </Typography>
            <Typography className="mb-4 font-normal text-center" variant="paragraph" color="gray">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Dizimnen o'tiw ushin telefon nomerin'izdi kiritin'
            </Typography>
            <Typography className="mb-1" variant="h6">
              Telefon nomer
            </Typography>
            <PhoneNumberInput />
          </div>
          <div className="pt-0 text-end mt-3">
            <Button variant="gradient" color="blue" size="sm" className="rounded-md">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Dizimnen o'tiw
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Mende dizimnen otken nomer bar?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => handleOpen()}
              >
                Kiriw
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
      <LoginRegister open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default SignUp
