import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import DashboardLayout from "./../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "./../../utils/axios"
import { toast } from 'react-toastify'

const Konseling = () => {
  const [getCounselings, setCounselings] = useState([]);
  const [getIsLoading, setIsLoading] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      setIsLoading(prevState => [...prevState, 'fetch-counselings']);
      const counselings = await axios.get(`/counseling`)
      setCounselings(counselings.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'fetch-counselings'));
    }
  }

  return (
    <>
      <DashboardLayout
        title='Konseling'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="card bg-white shadow">
            <div className="flex flex-col sm:flex-row gap-5 mb-5 justify-between items-start sm:items-center">
              <div className="flex space-x-5">
                <select name="per-page" id="per-page" className="select select-bordered">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm input input-bordered" placeholder="Cari..." />
                  </div>
                </form>
              </div>
              <Link to="create" className="btn btn-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Mulai Konseling
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Subjek</th>
                    <th>Isi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getIsLoading.includes('fetch-counselings') ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        <span className="loading loading-dots text-neutral"></span>
                      </td>
                    </tr>
                  ) : (
                    getCounselings.map((item, idx) => (
                      <tr key={idx} className="hover">
                        <td className="align-top">{item.status}</td>
                        <td className="align-top">{item.subject}</td>
                        <td className="align-top">{item.content}</td>
                        <td className="align-top">
                          <Link to={item.uuid} className="btn btn-xs h-10 text-accent-focus">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-5 grid place-content-center">
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Halaman 1</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Konseling