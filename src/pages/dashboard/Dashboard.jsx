import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import DashboardLayout from "./../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "../../utils/axios"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [getStats, setStats] = useState([]);
  const [getIsLoading, setIsLoading] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(prevState => [...prevState, 'data-stats']);
      const response = await axios.get(`/dashboard/siswa/${JSON.parse(localStorage.getItem('userData')).uuid}`)
      setStats(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'data-stats'));
    }
  }

  return (
    <>
      <DashboardLayout
        title='Dashboard'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="space-y-5">
            <div className="stat border rounded">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-title">Tes Karir</div>
              <div className="stat-value text-primary">{getStats.testsCount}</div>
              <div className="stat-desc">Lihat <Link to="/layanan/karir" className="text-primary underline">riwayat tes karir</Link></div>
            </div>
            <div className="stat border rounded">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Konseling</div>
              <div className="stat-value">{getStats.counselingsCount}</div>
              <div className="stat-desc text-secondary">{getStats.pendingCounselingsCount} konseling pending</div>
              <div className="stat-desc">{getStats.processCounselingsCount} konseling proses</div>
              <div className="stat-desc text-primary">{getStats.completedCounselingsCount} konseling selesai</div>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Dashboard