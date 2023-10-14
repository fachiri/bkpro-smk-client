import { useEffect, useState } from 'react'
import Select from "react-tailwindcss-select"
import AuthLayout from "../../layouts/AuthLayout"
import { loginFields, roleOptions } from "./../../constants/formFields"
import Input from "./../../components/form/Input"
import Action from './../../components/form/Action'
import axios from "./../../utils/axios"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const fields = loginFields
let fieldsState = {}
fields.forEach(field => fieldsState[field.id] = '')

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState)
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleSelectChange = value => {
    setRole(value)
  }

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...loginState,
      remember: e.target[2].checked,
      role: role.value
    }

    toast.promise(new Promise(resolve => resolve(axios.post('/auth/login', payload))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            localStorage.setItem('userData', JSON.stringify(data.data.data.user))
            localStorage.setItem('accessToken', data.data.data.token)
            navigate(data.data.data.redirect)
            return data.data.message
          }
        },
        error: {
          render({ data }) {
            return data.response?.data?.message || data.message
          }
        }
      }
    )
  }

  return (
    <>
      <AuthLayout
        title='Login'
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Masuk ke akun Anda
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Masuk Sebagai
            </label>
            <Select
              primaryColor={"emerald"}
              value={role}
              onChange={handleSelectChange}
              options={roleOptions}
              isSearchable={true}
              placeholder={"Pilih Salah Satu"}
              classNames={{
                menuButton: ({ isDisabled }) => (
                  `flex py-1 pl-1 text-gray-400 border border-gray-300 rounded-lg focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-gray-300`
                ),
                listItem: ({ isSelected }) => (`block px-2 py-3 mb-1 cursor-pointer select-none truncate rounded ${isSelected
                  ? `text-gray-500 bg-gray-100`
                  : `text-gray-500 hover:bg-gray-100 hover:text-gray-600`
                  }
              `)
              }}
            />
          </div>
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                options={field.options}
              />
            )
          }
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input type="checkbox" name='remember' className="checkbox checkbox-accent" />
                  <span className="label-text ml-2">Ingat Saya</span>
                </label>
              </div>
            </div>
            <a href="#" className="btn btn-link text-accent">Lupa password?</a>
          </div>
          <Action handleSubmit={handleSubmit} text="Login" />
        </form>
      </AuthLayout>
    </>
  )
}

export default Login