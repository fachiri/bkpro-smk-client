import { useEffect, useState } from "react";
import Card from "../../components/card/Card"
import DashboardLayout from "../../layouts/DashboardLayout"
import axios from "./../../utils/axios"
import { downloadFile } from "../../utils";

const Materi = () => {
  const [getMaterials, setMaterials] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const materials = await axios.get(`/materials`)
      setMaterials(materials.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  return (
    <>
      <DashboardLayout
        title='Materi'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getMaterials.map((item, idx) => (
                    <tr key={idx} className="hover">
                      <td className="align-top">{item.title}</td>
                      <td className="align-top">{item.desc}</td>
                      <th className="align-top">
                        <button onClick={() => downloadFile(item.file, item.title)} className="btn btn-xs h-10 text-accent-focus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 grid place-content-center">
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Halaman 1</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Materi