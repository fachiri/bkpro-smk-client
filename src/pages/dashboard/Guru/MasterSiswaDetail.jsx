import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import GuruLayout from "../../../layouts/GuruLayout"
import axios from "../../../utils/axios"

const MasterSiswaDetail = () => {
  const [getData, setData] = useState({})
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const user = await axios.get(`/master/users/${params.uuid}`)
      setData(user.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleDelete = async () => {
    const closeButton = document.getElementById('close-btn');
    closeButton.click();

    toast.promise(new Promise(resolve => resolve(axios.delete(`/master/users/${params.uuid}`))),
      {
        pending: 'Menghapus...',
        success: {
          render({ data }) {
            navigate('/guru/master/siswa')
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
        title="Detail Siswa"
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            <div className="flex flex-col sm:flex-row gap-5 mb-5 justify-between items-start sm:items-center">
              <div className="flex space-x-5">
                <Link to="edit" className="btn btn-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
                <button onClick={() => document.getElementById('delete-btn').showModal()} className="btn btn-error">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Hapus
                </button>
                <dialog id="delete-btn" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Peringatan</h3>
                    <p className="py-4">Anda akan menghapus data <b>"{getData.name}"</b></p>
                    <div className="modal-action">
                      <button onClick={handleDelete} className="btn btn-error">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Hapus
                      </button>
                      <form method="dialog">
                        <button className="btn" id="close-btn">Batal</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div>
                <h5 className="font-bold mb-2">Nama</h5>
                <div>
                  {getData.name}
                </div>
              </div>
              <div className="divider my-1"></div>
              <div>
                <h5 className="font-bold mb-2">NISN</h5>
                <div>
                  {getData.master_number}
                </div>
              </div>
              <div className="divider my-1"></div>
              <div>
                <h5 className="font-bold mb-2">Jurusan</h5>
                <div>
                  {getData.major?.major}
                </div>
              </div>
              <div className="divider my-1"></div>
              <div>
                <h5 className="font-bold mb-2">Kelas</h5>
                <div>
                  {getData.class}
                </div>
              </div>
            </div>
          </Card>
        </section>
      </GuruLayout>
    </>
  )
}

export default MasterSiswaDetail