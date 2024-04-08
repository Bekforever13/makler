import { useDispatch, useSelector } from 'react-redux'
import uzbIcon from '../../images/image/uzb.png'
import { setPhoneNumber } from '../../store/slices/auth.slice'
import { IMaskInput } from 'react-imask'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const PhoneNumberInput = () => {
  const ref = useRef(null)
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { phoneNumber } = useSelector((s) => s.auth)

  return (
    <div className="flex items-center gap-5 w-full">
      <img className="w-[30px] h-[30px] rounded-full" src={uzbIcon} />
      <IMaskInput
        mask={`+{998}00-000-00-00`}
        radix="."
        value={phoneNumber}
        unmask={false}
        ref={ref}
        inputRef={inputRef}
        onAccept={(_, mask) => dispatch(setPhoneNumber(mask._unmaskedValue))}
        placeholder={t('enterNumber')}
        style={{ border: '1px solid black', padding: 12, borderRadius: 4, width: '100%' }}
      />
    </div>
  )
}

export default PhoneNumberInput
