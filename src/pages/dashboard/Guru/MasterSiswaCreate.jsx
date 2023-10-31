import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"
import { useNavigate } from "react-router-dom"

const MasterPenggunaCreate = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: e.target[0].value,
      role: e.target[1].value,
      master_number: e.target[2].value,
      password: e.target[3].value,
    }

    toast.promise(new Promise(resolve => resolve(axios.post('/master/users', formData))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            e.target.reset()
            navigate(`/admin/master/pengguna/${data.data.data.uuid}`)
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
        title='Tambah Pengguna'
      >
        <section className="px-5 mb-5">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="name" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</span>
                </label>
                <input type="text" name="name" id="name" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="code" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Role</span>
                </label>
                <select className="select select-bordered w-full">
                  <option value="" selected>-- Pilih Role --</option>
                  <option value="GURU">GURU</option>
                  <option value="SISWA">SISWA</option>
                </select>
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="master_number" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nomor Induk</span>
                </label>
                <input type="text" name="master_number" id="master_number" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="password" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Password</span>
                </label>
                <input type="password" name="password" id="password" className="input input-bordered w-full" />
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

export default MasterPenggunaCreate