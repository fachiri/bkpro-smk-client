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
import AdminDashboard from './pages/dashboard/Admin/AdminDashboard'
import Jurusan from './pages/dashboard/Admin/Jurusan'
import JurusanCreate from './pages/dashboard/Admin/JurusanCreate'
import JurusanDetail from './pages/dashboard/Admin/JurusanDetail'
import ProfesiEdit from './pages/dashboard/Admin/ProfesiEdit'
import MasterMateri from './pages/dashboard/Admin/MasterMateri'
import MasterMateriCreate from './pages/dashboard/Admin/MasterMateriCreate'
import MasterMateriDetail from './pages/dashboard/Admin/MasterMateriDetail'
import MasterMateriEdit from './pages/dashboard/Admin/MasterMateriEdit'
import MateriDetail from './pages/dashboard/MateriDetail'
import KarirTesDetail from './pages/dashboard/KarirTesDetail'
import KonselingCreate from './pages/dashboard/KonselingCreate'
import Keamanan from './pages/dashboard/Keamanan'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dasbor" />} />
        <Route element={<AuthRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes role="SISWA" />}>
          <Route path='/dasbor' element={<Dashboard />} />
          <Route path='/layanan/konseling' element={<Konseling />} />
          <Route path='/layanan/konseling/create' element={<KonselingCreate />} />
          <Route path='/layanan/konseling/:uuid' element={<KonselingDetail />} />
          <Route path='/layanan/karir' element={<Karir />} />
          <Route path='/layanan/karir/tes' element={<KarirTes />} />
          <Route path='/layanan/karir/tes/:uuid' element={<KarirTesDetail />} />
          <Route path='/materi' element={<Materi />} />
          <Route path='/materi/:uuid' element={<MateriDetail />} />
          <Route path='/pengaturan/keamanan' element={<Keamanan />} />
        </Route>
        <Route element={<PrivateRoutes role="ADMIN" />}>
          <Route path='/admin/dasbor' element={<AdminDashboard />} />
          <Route path='/admin/master/jurusan' element={<Jurusan />} />
          <Route path='/admin/master/jurusan/create' element={<JurusanCreate />} />
          <Route path='/admin/master/jurusan/:uuid' element={<JurusanDetail />} />
          <Route path='/admin/master/profesi/:uuid/edit' element={<ProfesiEdit />} />
          <Route path='/admin/master/materi' element={<MasterMateri />} />
          <Route path='/admin/master/materi/:uuid' element={<MasterMateriDetail />} />
          <Route path='/admin/master/materi/:uuid/edit' element={<MasterMateriEdit />} />
          <Route path='/admin/master/materi/create' element={<MasterMateriCreate />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
