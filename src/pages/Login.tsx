function Login() {
    return (
      <div className="p-4">
        <h1 className="text-2xl">Login Page</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="username">Username</label>
            <input className="w-full p-2 border border-gray-300 rounded" type="text" id="username" />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">Password</label>
            <input className="w-full p-2 border border-gray-300 rounded" type="password" id="password" />
          </div>
          <button className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
      </div>
    )
  }
  
  export default Login