import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import DashboardLayout from "../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "../../utils/axios"

const KonselingDetail = () => {
  const [getCounseling, setCounseling] = useState({})
  const [getIsLoading, setIsLoading] = useState([]);
  const params = useParams()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(prevState => [...prevState, 'fetch-counseling']);

      const response = await axios.get(`/counseling/${params.uuid}`)
      setCounseling(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'fetch-counseling'));
    }
  }

  return (
    <>
      <DashboardLayout
        title='Detail Konseling'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            {getIsLoading.includes('fetch-counseling') ? (
              <div className="text-center mt-3">
                <span className="loading loading-dots text-neutral"></span>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-lg mb-3">{getCounseling.subject}</h2>
                <div>
                  {getCounseling.content}
                </div>
              </>
            )}
          </Card>
        </section>
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="overflow-y-auto">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc" />
                </div>
              </div>
              <div className="chat-header">
                John
                <time className="text-xs opacity-50 ms-2">12:45</time>
              </div>
              <div className="chat-bubble bg-slate-200 text-accent-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perferendis saepe quibusdam? Assumenda quia enim alias sunt pariatur aspernatur doloribus et, at voluptatibus omnis hic dolores quos corrupti explicabo suscipit?</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-header">
                <time className="text-xs opacity-50 ms-2">12:46</time>
              </div>
              <div className="chat-bubble chat-bubble-accent">Lorem ipsum dolor sit amet.</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc" />
                </div>
              </div>
              <div className="chat-header">
                John
                <time className="text-xs opacity-50 ms-2">12:45</time>
              </div>
              <div className="chat-bubble bg-slate-200 text-accent-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minima deleniti officiis doloremque at explicabo suscipit expedita excepturi obcaecati laboriosam.</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc" />
                </div>
              </div>
              <div className="chat-header">
                John
                <time className="text-xs opacity-50 ms-2">12:45</time>
              </div>
              <div className="chat-bubble bg-slate-200 text-accent-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nostrum ab magni. Omnis, fuga veniam sunt perferendis doloremque voluptas vel atque blanditiis modi tempora rerum, suscipit id, quae obcaecati officia explicabo corporis quaerat dignissimos dolorem totam cum! Obcaecati dolorem repellat soluta cumque voluptatibus ipsum dicta aliquid est, aliquam et nam!</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-header">
                <time className="text-xs opacity-50 ms-2">12:46</time>
              </div>
              <div className="chat-bubble chat-bubble-accent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque placeat perferendis nisi. Maxime, necessitatibus! Est?</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc" />
                </div>
              </div>
              <div className="chat-header">
                John
                <time className="text-xs opacity-50 ms-2">12:45</time>
              </div>
              <div className="chat-bubble bg-slate-200 text-accent-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perferendis saepe quibusdam? Assumenda quia enim alias sunt pariatur aspernatur doloribus et, at voluptatibus omnis hic dolores quos corrupti explicabo suscipit?</div>
            </div>
          </Card>
        </section>
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="hadow p-5 max-h-screen overflow-y-auto">
            <div className="w-full flex space-x-5">
              <textarea name="chat" id="chat" className="textarea textarea-bordered grow resize-none" placeholder="Tulis Pesan..."></textarea>
              <button className="btn btn-accent">
                Kirim
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default KonselingDetail