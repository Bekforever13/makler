import Header from '../components/client/Header'
import { Outlet, useLocation } from 'react-router-dom'
import HomeBanner from '../components/client/HomeBanner'
import Footer from '../components/client/Footer'
import IconFooter from '../components/client/IconFooter'

const HomeLayout = () => {
  const { pathname } = useLocation()

  return (
    <div className="bg-naqis2 bg-[length:50px_410px] bg-fixed min-h-[100vh] flex flex-col justify-between">
      <Header />
      <div className="flex-1">
        {pathname === '/' && <HomeBanner />}
        <Outlet />
      </div>
      <div>
        <Footer />
        <IconFooter />
      </div>
    </div>
  )
}

export default HomeLayout
