import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import GuestLayout from "../../layouts/GuestLayout";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Link } from "react-router-dom";

function Home() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <>
      <GuestLayout>
        <section className="mt-5 pt-10 text-center">
          <h1 className="font-bold text-2xl md:text-3xl max-w-xl mx-auto mb-5">Layanan Bimbingan Konseling dan Pemilihan Karir serta Dapatkan Materi Secara Gratis</h1>
          <Link to="/materi-pembelajaran">
            <button className="btn btn-accent">Materi Pembelajaran</button>
          </Link>
        </section>
        <section className="mt-5 h-screen py-10">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl="/src/assets/materi/membangun-rasa-percaya-diri.pdf" plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </section>
      </GuestLayout>
    </>
  );
}

export default Home;