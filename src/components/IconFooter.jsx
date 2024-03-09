import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { BiListPlus } from 'react-icons/bi'
import { MdNotificationsNone } from 'react-icons/md'

const IconFooter = () => {
  return (
    <div className="shadow-md sm:block md:hidden w-full  bottom-0 py-3 bg-gray-200">
      <div className="flex justify-around items-center gap-4 text-gray-800 text-[20px]">
        <i className="hover:scale-110 cursor-pointer">
          <BiListPlus />
        </i>
        <i className="hover:scale-110 cursor-pointer">
          <AiOutlineMessage />
        </i>
        <i className="hover:scale-110 cursor-pointer">
          <AiOutlineHeart />
        </i>
        <i className="hover:scale-110 cursor-pointer">
          <MdNotificationsNone />
        </i>
      </div>
    </div>
  )
}

export default IconFooter
