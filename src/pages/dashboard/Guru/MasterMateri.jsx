import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import GuruLayout from "../../../layouts/GuruLayout"
import axios from "../../../utils/axios"

const MasterMateri = () => {
  const [getMaterials, setMaterials] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const materials = await axios.get(`/master/materials`)
      setMaterials(materials.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  return (
    <>
      <GuruLayout
        title='Materi'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
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
                Tambah
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Judul Materi</th>
                    <th>Deskripsi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getMaterials.map((data, idx) => (
                    <tr key={idx} className="hover">
                      <td className="align-top">{data.title}</td>
                      <td className="align-top">{data.desc}</td>
                      <th className="flex space-x-3 align-top">
                        <Link to={data.uuid} className="btn btn-xs h-10 text-accent-focus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                          </svg>
                        </Link>
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
      </GuruLayout>
    </>
  )
}

export default MasterMateri