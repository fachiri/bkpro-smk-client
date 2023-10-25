import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import axios from './axios'
import FullLoading from "../components/dashboard/FullLoading"

const AuthRoutes = () => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return setToken(false)
    }
    axios.get(`/auth/verify-token/${userData.role}`)
    .then((user) => {
        if (user.data.data.role == 'ADMIN') {
          return navigate('/admin/dasbor')
        }
  
        if (user.data.data.role == 'SISWA') {
          return navigate('/dasbor')
        }
  
        if (user.data.data.role == 'GURU') {
          return navigate('/guru/dasbor')
        }
        setToken(true)}
      )
      .catch(() => {
        return setToken(false)
      })
  }, [])

  if (token === null) {
    return <FullLoading />
  }

  return (
    token ? <Navigate to="/dasbor" /> : <Outlet />
  )
}

export default AuthRoutes