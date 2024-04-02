import { Outlet } from 'react-router-dom'
import ModeratorMenu from '../components/moderator/ModeratorMenu'

const ModeratorLayout = () => {
  return (
    <div className="min-h-screen bg-blue-100 w-full">
      <ModeratorMenu />
      <div className="ml-[215px] py-5">
        <Outlet />
      </div>
    </div>
  )
}

export default ModeratorLayout
