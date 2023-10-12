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
import Home from './pages/guest/Home'
import MateriPembelajaran from './pages/guest/MateriPembelajaran'
import Tentang from './pages/guest/Tentang'
import MateriPembelajaranDetail from './pages/guest/MateriPembelajaranDetail'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materi-pembelajaran" element={<MateriPembelajaran />} />
        <Route path="/materi-pembelajaran/:slug" element={<MateriPembelajaranDetail />} />
        <Route path="/tentang" element={<Tentang />} />
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
