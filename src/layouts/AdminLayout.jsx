import { Outlet } from 'react-router-dom'
import AsideMenu from '../components/admin/AsideMenu'

const AdminLayout = () => {
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
