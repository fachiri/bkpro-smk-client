import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import Card from "../../components/card/Card"
import DashboardLayout from "../../layouts/DashboardLayout"
import axios from "../../utils/axios"

const MateriDetail = () => {
  const [getMaterial, setMaterial] = useState({})
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const material = await axios.get(`/materials/${params.uuid}`)
      setMaterial(material.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  }

  return (
    <>
      <DashboardLayout
        title="Detail Materi"
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            <div className="flex flex-col sm:flex-row gap-5 mb-5 justify-between items-start sm:items-center">
              <div className="flex space-x-5">
                
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div>
                <h5 className="font-bold mb-2">Judul</h5>
                <div>
                  {getMaterial.title}
                </div>
              </div>
              <div className="divider my-1"></div>
              <div>
                <h5 className="font-bold mb-2">Deskripsi</h5>
                <div>
                  {getMaterial.desc}
                </div>
              </div>
              <div className="divider my-1"></div>
              <div>
                <h5 className="font-bold mb-2">File</h5>
                <div className="h-96">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={`${getMaterial.file}`} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default MateriDetail