import { CgClose } from 'react-icons/cg'
import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from '@material-tailwind/react'
import PhoneNumberInput from './PhoneNumberInput'
import loginIcon from '../images/image/login-icon.webp'
import loginIcon2 from '../images/image/login-icon2.png'
import VerificationInput from 'react-verification-input'
import { useApplyCodeMutation, useSendCodeMutation } from '../store/index.api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setToken } from '../store/slices/auth.slice'

function LoginRegister({ open, handleOpen }) {
  const [smsCode, setSmsCode] = useState('')
  const [isHaveCode, setIsHaveCode] = useState(false)
  const { phoneNumber } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [
    login,
    { data: loginData, isSuccess: loginIsSuccess, isLoading: loginLoading, isError: loginError },
  ] = useApplyCodeMutation()
  const [getSms, { isSuccess: getSmsIsSuccess, isLoading: getCodeLoading, isError: getSmsError }] =
    useSendCodeMutation()

  function handleClear() {
    setIsHaveCode((prev) => !prev)
    setSmsCode('')
  }

  const handleGetSms = () => getSms({ phone: phoneNumber })
  const handleLogin = () => login({ phone: phoneNumber, code: smsCode })

  useEffect(() => {
    if (loginIsSuccess) {
      console.log(loginData)
      dispatch(setIsAuthenticated(true))
      dispatch(setToken(loginData.data.token))
      handleOpen()
    }
    if (loginError) {
      setSmsCode('')
    }
    if (getSmsIsSuccess) {
      setIsHaveCode(true)
    }
  }, [loginIsSuccess, loginError, getSmsIsSuccess])

  return (
    <Dialog size="xs" open={open} className="bg-transparent shadow-none">
      <Card className="mx-auto w-full max-w-[25rem] rounded-md">
        {isHaveCode ? (
          <CardBody
            className="flex flex-col gap-2"
            open={isHaveCode}
            animate={{
              mount: { y: 0 },
              unmount: { y: 50 },
            }}
          >
            <div className="flex justify-between items-center ">
              <Typography variant="h4" color="blue-gray">
                Kiriw
              </Typography>
              <IconButton
                onClick={() => (handleOpen(), handleClear())}
                variant="text"
                size="sm"
                className="text-[20px] flex justify-center items-center"
              >
                <CgClose />
              </IconButton>
            </div>
            <Typography className="font-normal" variant="paragraph" color="gray">
              Kod telefon nomerin'izge jiberildi
            </Typography>
            <div>
              <div className="flex justify-center items-center">
                <img src={loginIcon2} className="h-[120px] bg-transparent scale-125" />
              </div>
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
            </div>
            <span className="text-red-600 font-medium text-sm">
              {loginError && 'Kod qate! Qaytadan urinip korin'}
            </span>
          </CardBody>
        ) : (
          <CardBody className="flex flex-col gap-2 p-4">
            <div className="flex justify-between items-center ">
              <Typography variant="h4" color="blue-gray">
                Kiriw
              </Typography>
              <IconButton
                onClick={() => handleOpen()}
                variant="text"
                size="sm"
                className="text-[20px] flex justify-center items-center"
              >
                <CgClose />
              </IconButton>
            </div>
            <Typography className="font-normal" variant="paragraph" color="gray">
              Dizimnen o'tiw ushin telefon nomer kiritin'
            </Typography>
            <div className="flex justify-center items-center">
              <img src={loginIcon} className="h-[120px]" />
            </div>
            <div className="w-full flex justify-center items-center">
              <PhoneNumberInput />
            </div>
            <span className="text-red-600 font-medium text-sm">
              {getSmsError && 'Qate ketti! Birazdan urinip korin'}
            </span>
          </CardBody>
        )}
        <CardFooter className="p-4">
          {isHaveCode ? (
            <Button
              onClick={handleLogin}
              disabled={smsCode.length !== 5}
              loading={loginLoading}
              fullWidth
              className="items-center justify-center rounded-md float-right"
              variant="gradient"
              size="md"
              color="blue"
            >
              Kiriw
            </Button>
          ) : (
            <Button
              onClick={handleGetSms}
              disabled={phoneNumber.length !== 12}
              loading={getCodeLoading}
              fullWidth
              className="items-center justify-center rounded-md float-right"
              variant="gradient"
              size="md"
              color="blue"
            >
              Jiberiw
            </Button>
          )}
          {/* <Button
            onClick={() => (isHaveCode ? handleLogin : handleGetSms)}
            disabled={phoneNumber.length !== 12}
            loading={loginLoading || getCodeLoading}
            fullWidth
            className="items-center justify-center rounded-md float-right"
            variant="gradient"
            size="md"
            color="blue"
          >
            {isHaveCode ? 'Kiriw' : 'Jiberiw'}
          </Button> */}
        </CardFooter>
      </Card>
    </Dialog>
  )
}

export default LoginRegister
