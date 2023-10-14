import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import GuestLayout from "../../layouts/GuestLayout";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Link, useParams } from "react-router-dom";

function MateriPembelajaranDetail() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const { slug } = useParams()

  return (
    <>
      <GuestLayout>
        <section className="mt-5 pt-5">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-accent">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
            <h1>
              <Link to="/materi-pembelajaran" className='btn btn-link font-medium'>Materi Pembelajaran</Link>
              <span className="pr-3">/</span>
              <span className="font-medium capitalize">
                {slug.replaceAll('-', ' ')}
              </span>
            </h1>
          </div>
        </section>
        <section className="h-screen py-10">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={`/materi/${slug}.pdf`} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </section>
      </GuestLayout>
    </>
  );
}

export default MateriPembelajaranDetail;