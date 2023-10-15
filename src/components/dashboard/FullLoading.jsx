import logo from "./../../assets/logo.svg"

const FullLoading = () => {
  return (
    <>
      <div className="w-screen h-screen grid place-items-center">
        <div className="animate-bounce">
          <img src={logo} alt="" className="w-14 h-14" />
        </div>
      </div>
    </>
  )
}

export default FullLoading