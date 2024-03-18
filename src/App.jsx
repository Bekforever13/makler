import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/client/HomePage'
import ArendaPage from './pages/client/ArendaPage'
import SatiwPage from './pages/client/SatiwPage'
import SignUp from './pages/admin/SignUpPage'
import InfoPage from './pages/client/InfoPage'
import FavoritesPage from './pages/client/FavoritesPage'
import MapPage from './pages/client/MapPage'
import NotFound from './pages/NotFound'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/DashboardPage'
import ApartmentPage from './pages/admin/ApartmentPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import SubcategoriesPage from './pages/admin/SubcategoriesPage'
import TagsPage from './pages/admin/TagsPage'
import RegionsPage from './pages/admin/RegionPage'
import ApartmentEditPage from './pages/admin/ApartmentEditPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/rent" element={<ArendaPage />} />
          <Route path="/sale" element={<SatiwPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/info/:id" element={<InfoPage />} />
        </Route>
        <Route path="/login" element={<SignUp />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/apartments" element={<ApartmentPage />} />
          <Route path="/admin/apartments/:id" element={<ApartmentEditPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/subcategories" element={<SubcategoriesPage />} />
          <Route path="/admin/tags" element={<TagsPage />} />
          <Route path="/admin/regions" element={<RegionsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
