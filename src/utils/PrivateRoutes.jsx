import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from './axios'
import FullLoading from "./../components/dashboard/FullLoading"

const PrivateRoutes = ({ role }) => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (!accessToken) {
      toast.error('Akses tidak valid')
      return setToken(false)
    }

    axios.get(`/auth/verify-token/${userData.role}`)
      .then((user) => {
        if (user.data.data.role != role) {
          return setToken(false)
        }
        
        setToken(true)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message)
        return setToken(false)
      })
  }, [])

  if (token === null) {
    return <FullLoading />
  }

  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes