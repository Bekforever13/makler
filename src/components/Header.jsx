import { GiHamburgerMenu } from 'react-icons/gi'
import { MdNotificationsNone } from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineMessage } from 'react-icons/ai'
import { BiListPlus } from 'react-icons/bi'
import { useState } from 'react'
import Container from './Container'
import logo from '../images/logo/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import { Button, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import LoginRegister from './LoginRegister'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated } from '../store/slices/auth.slice'
import { api } from '../store/index.api'
import UserCreateModal from './UserCreateModal'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pathname } = useLocation()
  const { isAuthenticated } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen((cur) => !cur)
  const handleLogout = () => {
    localStorage.removeItem('makler_token')
    dispatch(setIsAuthenticated(false))
    api.endpoints.getAllApartments.refetch()
  }

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-20">
      <Container>
        <header className="flex justify-between items-center gap-1 h-[60px]">
          <Link to={'/'}>
            <div className="flex justify-end items-end gap-[2px] cursor-pointer">
              <img src={logo} className="max-h-[25px] max-w-[25px]" />
              <span className="text-[15px] font-bold text-blue-100 uppercase italic min-w-max">
                U'Y JAY
              </span>
            </div>
          </Link>
          <div>
            <ul className="flex justify-center items-center gap-4 font-semibold sm:hidden  lg:flex">
              <li
                className={
                  pathname === '/'
                    ? 'text-blue-100 text-sm'
                    : 'text-gray-900 text-sm hover:text-blue-100'
                }
              >
                <Link to={'/'}>Bas bet</Link>
              </li>
              <li
                className={
                  pathname === '/map'
                    ? 'text-blue-100 text-sm'
                    : 'text-gray-900 text-sm hover:text-blue-100'
                }
              >
                <Link to={'/map'}>Karta</Link>
              </li>
              <li
                className={
                  pathname === '/rent'
                    ? 'text-blue-100 text-sm'
                    : 'text-gray-900 text-sm hover:text-blue-100'
                }
              >
                <Link to={'/rent'}>Ijara</Link>
              </li>
              <li
                className={
                  pathname === '/sale'
                    ? 'text-blue-100 text-sm'
                    : 'text-gray-900 text-sm hover:text-blue-100'
                }
              >
                <Link to={'/sale'}>Satiw</Link>
              </li>
              <li
                className={
                  pathname === '/favorites'
                    ? 'text-blue-100 text-sm'
                    : 'text-gray-900 text-sm hover:text-blue-100'
                }
              >
                <Link to={'/favorites'}>Saylandilar</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="sm:block lg:hidden flex justify-center items-center">
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <Button
                    size="sm"
                    color="light-blue"
                    variant="text"
                    className="rounded-md text-gray-800 text-[12px] flex items-center justify-center gap-1"
                  >
                    <GiHamburgerMenu />
                    Menu
                  </Button>
                </MenuHandler>
                <MenuList className="p-2">
                  <Link to={'/'}>
                    <MenuItem>Bas bet</MenuItem>
                  </Link>
                  <Link to={'/map'}>
                    <MenuItem>Karta</MenuItem>
                  </Link>
                  <Link to={'/rent'}>
                    <MenuItem>Ijara</MenuItem>
                  </Link>
                  <Link to={'/sale'}>
                    <MenuItem>Satiw</MenuItem>
                  </Link>
                  <Link to={'/favorites'}>
                    <MenuItem>Saylandilar</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </div>
            <div className="flex justify-center items-center gap-1">
              <Button
                className="normal-case rounded-[5px] px-6 text-[12px] font-medium sm:hidden md:flex"
                color="blue"
                variant="gradient"
                size="sm"
                onClick={() => setIsModalOpen((p) => !p)}
              >
                + Biypul jayg'astiriw
              </Button>
              {!isAuthenticated ? (
                <Button
                  onClick={handleOpen}
                  className="normal-case rounded-[5px] px-6 py-2 text-blue-100 text-[12px] font-semibold"
                  variant="gradient"
                  color="light-blue"
                  size="sm"
                >
                  Kiriw
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  className="normal-case rounded-[5px] px-6 py-2 text-blue-100 text-[12px] font-semibold"
                  variant="gradient"
                  color="light-blue"
                  size="sm"
                >
                  Shigiw
                </Button>
              )}
            </div>
          </div>
        </header>
      </Container>
      <LoginRegister open={open} handleOpen={handleOpen} />
      <UserCreateModal open={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}

export default Header
