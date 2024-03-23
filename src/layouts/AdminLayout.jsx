import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AsideMenu from '../components/admin/AsideMenu'

const AdminLayout = () => {
  const { isAuthenticated } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

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
