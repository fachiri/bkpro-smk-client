import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"

const JurusanProfesiCreate = () => {
  const [getMajor, setMajor] = useState({})
  const [getDesc, setDesc] = useState('');
  const [getSelectedFile, setSelectedFile] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`/master/majors/${params.uuid}`)
      setMajor(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('code', e.target[0].value.toUpperCase())
    formData.append('profession', e.target[1].value)
    formData.append('desc', getDesc)
    formData.append('file', getSelectedFile)

    toast.promise(new Promise(resolve => resolve(axios.post(`/master/majors/${params.uuid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            e.target.reset()
            navigate(`/admin/master/jurusan/${params.uuid}`)
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
        title={`Tambah Profesi Jurusan ${getMajor.major}`}
      >
        <section className="px-5 mb-5">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="code" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Kode</span>
                </label>
                <input
                  type="text"
                  name="code"
                  className="input input-bordered w-full uppercase"
                />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="profession" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Profesi</span>
                </label>
                <input
                  type="text"
                  name="profession"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="desc" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">File</span>
                </label>
                <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" className="file-input file-input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="desc" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Deskripsi</span>
                </label>
                <div className="mb-12">
                  <ReactQuill theme="snow" value={getDesc} onChange={setDesc} className="h-screen" />
                </div>
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

export default JurusanProfesiCreate