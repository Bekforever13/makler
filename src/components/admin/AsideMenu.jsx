import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { MdOutlineHomeWork } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { VscListFlat } from 'react-icons/vsc'
import { BsFillPinMapFill } from 'react-icons/bs'
import { CiShoppingTag } from 'react-icons/ci'

const AsideMenu = () => {
  const { pathname } = useLocation()
  return (
    <div className="fixed left-0 w-[200px] h-screen bg-blue-gray-50 flex flex-col gap-10 py-5">
      <h2 className="font-bold text-blue-100 italic text-center text-3xl">
        <Link to="/">MAKLER</Link>
      </h2>
      <ul className="flex flex-col font-semibold">
        <Link to={'/admin'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/admin' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <FaHome />
            Главная
          </li>
        </Link>
        <Link to={'/admin/apartments'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/admin/apartments' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <MdOutlineHomeWork />
            Домa
          </li>
        </Link>
        <Link to={'/admin/categories'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/admin/categories' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <BiCategory />
            Категория
          </li>
        </Link>
        <Link to={'/admin/subcategories'}>
          <li
            className={`text-base w-full hover:bg-blue-gray-200 py-3 pl-6 flex items-center gap-3 ${
              pathname === '/admin/subcategories'
                ? 'text-blue-100 bg-blue-gray-100'
                : 'text-gray-900'
            }`}
          >
            <VscListFlat />
            Подкатегория
          </li>
        </Link>
        <Link to={'/admin/regions'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/admin/regions' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <BsFillPinMapFill />
            Регион
          </li>
        </Link>
        <Link to={'/admin/tags'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/admin/tags' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <CiShoppingTag />
            Тег
          </li>
        </Link>
      </ul>
      <div className="mt-auto text-center text-blue-100 italic text-2xl">Админ</div>
    </div>
  )
}

export default AsideMenu
