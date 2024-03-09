import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import IconFooter from '../components/IconFooter'
import HomeBanner from '../components/HomeBanner'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useCheckUserQuery } from '../store/index.api'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../store/slices/auth.slice'

const HomeLayout = () => {
  const { pathname } = useLocation()
  const { data, isSuccess } = useCheckUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setIsAuthenticated(true))
    }
  }, [isSuccess])

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
