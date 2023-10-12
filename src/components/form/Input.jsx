export default function Input({ handleChange, value, labelText, labelFor, id, name, type, placeholder, customInputClass, customLabelClass, options }) {
  return (
    <div className="mb-5">
      <label htmlFor={labelFor} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white " + customLabelClass}>
        {labelText}
      </label>
      {
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          className={"input input-bordered w-full " + customInputClass}
          placeholder={placeholder}
        />
      }
    </div>
  )
}