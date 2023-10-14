import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Card from "../../../components/card/Card"
import DashboardLayout from "../../../layouts/DashboardLayout"
import axios from "../../../utils/axios"

const Jurusan = () => {
  const [getProfession, setProfession] = useState({})
  const [getDesc, setDesc] = useState('');
  const [getSelectedFile, setSelectedFile] = useState(null)
  const params = useParams()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const profession = await axios.get(`/master/professions/${params.uuid}`)
      setProfession(profession.data.data)
      setDesc(profession.data.data.desc)
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

    toast.promise(new Promise(resolve => resolve(axios.put(`/master/professions/${params.uuid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            getData()
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
      <DashboardLayout
        title={`Edit Profesi ${getProfession.profession}`}
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
                  defaultValue={getProfession.code}
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
                  defaultValue={getProfession.profession}
                />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="desc" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Deskripsi</span>
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
      </DashboardLayout>
    </>
  )
}

export default Jurusan