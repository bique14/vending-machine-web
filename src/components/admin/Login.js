const Login = () => {
  const inputStyle = 'border rounded my-2 px-2 py-1 w-full'
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col p-6 w-1/4">
        <h1 className="text-center font-bold text-2xl mb-8">Admin Login</h1>
        <div className="relative">
          <input className={inputStyle} />
          <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
            username
          </span>
        </div>
        <div className="relative">
          <input className={inputStyle} />
          <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
            password
          </span>
        </div>
        <button className="rounded w-full bg-blue-400 py-1 my-2 text-white hover:bg-blue-500">
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
