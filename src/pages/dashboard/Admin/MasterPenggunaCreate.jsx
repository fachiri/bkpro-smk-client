import { toast } from 'react-toastify'

import Card from "../../../components/card/Card"
import AdminLayout from "../../../layouts/AdminLayout"
import axios from "../../../utils/axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

const MasterPenggunaCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'GURU',
    master_number: '',
    password: '',
    major: '',
  });
  const [showJurusan, setShowJurusan] = useState(false);
  const [editPassword, setEditPassword] = useState(true);
  const [majors, setMajors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/majors`);
      setMajors(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    toast.promise(new Promise(resolve => resolve(axios.post('/master/users', formData))),
      {
        pending: 'Memuat...',
        success: {
          render({ data }) {
            e.target.reset()
            navigate(`/admin/master/pengguna/${data.data.data.uuid}`)
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

  const handleChangeRole = (e) => {
    setShowJurusan(e.target.value === 'SISWA');
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  return (
    <>
      <AdminLayout
        title='Tambah Pengguna'
      >
        <section className="px-5 mb-5">
          <Card>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-control w-full mb-3">
                <label htmlFor="name" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full" 
                />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="role" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Role</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered w-full"
                  value={formData.role}
                  onChange={handleChangeRole}
                >
                  <option value="GURU">GURU</option>
                  <option value="SISWA">SISWA</option>
                </select>
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="master_number" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Nomor Induk</span>
                </label>
                <input
                  type="text"
                  name="master_number"
                  id="master_number"
                  value={formData.master_number}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full mb-3">
                <label htmlFor="password" className="label">
                  <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Password</span>
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    disabled={editPassword}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                  <button type='button' className="btn btn-square" onClick={() => setEditPassword(!editPassword)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </div>
              </div>
              {showJurusan ?
                <div className="form-control w-full mb-3">
                  <label htmlFor="major" className="label">
                    <span className="label-text text-sm font-medium text-gray-900 dark:text-white">Jurusan</span>
                  </label>
                  <select 
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option hidden>-- Pilih Jurusan --</option>
                    {majors.map((data, idx) => (
                      <option key={idx} value={data.id}>{data.major}</option>
                    ))}
                  </select>
                </div>
                :
                null
              }
              <div className="mt-5">
                <button type="submit" className="btn btn-accent">Submit</button>
              </div>
            </form>
          </Card>
        </section>
      </AdminLayout>
    </>
  )
}

export default MasterPenggunaCreate