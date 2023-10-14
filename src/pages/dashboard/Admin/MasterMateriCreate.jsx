import { useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"
import { useNavigate } from "react-router-dom"

const MasterMateriCreate = () => {
  const [getSelectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', e.target[0].value)
    formData.append('desc', e.target[1].value)
    formData.append('file', getSelectedFile)

    toast.promise(new Promise(resolve => resolve(axios.post('/master/materials', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            e.target.reset()
            navigate(`/admin/master/materi/${data.data.data.uuid}`)
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
        title='Tambah Materi'
      >
        <section className="px-5 mb-5">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="code" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Judul Materi</span>
                </label>
                <input type="text" name="title" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="material" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Deskripsi Singkat</span>
                </label>
                <textarea name="desc" className="textarea textarea-bordered"></textarea>
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="file" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">File</span>
                </label>
                <input name="file" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" className="file-input file-input-md file-input-bordered w-full" />
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

export default MasterMateriCreate