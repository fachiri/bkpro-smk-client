import { Link } from "react-router-dom"
import DashboardLayout from "../../layouts/DashboardLayout"
import Card from "../../components/card/Card"
import { useEffect, useState } from "react"
import axios from "./../../utils/axios"
import { toast } from 'react-toastify'
import { isEmpty, shuffleArray } from "../../utils"

const KarirTes = () => {
  const [getIndex, setIndex] = useState(0)
  const [getProfessions, setProfessions] = useState([])
  const [getQuestions, setQuestions] = useState([])
  const [getFacts, setFacts] = useState(null)
  const [getIsFinish, setIsFinish] = useState(false)
  const [getIsLoading, setIsLoading] = useState(true)

  const handleAnswer = async (code, choice) => {
    try {
      setIsLoading(true)

      const uuid = JSON.parse(localStorage.getItem('userData')).uuid
      let answer

      const userRes = await axios.get(`/user/${uuid}`)
      const user = userRes.data.data

      const facts = choice == null ? null : {
        ...getFacts,
        [code]: choice
      }

      if (getIndex < getQuestions.length - 1 && !isEmpty(facts)) {
        setIndex(getIndex + 1)
        setFacts(facts)
      } else {
        const answerRes = await axios.post('/answer', {
          facts,
          majorCode: user.major.code
        })

        answer = answerRes.data.data

        if (answer.professions && answer.professions[0].code == 'P0') {
          setIsFinish(answer.isFinish)
          return setProfessions(answer.professions)
        }

        setFacts(answer.facts)
        if (answer.isFinish) {
          const professionPromises = answer.professions.map(async profession => {
            const professionRes = await axios.get(`/professions/${profession.code}/detail`)
            return { ...professionRes.data.data }
          })

          const professionsData = await Promise.all(professionPromises)
          setProfessions(professionsData)
          return setIsFinish(answer.isFinish)
        }

        setQuestions(shuffleArray(answer.questions))
        setIndex(0)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DashboardLayout
        title='Tes Karir'
      >
        <section className="px-5 mb-5">
          {getIsFinish
            ?
            <Card title="Hasil Tes">
              {getProfessions[0].code == 'P0'
                ?
                <>
                  <p className="mb-5">{getProfessions[0].profession}</p>
                  <div>
                    <Link to="/layanan/karir" className="btn btn-accent">
                      Kembali
                    </Link>
                  </div>
                </>
                :
                <>
                  <p className="mb-5">Berdasarkan hasil tes yang telah Anda lakukan, nampaknya Anda memiliki karakteristik dan keterampilan yang sesuai dengan beberapa profesi yang mungkin Anda pertimbangkan:</p>
                  <div className="flex space-x-3 mb-5">
                    <button className="btn btn-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Download PDF
                    </button>
                    <button className="btn btn-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                      </svg>
                      Simpan Hasil Tes
                    </button>
                  </div>
                  <div className="join join-vertical w-full">
                    {getProfessions.map(({ uuid, code, profession, desc }, idx) => (
                      <div key={idx} className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name={`profession-detail`} />
                        <div className="collapse-title text-lg font-medium">
                          {profession}
                        </div>
                        <div className="collapse-content text-base">
                          <div dangerouslySetInnerHTML={{ __html: desc }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            </Card>
            :
            <Card className="py-10">
              {isEmpty(getQuestions)
                ?
                <div className="grid place-items-center gap-5">
                  <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores repudiandae laborum fugit molestiae eius voluptates sapiente est nobis cumque?</p>
                  <div>
                    <button className="btn btn-accent" onClick={() => handleAnswer()}>Mulai Sekarang</button>
                  </div>
                </div>
                :
                <div className="grid place-items-center gap-10">
                  <div className="border-b-2 border-accent text-accent-focus px-4 py-2 font-medium">
                    {getIndex + 1} / {getQuestions.length}
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-lg">{getQuestions[getIndex].competency}</p>
                  </div>
                  <div className="space-x-3">
                    <button className="btn btn-secondary w-28" disabled={getIsLoading} onClick={() => handleAnswer(getQuestions[getIndex].code, false)}>Tidak</button>
                    <button className="btn btn-primary w-28" disabled={getIsLoading} onClick={() => handleAnswer(getQuestions[getIndex].code, true)}>Ya</button>
                  </div>
                </div>
              }
            </Card>
          }
        </section>
      </DashboardLayout>
    </>
  )
}

export default KarirTes