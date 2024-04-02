import { AiOutlineHeart, AiOutlineHome } from 'react-icons/ai'
import { MdOutlineSell } from 'react-icons/md'
import { CiMap } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FaPersonArrowDownToLine } from 'react-icons/fa6'
import { Button } from '@material-tailwind/react'

const IconFooter = () => {
  return (
    <div className="shadow-md sm:fixed md:hidden w-full flex items-center justify-center bottom-0 h-14 py-3 bg-blue-500">
      <div className="flex items-center justify-around w-full">
        <Link to="/" className="hover:scale-110 cursor-pointer">
          <Button
            className="text-white rounded-3xl transition-all"
            variant="text"
            size="sm"
          >
            <AiOutlineHome size="28" />
          </Button>
        </Link>
        <Link to="/map" className="hover:scale-110 cursor-pointer">
          <Button
            className="text-white rounded-3xl transition-all"
            variant="text"
            size="sm"
          >
            <CiMap size="28" />
          </Button>
        </Link>
        <Link to="/rent" className="hover:scale-110 cursor-pointer">
          <Button
            className="text-white rounded-3xl transition-all"
            variant="text"
            size="sm"
          >
            <FaPersonArrowDownToLine size="28" />
          </Button>
        </Link>
        <Link to="/sale" className="hover:scale-110 cursor-pointer">
          <Button
            className="text-white rounded-3xl transition-all"
            variant="text"
            size="sm"
          >
            <MdOutlineSell size="28" />
          </Button>
        </Link>
        <Link to="/favorites" className="hover:scale-110 cursor-pointer">
          <Button
            className="text-white rounded-3xl transition-all"
            variant="text"
            size="sm"
          >
            <AiOutlineHeart size="28" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default IconFooter
