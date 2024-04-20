import { useDispatch, useSelector } from "react-redux";
import uzbIcon from "../../images/image/uzb.png";
import { setPhoneNumber } from "../../store/slices/auth.slice";
import { IMaskInput } from "react-imask";
import { useRef } from "react";

const PhoneNumberInput = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((s) => s.auth);

  return (
    <div className='flex items-center gap-5 w-full'>
      <img className='w-[30px] h-[30px] rounded-full' src={uzbIcon} />
      <label className='border border-solid border-black p-3 w-full flex items-center'>
        +998
        <IMaskInput
          mask='00-000-00-00'
          // radix='.'
          value={phoneNumber}
          // unmask={false}
          ref={ref}
          inputRef={inputRef}
          onAccept={(_, mask) => dispatch(setPhoneNumber(mask._unmaskedValue))}
          placeholder='00-000-00-00'
          className='outline-none'
        />
      </label>
    </div>
  );
};

export default PhoneNumberInput;
