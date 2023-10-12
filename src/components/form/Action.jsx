export default function Action({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text
}) {
  return (
    <>
      {
        type === 'Button' ?
          <button
            type={action}
            className="btn btn-accent btn-block"
            onSubmit={handleSubmit}
          >
            {text}
          </button>
          :
          <></>
      }
    </>
  )
}