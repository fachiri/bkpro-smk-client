const Card = ({ children, className, title }) => {
  return (
    <>
      <div className={`card bg-white shadow p-5 ${className}`}>
        {title && <h4 className="text-lg font-bold mb-5">{title}</h4>}
        {children}
      </div>
    </>
  )
}

export default Card