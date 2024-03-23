import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo/logo.svg'
import signBg from '../../images/image/sign-bg.jpg'
import { Button, Typography } from '@material-tailwind/react'
import PhoneNumberInput from '../../components/shared/PhoneNumberInput'
import { useDispatch, useSelector } from 'react-redux'
import { useApplyCodeMutation, useSendCodeMutation } from '../../store/index.api'
import { setIsAuthenticated, setToken, setUser } from '../../store/slices/auth.slice'
import VerificationInput from 'react-verification-input'

const SignUp = () => {
  const navigate = useNavigate()
  const [smsCode, setSmsCode] = useState('')
  const [isHaveCode, setIsHaveCode] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)
  const { phoneNumber } = useSelector((s) => s.auth)
  const [
    login,
    { data: loginData, isSuccess: loginIsSuccess, isLoading: loginLoading, isError: loginError },
  ] = useApplyCodeMutation()
  const [getSms, { isSuccess: getSmsIsSuccess, isLoading: getCodeLoading }] = useSendCodeMutation()

  const handleGetSms = () => getSms({ phone: phoneNumber })
  const handleLogin = () => login({ phone: phoneNumber, code: smsCode })

  useEffect(() => {
    if (user?.role) {
      user?.role === 'admin' && navigate('/admin')
      user?.role === 'moderator' && navigate('/moderator')
    }
  }, [user])

  useEffect(() => {
    if (loginData?.data) {
      dispatch(setIsAuthenticated(true))
      dispatch(setToken(loginData.data.token))
      dispatch(setUser(loginData.data.user))
      loginData.data.user.role === 'admin' && navigate('/admin')
      loginData.data.user.role === 'moderator' && navigate('/moderator')
    }
  }, [loginIsSuccess])

  useEffect(() => {
    if (loginError) {
      setSmsCode('')
    }
  }, [loginError])

  useEffect(() => {
    if (getSmsIsSuccess) {
      setIsHaveCode(true)
    }
  }, [getSmsIsSuccess])

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
            {isHaveCode ? (
              <>
                <Typography variant="h4" color="blue-gray" className="mt-4 text-center">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  SMS Kod
                </Typography>
                <Typography
                  className="mb-4 font-normal text-center"
                  variant="paragraph"
                  color="gray"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Dizimnen o'tiw ushin telefon nomerin'izge jiberilgen sms kodti kiritin'
                </Typography>
                <div className="px-[5%] flex justify-center items-center">
                  <VerificationInput
                    length={5}
                    value={smsCode}
                    onChange={(value) => setSmsCode(value)}
                    classNames={{
                      container: 'container',
                      character: 'character',
                      characterInactive: 'character--inactive',
                      characterSelected: 'character--selected',
                      characterFilled: 'character--filled',
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <Typography variant="h4" color="blue-gray" className="mt-4 text-center">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Dizimnen o'tiw
                </Typography>
                <Typography
                  className="mb-4 font-normal text-center"
                  variant="paragraph"
                  color="gray"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Dizimnen o'tiw ushin telefon nomerin'izdi kiritin'
                </Typography>
                <Typography className="mb-1" variant="h6">
                  Telefon nomer
                </Typography>
                <PhoneNumberInput />
                <span className="text-red-600 font-medium text-sm">
                  {loginError && 'Kod qate! Qaytadan urinip korin'}
                </span>
              </>
            )}
          </div>
          <div className="pt-0 text-end mt-3">
            <Button
              variant="gradient"
              color="blue"
              size="sm"
              className="rounded-md"
              loading={loginLoading || getCodeLoading}
              onClick={isHaveCode ? handleLogin : handleGetSms}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Dizimnen o'tiw
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
