import { Link } from "react-router-dom"
import Title from "../utils/Title"


const CheckInbox = () => {
  return (
	<div className='p-[20px]'>
		<Title />
		<div className="mx-auto pt-[60px] w-[320px]">
			<h1 className="text-center py-[20px]">Please Check your email for verification link</h1>
			<Link to="/verify-account" className="text-center">
				<button type="button" className="rounded-full text-white bg-primary w-full h-[40px]">
					Go to verify page
				</button>
			</Link>
		</div>
	</div>
  )
}

export default CheckInbox