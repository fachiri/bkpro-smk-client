import { Link } from "react-router-dom"
import DashboardLayout from "../../layouts/DashboardLayout"

const KonselingDetail = () => {
  const counseling = {
    uuid: 'd4f5367c-53c1-4a21-823b-05532a2012a1',
    subject: 'Menghadapi Stres Ujian Akhir',
    content: 'Saya merasa sangat stres menghadapi ujian akhir tahun ini. Saya ingin mendapatkan strategi untuk mengatasi stres ini dan mempersiapkan diri sebaik mungkin.'
  }

  return (
    <>
      <DashboardLayout
        title='Detail Konseling'
      >
        <section className="px-5 mb-5">
          <div className="card bg-white shadow p-5">
            <h2 className="font-bold text-lg mb-3">{counseling.subject}</h2>
            <div>
              {counseling.content}
            </div>
          </div>
        </section>
        <section className="px-5 mb-5">
          <div className="card bg-white shadow p-5 overflow-y-auto">
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
          </div>
        </section>
        <section className="px-5 mb-5">
          <div className="relative card bg-white shadow p-5 max-h-screen overflow-y-auto">
            <div className="w-full flex space-x-5">
              <textarea name="chat" id="chat" className="textarea textarea-bordered grow resize-none" placeholder="Tulis Pesan..."></textarea>
              <button className="btn btn-accent">
                Kirim
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  )
}

export default KonselingDetail