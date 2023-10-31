import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Card from "../../../components/card/Card"
import GuruLayout from "../../../layouts/GuruLayout"
import axios from "../../../utils/axios"

const MasterMateriEdit = () => {
  const [getMaterial, setMaterial] = useState({})
  const [getSelectedFile, setSelectedFile] = useState(null)
  const params = useParams()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const material = await axios.get(`/master/materials/${params.uuid}`)
      setMaterial(material.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', e.target[0].value)
    formData.append('desc', e.target[1].value)
    formData.append('file', getSelectedFile)

    toast.promise(new Promise(resolve => resolve(axios.put(`/master/materials/${params.uuid}`, formData, {
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
      <GuruLayout
        title={`Edit Materi`}
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="code" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Judul Materi</span>
                </label>
                <input type="text" name="title" defaultValue={getMaterial.title} className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="material" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Deskripsi Singkat</span>
                </label>
                <textarea name="desc" className="textarea textarea-bordered" defaultValue={getMaterial.desc}></textarea>
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="file" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">File</span>
                </label>
                <input name="file" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" className="file-input file-input-sm file-input-md file-input-bordered w-full" />
              </div>
              <div className="mt-5">
                <button type="submit" className="btn btn-accent">Submit</button>
              </div>
            </form>
          </Card>
        </section>
      </GuruLayout>
    </>
  )
}

export default MasterMateriEdit