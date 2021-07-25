import { useEffect, useState } from 'react'

import fire from '../../firebaseConfig'

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!!user) {
        window.location.assign('/admin')
      }
    })
  }, [])

  const signIn = () => {
    const email = document.getElementById('email-login').value
    const password = document.getElementById('password-login').value

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp)
        window.location.assign('/admin')
      })
      .catch((err) => {
        console.error(`Error: ${err}`)
        setErrorMsg(err.message)
      })
  }

  const inputStyle = 'border rounded my-2 px-2 py-1 w-full'
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col p-6 w-1/4">
        <h1 className="text-center font-bold text-2xl mb-8">Admin Login</h1>
        <div className="relative">
          <input className={inputStyle} id="email-login" />
          <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
            email
          </span>
        </div>
        <div className="relative">
          <input className={inputStyle} id="password-login" type="password" />
          <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
            password
          </span>
        </div>
        <button
          className="rounded w-full bg-blue-400 py-1 mt-2 text-white hover:bg-blue-500"
          onClick={signIn}
        >
          Login
        </button>
        <span className="text-xs text-red-400">{errorMsg}</span>
      </div>
    </div>
  )
}

export default Login
