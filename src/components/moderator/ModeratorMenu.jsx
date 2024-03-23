import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const ModeratorMenu = () => {
  const { pathname } = useLocation()
  return (
    <div className="fixed left-0 w-[200px] h-screen bg-blue-gray-50 flex flex-col gap-10 py-5">
      <h2 className="font-bold text-blue-100 italic text-center text-3xl">
        <Link to="/">MAKLER</Link>
      </h2>
      <ul className="flex flex-col font-semibold">
        <Link to={'/moderator'}>
          <li
            className={`text-lg w-full hover:bg-blue-gray-200 py-3 px-6 flex items-center gap-3 ${
              pathname === '/moderator' ? 'text-blue-100 bg-blue-gray-100' : 'text-gray-900'
            }`}
          >
            <FaHome />
            Главная
          </li>
        </Link>
      </ul>
      <div className="mt-auto text-center text-blue-100 italic text-2xl">Модератор</div>
    </div>
  )
}

export default ModeratorMenu
