import { Link } from "react-router-dom"
import DashboardLayout from "./../../layouts/DashboardLayout"

const Konseling = () => {
  const counselingSessions = [
    {
      uuid: 'd4f5367c-53c1-4a21-823b-05532a2012a1',
      subject: 'Menghadapi Stres Ujian Akhir',
      content: 'Saya merasa sangat stres menghadapi ujian akhir tahun ini. Saya ingin mendapatkan strategi untuk mengatasi stres ini dan mempersiapkan diri sebaik mungkin.'
    },
    {
      uuid: 'e6f24c42-80ad-4d62-a253-cb0ef23bb77d',
      subject: 'Pilihan Karir dan Rencana Masa Depan',
      content: 'Saya bingung tentang pilihan karir yang harus saya ambil setelah lulus dari SMK. Saya ingin berbicara tentang rencana masa depan dan bagaimana saya bisa mencapai tujuan karir saya.'
    },
    {
      uuid: '37e0d8a1-50e4-4e8d-9c6c-8f7545a0c4b2',
      subject: 'Mengatasi Tekanan Teman Sebaya',
      content: 'Saya merasa tertekan oleh teman-teman sebaya saya untuk melakukan hal-hal yang saya tidak nyaman lakukan. Bagaimana cara saya mengatasi tekanan ini dan tetap setia pada nilai-nilai saya?'
    },
    {
      uuid: '9bfb33f4-9e42-47f7-9b67-4cc08e3184f7',
      subject: 'Pengembangan Keterampilan Belajar',
      content: 'Saya ingin meningkatkan keterampilan belajar saya agar bisa lebih efektif dalam menghadapi pelajaran di sekolah. Bisakah Anda membantu saya dengan strategi belajar yang lebih baik?'
    },
    {
      uuid: 'cabc47ac-89d4-4d90-a795-5d5664239d78',
      subject: 'Mengelola Waktu dan Tugas Sekolah',
      content: 'Saya sering merasa kewalahan dengan tugas-tugas sekolah dan sulit mengelola waktu saya. Bagaimana saya bisa lebih efisien dalam mengatasi tugas-tugas ini?'
    }
  ]

  return (
    <>
      <DashboardLayout
        title='Konseling'
      >
        <section className="px-5 mb-5">
          <div className="card bg-white shadow">
            <div className="flex justify-between items-center p-5">
              <div className="flex space-x-5">
                <select name="per-page" id="per-page" className="select select-bordered">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm input input-bordered" placeholder="Cari..." />
                  </div>
                </form>
              </div>
              <button className="btn btn-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Buat Tiket
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subjek</th>
                    <th>Isi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {counselingSessions.map((item, idx) => (
                    <tr key={idx} className="hover">
                      <td>{item.subject}</td>
                      <td>{item.content}</td>
                      <th>
                        <Link to={item.uuid} className="btn btn-xs h-10 text-accent-focus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                        </Link>
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
          </div>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Konseling