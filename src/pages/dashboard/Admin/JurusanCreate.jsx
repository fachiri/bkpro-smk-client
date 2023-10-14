import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "./../../../utils/axios"

const Jurusan = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      code: e.target[0].value.toUpperCase(),
      major: e.target[1].value
    }

    toast.promise(new Promise(resolve => resolve(axios.post('/master/majors', payload))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            e.target.reset()
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
        title='Jurusan'
      >
        <section className="px-5 mb-5">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="code" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Kode</span>
                </label>
                <input type="text" name="code" className="input input-bordered w-full uppercase" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="major" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Jurusan</span>
                </label>
                <input type="text" name="major" className="input input-bordered w-full" />
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

export default Jurusan