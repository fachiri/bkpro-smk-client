import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import DashboardLayout from "../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "../../utils/axios"


const KonselingCreate = () => {
  const [getIsLoading, setIsLoading] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(prevState => [...prevState, 'post-counseling']);

      const payload = {
        subject: e.target[0].value,
        content: e.target[1].value
      }

      toast.promise(new Promise(resolve => resolve(axios.post('/counseling', payload))),
        {
          pending: 'Submitting...',
          success: {
            render({ data }) {
              e.target.reset()
              navigate(`/layanan/konseling/${data.data.data.uuid}`)
              return data.data.message
            }
          },
          error: {
            render({ data }) {
              setIsLoading(prevState => prevState.filter(item => item !== 'post-counseling'));
              return data.response?.data?.message || data.message
            }
          }
        }
      )
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <>
      <DashboardLayout
        title='Buat Tiket Konseling'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="card bg-white shadow">
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="subject" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Subjek Konseling</span>
                </label>
                <input type="text" name="subject" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="content" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Isian</span>
                </label>
                <textarea name="content" className="textarea textarea-bordered"></textarea>
              </div>
              <div className="mt-5">
                <button type="submit" disabled={getIsLoading.includes('post-counseling') ? true : false} className="btn btn-accent">Submit</button>
              </div>
            </form>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default KonselingCreate