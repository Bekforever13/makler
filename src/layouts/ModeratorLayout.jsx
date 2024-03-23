import { Outlet } from 'react-router-dom'
import ModeratorMenu from '../components/moderator/ModeratorMenu'

const ModeratorLayout = () => {
  // const { isAuthenticated } = useSelector((s) => s.auth)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-blue-gray-100 w-full">
      <ModeratorMenu />
      <div className="ml-[215px] py-5">
        <Outlet />
      </div>
    </div>
  )
}

export default ModeratorLayout
