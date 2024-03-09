import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/HomePage'
import ArendaPage from './pages/ArendaPage'
import SatiwPage from './pages/SatiwPage'
import SignUp from './pages/SignUp'
import JerJayPage from './pages/JerJayPage'
import ImaratPage from './pages/ImaratPage'
import KavartiraPage from './pages/KavartiraPage'
import InfoPage from './pages/InfoPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="arenda" element={<ArendaPage />} />
          <Route path="satiw" element={<SatiwPage />} />
          <Route path="jer_jay" element={<JerJayPage />} />
          <Route path="imarat" element={<ImaratPage />} />
          <Route path="kvartira" element={<KavartiraPage />} />
          <Route path="/info/:id" element={<InfoPage />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
