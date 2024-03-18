import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AsideMenu from '../components/AsideMenu'
import { useCheckUserQuery } from '../store/index.api'

const AdminLayout = () => {
  const { isAuthenticated } = useSelector((s) => s.auth)
  const { pathname } = useLocation()
  const { data, isSuccess } = useCheckUserQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && !isAuthenticated) {
      navigate('/login')
    }
  }, [isSuccess])

  return (
    <div className="min-h-screen bg-blue-gray-100 w-full">
      <AsideMenu />
      <div className="ml-[215px] py-5">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
