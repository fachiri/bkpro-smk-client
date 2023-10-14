import Card from "../../components/card/Card"
import DashboardLayout from "../../layouts/DashboardLayout"

const Dashboard = () => {
  return (
    <>
      <DashboardLayout
        title='Materi'
      >
        <section className="sm:px-5 sm:mb-5 border-b-2 border-gray-100 sm:border-none">
          <Card>
            Materi
          </Card>
        </section>
      </DashboardLayout>
    </>
  )
}

export default Dashboard