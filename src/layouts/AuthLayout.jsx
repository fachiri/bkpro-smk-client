import logo from './../assets/logo.svg'

const AuthLayout = ({ children, title }) => {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-gray-900 dark:text-white">
            <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
              <div className='flex flex-col'>
                <span className='text-2xl font-semibold'>BK-MANTAP</span>
                <span className='text-xs font-semibold'>Bimbingan Karir Mandiri Terintegrasi</span>
              </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthLayout