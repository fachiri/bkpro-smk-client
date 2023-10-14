import { NavLink, useNavigate } from 'react-router-dom'
import logo from './../../assets/logo.svg'
import links from './../../constants/sidebarLinks'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import axios from "./../../utils/axios"

const Loader = () => {
  return (
    <>
      <p className='p-3'></p>
    </>
  );
}

const Sidebar = () => {
  const [getLinks, setLinks] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const user = await axios.get(`/user/${userData.uuid}`)
      setLinks(links[user.data.data.role])
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  };

  return (
    <>
      <div className="hidden sm:flex flex-col items-center w-40 h-screen overflow-hidden text-gray-700 bg-accent sm:rounded sticky left-0 top-0 z-40">
        <a className="flex items-center w-full px-3 mt-3" href="#">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="ml-2 text-sm font-bold">BKPro SMK</span>
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col w-full mt-3 border-t-2 border-accent-focus">
            {getLinks ?
              getLinks.map((item, idx) => (
                <div key={idx}>
                  {item.hasSubmenu ? (
                    <>
                      <h5 className='text-xs font-bold mt-3 px-3'>{item.name}</h5>
                      <div className="flex flex-col">
                        {item.submenu.map((subItem, subIdx) => (
                          <NavLink
                            to={subItem.link}
                            key={subIdx}
                            className={({ isActive }) => {
                              return isActive
                                ? "relative flex items-center w-full py-2 px-3 mt-2 bg-accent-focus rounded"
                                : "relative flex items-center w-full py-2 px-3 mt-2 rounded hover:bg-accent-focus";
                            }}
                          >
                            {subItem.icon}
                            <span className="ml-2 text-sm font-medium">{subItem.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.link}
                      key={idx}
                      className={({ isActive }) => {
                        return isActive
                          ? "relative flex items-center w-full h-12 px-3 mt-2 bg-accent-focus rounded"
                          : "relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-accent-focus";
                      }}
                    >
                      {item.icon}
                      <span className="ml-2 text-sm font-medium">{item.name}</span>
                      {!item.hasNotif || (
                        <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-accent-content rounded-full"></span>
                      )}
                    </NavLink>
                  )}
                </div>
              )) :
              <Loader />
            }

          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center w-full h-16 mt-auto bg-accent hover:bg-accent-focus border-t-2 border-accent-focus">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="ml-2 text-sm font-medium">Keluar</span>
        </button>
      </div>

      <div className="flex sm:hidden flex-col items-center w-16 h-screen overflow-hidden text-gray-700 bg-accent sm:rounded sticky left-0 top-0 z-40">
        <a className="flex items-center justify-center mt-3" href="#">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </a>
        <div className="flex flex-col items-center mt-3 border-t-2 border-accent-focus">
          {getLinks ?
            getLinks.map((item, idx) => (
              <div key={idx} className='flex flex-col items-center'>
                {item.hasSubmenu ? (
                  <>
                    <div className="flex flex-col">
                      {item.submenu.map((subItem, subIdx) => (
                        <NavLink
                          to={subItem.link}
                          key={subIdx}
                          className={({ isActive }) => {
                            return isActive ? "relative flex items-center justify-center w-12 h-12 mt-2 bg-accent-focus rounded text-gray-950" : "relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-accent-focus"
                          }}
                        >
                          {subItem.icon}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => {
                      return isActive ? "relative flex items-center justify-center w-12 h-12 mt-2 bg-accent-focus rounded text-gray-950" : "relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-accent-focus"
                    }}
                  >
                    {item.icon}
                    {!item.hasNotif || <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-accent-content rounded-full"></span>}
                  </NavLink>
                )}
              </div>
            )) :
            <Loader />
          }
        </div>
        <a className="flex items-center justify-center w-16 h-16 mt-auto bg-accent hover:bg-accent-focus border-t-2 border-accent-focus" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </a>
      </div>
    </>
  )
}

export default Sidebar