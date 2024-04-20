import Header from "../components/client/Header";
import { Outlet, useLocation } from "react-router-dom";
import HomeBanner from "../components/client/HomeBanner";
import Footer from "../components/client/Footer";
import IconFooter from "../components/client/IconFooter";

const HomeLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className='home_layout min-h-[100vh] flex flex-col justify-between'>
      <Header />
      <div className='flex-1'>
        {pathname === "/" && <HomeBanner />}
        <Outlet />
      </div>
      <Footer />
      <IconFooter />
    </div>
  );
};

export default HomeLayout;
