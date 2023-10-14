import { Link } from "react-router-dom"

const GuestLayout = ({ children, title }) => {
  return (
    <>
      <nav className="bg-white border-b-2">
        <div className="navbar bg-base-100 max-w-3xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/materi-pembelajaran">Materi</Link></li>
                <li><Link to="/tentang">Tentang</Link></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link to="/" className="btn btn-ghost normal-case text-xl">BKPro SMK</Link>
          </div>
          <div className="navbar-end">
            <Link to="/login">
              <button className="btn btn-sm btn-ghost">Login</button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="px-5 md:px-0 max-w-3xl mx-auto">
        {children}
      </main>
      <footer className="footer footer-center py-5 text-base-content border-t-2">
        <aside>
          <p>Copyright © 2023 - All right reserved by <a href="https://jejakode.com" className="font-bold">JEJAKODE</a></p>
        </aside>
      </footer>
    </>
  )
}

export default GuestLayout