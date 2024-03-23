import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import Container from '../shared/Container'
import logo from '../../images/logo/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
} from '@material-tailwind/react'
import LoginRegister from '../shared/LoginRegister'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated } from '../../store/slices/auth.slice'
import { api } from '../../store/index.api'
import UserCreateModal from '../admin/UserCreateModal'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t, i18n } = useTranslation()
  const localLang = localStorage.getItem('makler_lang')
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const { pathname } = useLocation()
  const { isAuthenticated, user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen((cur) => !cur)
  const handleLogout = () => {
    localStorage.removeItem('makler_token')
    dispatch(setIsAuthenticated(false))
    api.endpoints.getAllApartments.refetch()
  }

  const handleSelectLang = (e) => {
    i18n.changeLanguage(e)
    setLang(e)
    localStorage.setItem('makler_lang', e)
  }

  useEffect(() => {
    if (localLang) {
      setLang(localLang)
    }
  }, [])

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-20">
      <Container>
        <header className="flex justify-between items-center gap-1 h-[60px]">
          {/* LOGO */}
          <Link to={'/'}>
            <div className="flex justify-end items-end gap-[2px] cursor-pointer">
              <img src={logo} className="max-h-[25px] max-w-[25px]" />
              <span className="text-[15px] font-bold text-blue-100 uppercase italic min-w-max">
                Makler
              </span>
            </div>
          </Link>
          {/* NAVIGATION */}
          <ul className="flex justify-center items-center gap-4 font-semibold sm:hidden lg:flex">
            <li
              className={
                pathname === '/'
                  ? 'text-blue-100 text-sm'
                  : 'text-gray-900 text-sm hover:text-blue-100'
              }
            >
              <Link to={'/'}>{t('home')}</Link>
            </li>
            <li
              className={
                pathname === '/map'
                  ? 'text-blue-100 text-sm'
                  : 'text-gray-900 text-sm hover:text-blue-100'
              }
            >
              <Link to={'/map'}>{t('map')}</Link>
            </li>
            <li
              className={
                pathname === '/rent'
                  ? 'text-blue-100 text-sm'
                  : 'text-gray-900 text-sm hover:text-blue-100'
              }
            >
              <Link to={'/rent'}>{t('Аренда')}</Link>
            </li>
            <li
              className={
                pathname === '/sale'
                  ? 'text-blue-100 text-sm'
                  : 'text-gray-900 text-sm hover:text-blue-100'
              }
            >
              <Link to={'/sale'}>{t('sale')}</Link>
            </li>
            <li
              className={
                pathname === '/favorites'
                  ? 'text-blue-100 text-sm'
                  : 'text-gray-900 text-sm hover:text-blue-100'
              }
            >
              <Link to={'/favorites'}>{t('favorites')}</Link>
            </li>
          </ul>
          {/* BUTTONS */}
          <div className="flex justify-center items-center gap-4">
            <div className="sm:hidden md:block lg:hidden flex justify-center items-center">
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
                    className="rounded-md text-gray-800 text-xs flex items-center justify-center gap-1"
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
            <div className="flex items-center gap-2">
              <div className="md:block sm:hidden">
                <Select value={lang} label={t('language')} onChange={(e) => handleSelectLang(e)}>
                  <Option value="qr">Qaraqalpaqsha</Option>
                  <Option value="kr">Каракалпакша</Option>
                  <Option value="ru">Русский</Option>
                </Select>
              </div>
              <Button
                className="normal-case rounded-[5px] md:py-2 sm:px-3 sm:py-1 text-xs font-medium sm:block md:flex w-fit whitespace-nowrap"
                color="blue"
                variant="gradient"
                size="sm"
                onClick={() => setIsModalOpen((p) => !p)}
              >
                {t('createNewApartment')}
              </Button>
              {!isAuthenticated ? (
                <Button
                  onClick={handleOpen}
                  className="normal-case w-fit rounded-[5px] md:px-6 md:py-2 sm:px-3 sm:py-1 text-blue-100 text-xs font-semibold "
                  variant="gradient"
                  color="light-blue"
                  size="sm"
                >
                  {t('login')}
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    onClick={() => setIsOpenProfile((s) => !s)}
                    className="normal-case rounded-[5px] md:px-6 md:py-2 sm:px-3 sm:py-1 text-blue-100 text-xs font-semibold"
                    variant="gradient"
                    color="light-blue"
                    size="sm"
                  >
                    {t('profile')}
                  </Button>
                  {isOpenProfile && (
                    <div className="absolute bg-cyan-600	text-black font-semibold mt-3 z-[999] p-4 gap-5 right-0 w-80 flex flex-col shadow-lg">
                      <span className="flex items-center justify-between w-full">
                        {t('phone')}: <span>{user?.phone ? '+' + user?.phone : 'Пусто'}</span>
                      </span>
                      <span className="flex items-center justify-between w-full">
                        {t('role')}: <span>{user?.role === 'admin' ? 'Админ' : user?.role}</span>
                      </span>
                      {user?.role === 'admin' && (
                        <Button
                          className="normal-case rounded-[5px] px-6 py-2 text-blue-100 text-xs font-semibold"
                          variant="gradient"
                          color="light-blue"
                          size="sm"
                        >
                          <Link to="/admin">Админ панель</Link>
                        </Button>
                      )}
                      <div className="md:hidden sm:block">
                        <Select
                          value={lang}
                          label={t('language')}
                          onChange={(e) => handleSelectLang(e)}
                        >
                          <Option style={{ fontWeight: 700, color: '#000' }} value="qr">
                            Qaraqalpaqsha
                          </Option>
                          <Option style={{ fontWeight: 700, color: '#000' }} value="kr">
                            Каракалпакша
                          </Option>
                          <Option style={{ fontWeight: 700, color: '#000' }} value="ru">
                            Русский
                          </Option>
                        </Select>
                      </div>
                      <Button
                        onClick={handleLogout}
                        className="normal-case rounded-[5px] px-6 py-2 text-blue-100 text-xs font-semibold"
                        variant="gradient"
                        color="light-blue"
                        size="sm"
                      >
                        {t('logout')}
                      </Button>
                    </div>
                  )}
                </div>
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
