const loginFields = [
  {
    labelText: "Nomor Induk",
    labelFor: "masterNumber",
    id: "masterNumber",
    name: "masterNumber",
    type: "text",
    autoComplete: "text",
    placeholder: "NIS / NIP"
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    placeholder: "Password"
  }
]

const roleOptions = [
  {
    label: 'Admin',
    value: 'ADMIN'
  },
  {
    label: 'Guru',
    value: 'GURU'
  },
  {
    label: 'Siswa',
    value: 'SISWA'
  }
]

export { loginFields, roleOptions }