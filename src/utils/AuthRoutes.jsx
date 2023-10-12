import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from './axios'
import FullLoading from "../components/dashboard/FullLoading"

const AuthRoutes = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return setToken(false)
    }
    axios.get(`/auth/verify-token/${userData.role}`)
      .then(() => setToken(true))
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