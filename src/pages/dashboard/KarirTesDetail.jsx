import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

import Card from "../../components/card/Card"
import DashboardLayout from "../../layouts/DashboardLayout"
import axios from "../../utils/axios"
import { downloadFile, isEmpty } from "../../utils";
import Display from "../../components/richEditor/Display";

const KarirTesDetail = () => {
  const [getCareerTest, setCareerTest] = useState({})
  const [getProfessions, setProfessions] = useState([])
  const [getIsLoading, setIsLoading] = useState([]);
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!isEmpty(getCareerTest)) {
      fetchAnswer();
    }
  }, [getCareerTest])

  const fetchData = async () => {
    try {
      setIsLoading(prevState => [...prevState, 'fetch-profession']);

      const response = await axios.get(`/tests/${params.uuid}`)
      setCareerTest(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const fetchAnswer = async () => {
    try {
      let facts = {}
      getCareerTest.test_facts.map((e) => facts[e.code] = e.value == 1 ? true : false)
      const majorCode = getCareerTest.user.major.code

      const response = await axios.post(`/answer`, {
        facts, majorCode
      })

      const answer = response.data.data

      if (answer.isFinish) {
        fetchProfession(answer)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const fetchProfession = async (answer) => {
    try {
      const professionPromises = answer.professions.map(async profession => {
        const professionRes = await axios.get(`/professions/${profession.code}/detail`)
        return { ...professionRes.data.data }
      })
      const professionsData = await Promise.all(professionPromises)
      setProfessions(professionsData)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'fetch-profession'));
    }
  }

  const handleDelete = async () => {
    toast.promise(new Promise(resolve => resolve(axios.delete(`/tests/${params.uuid}`))),
      {
        pending: 'Menghapus...',
        success: {
          render({ data }) {
            navigate('/layanan/karir')
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
        title="Detail Tes Karir"
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            {getIsLoading.includes('fetch-profession') ? (
              <div className="text-center mt-3">
                <span className="loading loading-dots text-neutral"></span>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-5 mb-5 justify-between items-start sm:items-center">
                  <div className="flex space-x-5">
                    <button onClick={() => document.getElementById('delete-btn').showModal()} className="btn btn-error">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Hapus
                    </button>
                    <dialog id="delete-btn" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Peringatan</h3>
                        <p className="py-4">Data yang telah dihapus, tidak dapat dikembalikan. <strong>Apakah Anda yakin ingin menghapus?</strong></p>
                        <div className="modal-action">
                          <button onClick={handleDelete} className="btn btn-error">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <p className="mb-5">Berdasarkan hasil tes yang telah Anda lakukan, nampaknya Anda memiliki karakteristik dan keterampilan yang sesuai dengan beberapa profesi berikut ini yang mungkin Anda dapat pertimbangkan:</p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    {getProfessions.map(({ profession, file }, idx) => (
                      file &&
                      <button key={idx} onClick={() => downloadFile(`http://localhost:5000/uploads/profesi/${file}`, profession)} className="btn btn-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        {profession}
                      </button>
                    ))
                    }
                  </div>
                  <div className="join join-vertical w-full">
                    {getProfessions.map(({ uuid, code, profession, desc, file }, idx) => (
                      <div key={idx} className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name={`profession-detail`} />
                        <div className="collapse-title text-lg font-medium">
                          {profession}
                        </div>
                        <div className="collapse-content text-base">
                          <Display desc={desc} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default KarirTesDetail