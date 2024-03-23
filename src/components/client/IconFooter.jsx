import { AiOutlineHeart, AiOutlineHome } from 'react-icons/ai'
import { MdOutlineSell } from 'react-icons/md'
import { CiMap } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FaPersonArrowDownToLine } from 'react-icons/fa6'

const IconFooter = () => {
  return (
    <div className="shadow-md sm:fixed md:hidden w-full  bottom-0 py-3 bg-gray-200">
      <div className="flex justify-around items-center gap-4 text-gray-800 text-[20px]">
        <Link to='/' className="hover:scale-110 cursor-pointer">
          <AiOutlineHome />
        </Link>
        <Link to='/map' className="hover:scale-110 cursor-pointer">
          <CiMap />
        </Link>
        <Link to='/rent' className="hover:scale-110 cursor-pointer">
          <FaPersonArrowDownToLine />
        </Link>
        <Link to='/sale' className="hover:scale-110 cursor-pointer">
          <MdOutlineSell />
        </Link>
        <Link to='/favorites' className="hover:scale-110 cursor-pointer">
          <AiOutlineHeart />
        </Link>
      </div>
    </div>
  )
}

export default IconFooter
