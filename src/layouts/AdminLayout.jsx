import Header from "../components/dashboard/Header"
import SidebarComponent from "../components/dashboard/Sidebar"

const AdminLayout = ({ children, title }) => {
  return (
    <>
      <SidebarComponent role="ADMIN" />
      <main className="absolute top-0 pl-16 sm:pl-40 w-full h-screen overflow-y-scroll z-0 bg-gray-100">
        <Header title={title} />
        {children}
      </main>
    </>
  )
}

export default AdminLayout