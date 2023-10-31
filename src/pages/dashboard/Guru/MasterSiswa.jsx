import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import GuruLayout from "../../../layouts/GuruLayout"
import axios from "../../../utils/axios"

const MasterSiswa = () => {
  const [getData, setData] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedMajor, setSelectedMajor] = useState('');

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/master/users?role=SISWA`)
      const majors = await axios.get(`/majors`)
      setData(response.data.data)
      setMajors(majors.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleImport = () => {
    const formData = new FormData();
    formData.append('major', selectedMajor)
    formData.append('file', selectedFile)

    toast.promise(new Promise(resolve => resolve(axios.post('/master/users/import', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            fetchData()
            return data.data.message
          }
        },
        error: {
          render({ data }) {
            return data.response?.data?.message || data.message
          }
        }
      }
    )
  }

  return (
    <>
      <GuruLayout
        title='Siswa'
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
              <div className="flex space-x-3">
                <button onClick={() => document.getElementById('import-modal').showModal()} className="btn btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Import
                </button>
                <dialog id="import-modal" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Import data Siswa</h3>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Jurusan</span>
                      </label>
                      <select
                        name="major"
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        className="select select-bordered w-full"
                      >
                        <option hidden>-- Pilih Jurusan --</option>
                        {majors.map((data, idx) => (
                          <option key={idx} value={data.id}>{data.major}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Pilih file</span>
                      </label>
                      <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" className="file-input file-input-bordered w-full" />
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        <button onClick={handleImport} className="btn btn-accent">Submit</button>
                        <button className="btn" id="close-btn">Batal</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                {/* <Link to="create" className="btn btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Tambah
                </Link> */}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>NISN</th>
                    <th>Jurusan</th>
                    <th>Kelas</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((data, idx) => (
                    <tr key={idx} className="hover">
                      <td className="align-top">{data.name}</td>
                      <td className="align-top">{data.master_number}</td>
                      <td className="align-top">{data.major.major}</td>
                      <td className="align-top">{data.class}</td>
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

export default MasterSiswa