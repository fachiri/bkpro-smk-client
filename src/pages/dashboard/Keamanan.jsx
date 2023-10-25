import { useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "../../utils/axios"
import { useNavigate } from "react-router-dom";

const Keamanan = () => {
  const [getIsLoading, setIsLoading] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(prevState => [...prevState, 'post-reset-password']);

      const payload = {
        old_password: e.target[0].value,
        new_password: e.target[1].value,
        repeat_password: e.target[2].value
      }

      toast.promise(new Promise(resolve => resolve(axios.patch('/setting/reset-password', payload))),
        {
          pending: 'Submitting...',
          success: {
            render({ data }) {
              e.target.reset()
              localStorage.clear()
              navigate('/login')
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
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'post-reset-password'));
    }
  }

  return (
    <>
      <DashboardLayout
        title="Keamanan"
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card title="Ganti Password">
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="old_password" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Password Lama</span>
                </label>
                <input type="password" name="old_password" id="old_password" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="new_password" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Password Baru</span>
                </label>
                <input type="password" name="new_password" id="new_password" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="repeat_password" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password Baru</span>
                </label>
                <input type="password" name="repeat_password" id="repeat_password" className="input input-bordered w-full" />
              </div>
              <div className="mt-5">
                <button type="submit" disabled={getIsLoading.includes('post-reset-password') ? true : false} className="btn btn-accent">Submit</button>
              </div>
            </form>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Keamanan