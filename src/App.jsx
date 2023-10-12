import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Materi from './pages/dashboard/Materi'
import PrivateRoutes from './utils/PrivateRoutes'
import Konseling from './pages/dashboard/Konseling'
import KonselingDetail from './pages/dashboard/KonselingDetail'
import Karir from './pages/dashboard/Karir'
import AuthRoutes from './utils/AuthRoutes'
import KarirTes from './pages/dashboard/KarirTes'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<AuthRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/dasbor' element={<Dashboard />} />
          <Route path='/layanan/konseling' element={<Konseling />} />
          <Route path='/layanan/konseling/:uuid' element={<KonselingDetail />} />
          <Route path='/layanan/karir' element={<Karir />} />
          <Route path='/layanan/karir/tes' element={<KarirTes />} />
          <Route path='/materi' element={<Materi />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
