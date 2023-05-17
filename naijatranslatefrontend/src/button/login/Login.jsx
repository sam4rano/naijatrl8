import { Link } from "react-router-dom"

const Login = () => {
  return (
    <main className="flex flex-row"> 
      <Link to="/individual">
          <button className="bg-primary text-white rounded-full px-lg h-[30px]">Individual</button>
      </Link>
      <Link to="/organisation">
        <button className="bg-primary text-white rounded-full px-lg h-[30px]">Organisation</button>
      </Link>
    </main>
  )
}

export default Login