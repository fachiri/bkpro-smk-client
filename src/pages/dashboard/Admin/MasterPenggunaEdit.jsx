import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"

const MasterPenggunaEdit = () => {
  const [getData, setData] = useState({})
  const params = useParams()

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const user = await axios.get(`/master/users/${params.uuid}`)
      setData(user.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: e.target[0].value,
      role: e.target[1].value,
      master_number: e.target[2].value,
    }

    toast.promise(new Promise(resolve => resolve(axios.put(`/master/users/${params.uuid}`, formData))),
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
      <AdminLayout
        title={`Edit Pengguna`}
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="name" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</span>
                </label>
                <input type="text" name="name" id="name" defaultValue={getData.name} className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="role" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Role</span>
                </label>
                <select className="select select-bordered w-full" name="role" id="role" value={getData.role}>
                  <option value="GURU">GURU</option>
                  <option value="SISWA">SISWA</option>
                </select>
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="master_number" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nomor Induk</span>
                </label>
                <input type="text" name="master_number" id="master_number" defaultValue={getData.master_number} className="input input-bordered w-full" />
              </div>
              <div className="mt-5">
                <button type="submit" className="btn btn-accent">Submit</button>
              </div>
            </form>
          </Card>
        </section>
      </AdminLayout>
    </>
  )
}

export default MasterPenggunaEdit