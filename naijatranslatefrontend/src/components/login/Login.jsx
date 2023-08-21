import React from 'react'

const Login = () => {
  return (
    <div>
        <form
      className="rounded-md flex flex-col content-center max-w-[448px] mx-auto mt-[100px] p-md"
      onSubmit={handleSubmit}
    >
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </form>
    </div>
  )
}

export default Login