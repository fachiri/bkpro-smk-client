const Display = ({ desc }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: desc }} />
    </>
  )
}

export default Display