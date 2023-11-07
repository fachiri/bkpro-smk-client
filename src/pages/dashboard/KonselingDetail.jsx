import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import DashboardLayout from "../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import axios from "../../utils/axios"
import Chat from "../../components/chat/Chat"

const KonselingDetail = () => {
  const [getCounseling, setCounseling] = useState({})
  const [getIsLoading, setIsLoading] = useState([]);
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const params = useParams()

  useEffect(() => {
    let intervalId;

    const fetchDataAndSetInterval = async () => {
      await fetchData();
      intervalId = setInterval(() => {
        fetchChat(intervalId);
      }, 1000);
    };

    fetchDataAndSetInterval();

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(prevState => [...prevState, 'fetch-counseling']);
      const response = await axios.get(`/counseling/${params.uuid}`)
      setCounseling(response.data.data)
      setUserId(response.data.userId)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'fetch-counseling'));
    }
  }

  const fetchChat = async (intervalId) => {
    try {
      const response = await axios.get(`/master/counselings/${params.uuid}`)
      setChats(response.data.data.chats)
    } catch (error) {
      clearInterval(intervalId);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()

    toast.promise(new Promise(resolve => resolve(axios.post(`/chat/${params.uuid}`, { chat }))),
      {
        pending: 'Mengirim pesan...',
        success: {
          render({ data }) {
            e.target.reset()
            setChat('')
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
        title='Detail Konseling'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            {getIsLoading.includes('fetch-counseling') ? (
              <div className="text-center mt-3">
                <span className="loading loading-dots text-neutral"></span>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg mb-3">{getCounseling.subject}</h2>
                  <div>
                    {getCounseling.content}
                  </div>
                </div>
                <button className={`btn ${getCounseling.status === 'SELESAI' ? 'bg-success' : getCounseling.status === 'BERLANGSUNG' ? 'bg-info' : ''}`}>
                  {getCounseling.status}
                </button>
              </div>
            )}
          </Card>
        </section>
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card className="overflow-y-auto">
            {getCounseling.status == 'PENDING' ?
              <div className="text-center italic">
                Chat belum tersedia
              </div>
              :
              <Chat chats={chats} userId={userId} />
            }
          </Card>
        </section>
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          {getCounseling.status == 'BERLANGSUNG' ?
            <Card className="shadow p-5 max-h-screen overflow-y-auto">
              <form
                onSubmit={handleSend}
                className="w-full flex space-x-5"
              >
                <textarea onChange={e => setChat(e.target.value)} name="chat" id="chat" className="textarea textarea-bordered grow resize-none" placeholder="Tulis Pesan..."></textarea>
                <button
                  type="submit"
                  className="btn btn-accent"
                >
                  Kirim
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            </Card>
            :
            null
          }
        </section>
      </DashboardLayout>
    </>
  )
}

export default KonselingDetail