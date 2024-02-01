import { Outlet } from "react-router-dom"
import Title from "../utils/Title"


const UserContainer = () => {
  return (
	<div className="p-[20px]">
		<Title />
		<Outlet />
	</div>
  )
}

export default UserContainer