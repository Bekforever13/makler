import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import Container from "../shared/Container";
import logo from "../../images/logo/logo.svg";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
} from "@material-tailwind/react";
import LoginRegister from "../shared/LoginRegister";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthModal,
  setIsAuthenticated,
  setProfileModal,
} from "../../store/slices/auth.slice";
import { api } from "../../store/index.api";
import UserCreateModal from "../admin/UserCreateModal";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const localLang = localStorage.getItem("makler_lang");
  const [lang, setLang] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, user, profileModal } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(setAuthModal(true));
  const handleLogout = () => {
    localStorage.removeItem("makler_token");
    dispatch(setIsAuthenticated(false));
    api.endpoints.getAllApartments.refetch();
  };

  const handleSelectLang = (e) => {
    i18n.changeLanguage(e);
    setLang(e);
    localStorage.setItem("makler_lang", e);
  };

  useEffect(() => {
    if (localLang) {
      setLang(localLang);
    }
  }, []);

  return (
    <div className='w-full shadow-md bg-white sticky top-0 py-5 z-20'>
      <Container>
        <header className='flex justify-between items-center gap-1 h-[60px]'>
          {/* LOGO */}
          <Link to={"/"}>
            <div className='flex justify-end items-end gap-[2px] cursor-pointer'>
              <img src={logo} className='max-h-[35px] max-w-[35px]' />
              <span className='md:text-xl max-md:text-base font-bold text-blue-700 uppercase italic min-w-max'>
                Makler
              </span>
            </div>
          </Link>
          {/* NAVIGATION */}
          <ul className='flex justify-center items-center gap-4 font-semibold sm:hidden lg:flex'>
            <li
              className={
                pathname === "/"
                  ? "text-blue-700"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              <Link className='text-base' to={"/"}>
                {t("home")}
              </Link>
            </li>
            <li
              className={
                pathname === "/map"
                  ? "text-blue-700"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              <Link className='text-base' to={"/map"}>
                {t("map")}
              </Link>
            </li>
            <li
              className={
                pathname === "/rent"
                  ? "text-blue-700"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              <Link className='text-base' to={"/rent"}>
                {t("rent")}
              </Link>
            </li>
            <li
              className={
                pathname === "/sale"
                  ? "text-blue-700"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              <Link className='text-base' to={"/sale"}>
                {t("sale")}
              </Link>
            </li>
            <li
              className={
                pathname === "/favorites"
                  ? "text-blue-700"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              <Link className='text-base' to={"/favorites"}>
                {t("favorites")}
              </Link>
            </li>
          </ul>
          {/* BUTTONS */}
          <div className='flex justify-center items-center gap-4'>
            <div className='sm:hidden md:block lg:hidden flex justify-center items-center'>
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <Button
                    size='sm'
                    variant='text'
                    className='rounded-md text-gray-800 text-base flex items-center justify-center gap-1'
                  >
                    <GiHamburgerMenu />
                    {t("menu")}
                  </Button>
                </MenuHandler>
                <MenuList className='p-2'>
                  <Link to={"/"}>
                    <MenuItem>{t("home")}</MenuItem>
                  </Link>
                  <Link to={"/map"}>
                    <MenuItem>{t("map")}</MenuItem>
                  </Link>
                  <Link to={"/rent"}>
                    <MenuItem>{t("rent")}</MenuItem>
                  </Link>
                  <Link to={"/sale"}>
                    <MenuItem>{t("sale")}</MenuItem>
                  </Link>
                  <Link to={"/favorites"}>
                    <MenuItem>{t("favorites")}</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </div>
            <div className='flex items-center gap-2'>
              <div className='md:block sm:hidden'>
                <Select
                  value={lang}
                  label={t("language")}
                  onChange={(e) => handleSelectLang(e)}
                >
                  <Option value='qr'>Qaraqalpaqsha</Option>
                  <Option value='kr'>Қарақалпақша</Option>
                  <Option value='ru'>Русский</Option>
                </Select>
              </div>
              <Button
                className='normal-case rounded-[5px] md:py-2 sm:px-3 sm:py-1 text-base font-medium sm:block md:flex w-fit whitespace-nowrap'
                color='blue'
                variant='gradient'
                size='sm'
                onClick={() => {
                  if (isAuthenticated) {
                    setIsModalOpen((p) => !p);
                  } else {
                    handleOpen();
                  }
                }}
              >
                {t("createNewApartment")}
              </Button>
              <div className="md:block max-md:hidden">
                {!isAuthenticated ? (
                  <Button
                    onClick={handleOpen}
                    className='normal-case w-fit rounded-[5px] md:px-6 md:py-2 sm:px-3
                    sm:py-1 text-gray-900 text-base font-semibold'
                    variant='gradient'
                    color='light-blue'
                    size='sm'
                  >
                    {t("login")}
                  </Button>
                ) : (
                  <Menu>
                    <MenuHandler>
                      <Button
                        onClick={() => dispatch(setProfileModal(!profileModal))}
                        className='normal-case rounded-[5px] md:px-6 md:py-2 sm:px-3 sm:py-1
                      text-gray-900 text-base font-semibold'
                        variant='gradient'
                        color='light-blue'
                        size='sm'
                      >
                        {t("profile")}
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <div
                        className='bg-blue-300	text-black font-semibold mt-3 z-[999] p-4 gap-5
                        right-0 w-80 flex flex-col shadow-lg'
                      >
                        <span className='flex items-center justify-between w-full'>
                          {t("phone")}:{" "}
                          <span>
                            {user?.phone ? "+" + user?.phone : t("empty")}
                          </span>
                        </span>
                        <span className='flex items-center justify-between w-full'>
                          {t("name")}:{" "}
                          <span>
                            {user?.name}
                          </span>
                        </span>
                        {user?.role === "admin" && (
                          <Button
                            className='normal-case rounded-[5px] px-6 py-2 text-gray-900 text-xs font-semibold'
                            variant='gradient'
                            color='light-blue'
                            size='sm'
                          >
                            <Link to='/admin'>Админ панель</Link>
                          </Button>
                        )}
                        {user?.role === "moderator" && (
                          <Button
                            className='normal-case rounded-[5px] px-6 py-2 text-gray-900 text-xs font-semibold'
                            variant='gradient'
                            color='light-blue'
                            size='sm'
                          >
                            <Link to='/moderator'>Модератор панель</Link>
                          </Button>
                        )}
                        <div className='md:hidden sm:block'>
                          <Select
                            value={lang}
                            label={t("language")}
                            onChange={(e) => handleSelectLang(e)}
                          >
                            <Option
                              style={{ fontWeight: 700, color: "#000" }}
                              value='qr'
                            >
                              Qaraqalpaqsha
                            </Option>
                            <Option
                              style={{ fontWeight: 700, color: "#000" }}
                              value='kr'
                            >
                              Қарақалпақша
                            </Option>
                            <Option
                              style={{ fontWeight: 700, color: "#000" }}
                              value='ru'
                            >
                              Русский
                            </Option>
                          </Select>
                        </div>
                        <Button
                          onClick={handleLogout}
                          className='normal-case rounded-[5px] px-6 py-2 text-gray-900 text-xs font-semibold'
                          variant='gradient'
                          color='light-blue'
                          size='sm'
                        >
                          {t("logout")}
                        </Button>
                      </div>
                    </MenuList>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </header>
      </Container>
      <LoginRegister />
      <UserCreateModal open={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Header;
