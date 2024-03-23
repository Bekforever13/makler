import { useDispatch, useSelector } from 'react-redux'
import uzbIcon from '../../images/image/uzb.png'
import { setPhoneNumber } from '../../store/slices/auth.slice'
import { IMaskInput } from 'react-imask'
import { useRef } from 'react'

// function formatPhoneNumber(value) {
//   if (!value) return value
//   const phoneNumber = value.replace(/[^\d]/g, '')
//   switch (phoneNumber.length) {
//     case 0:
//       return phoneNumber
//     case 1:
//     case 2:
//       return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
//     case 3:
//       return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
//     case 4:
//       return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 4)}-${phoneNumber.slice(4)}`
//     case 5:
//       return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5)}`
//     case 6:
//       return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}`
//     case 7:
//       return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(
//         5,
//         7,
//       )}-${phoneNumber.slice(7)}`
//     default:
//       return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(
//         5,
//         7,
//       )}-${phoneNumber.slice(7, 9)}`
//   }
// }

const PhoneNumberInput = () => {
  const ref = useRef(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const { phoneNumber } = useSelector((s) => s.auth)

  // const handleInput = (val) => {
  //   const formatedPhoneNumber = formatPhoneNumber(val)
  //   dispatch(setPhoneNumber(formatedPhoneNumber))
  // }
  return (
    <div className="flex items-center gap-5 w-full">
      {/* <div className="flex absolute py-[6px] pl-3 justify-center items-center gap-1"> */}
      <img className="w-[30px] h-[30px] rounded-full" src={uzbIcon} />
      {/* <p className="font-semibold text-[16px] text-gray-800">+998</p> */}
      {/* </div> */}
      <IMaskInput
        mask={`+{998}00-000-00-00`}
        radix="."
        value={phoneNumber}
        unmask={false}
        ref={ref}
        inputRef={inputRef}
        onAccept={(_, mask) => dispatch(setPhoneNumber(mask._unmaskedValue))}
        placeholder="Enter number here"
        style={{ border: '1px solid black', padding: 12, borderRadius: 4, width: '100%' }}
      />
      {/* <input
        placeholder="(99) 123 45 67"
        className="border-[2px] max-w-[210px] rounded-md pl-[75px] border-blue-gray-200 bg-transparent pt-1 pb-[6px] text-[16px] font-medium text-gray-900 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        value={phoneNumber}
        onChange={(e) => handleInput(e.target.value)}
        required
        type="tel"
        pattern="^\(\d{2}\) \d{3}-\d{2}-\d{2}$"
      /> */}
      {/* <span className="text-red-600 font-medium text-[13px]">{inputValid}</span> */}
    </div>
  )
}

export default PhoneNumberInput
