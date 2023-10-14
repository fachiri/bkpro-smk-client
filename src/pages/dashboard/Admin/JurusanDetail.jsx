import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import DashboardLayout from "../../../layouts/DashboardLayout"
import axios from "../../../utils/axios"

const Jurusan = () => {
  const [getMajor, setMajor] = useState({})
  const [getProfessions, setProfessions] = useState([])
  const params = useParams()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const major = await axios.get(`/master/majors/${params.uuid}`)
      setMajor(major.data.data)
      setProfessions(major.data.data.professions)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleDelete = async (uuid) => {
    try {
      console.log(uuid)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  return (
    <>
      <DashboardLayout
        title={`Detail Jurusan ${getMajor.major}`}
      >
        <section className="px-5 mb-5">
          <Card>
            <div className="flex justify-between items-center p-5">
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
                Tambah
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Profesi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getProfessions.map((data, idx) => (
                    <tr key={idx} className="hover">
                      <td>{data.code}</td>
                      <td>{data.profession}</td>
                      <th className="flex space-x-3">
                        <Link to={`/admin/master/profesi/${data.uuid}/edit`} className="btn btn-xs h-10 text-accent-focus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </Link>
                        <button onClick={() => handleDelete(data.uuid)} className="btn btn-xs h-10 text-accent-focus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </th>
                    </tr>
                  ))}
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

export default Jurusan