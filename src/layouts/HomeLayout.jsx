import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import HomeBanner from '../components/HomeBanner'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useCheckUserQuery } from '../store/index.api'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setUser } from '../store/slices/auth.slice'
import IconFooter from '../components/IconFooter'

const HomeLayout = () => {
  const { pathname } = useLocation()
  const { data, isSuccess } = useCheckUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.data))
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
