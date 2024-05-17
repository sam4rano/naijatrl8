import { Link } from "react-router-dom";
import "../mobile.css";
const Mobile = () => {
  return (
    <div className="flex flex-col items-center align-middle  text-white bg-blue-400 mobile_container text-center">
      <Link to="/">
        <h2 className="font-bold leading-[60px] text-[30px]">AfriTranslate</h2>
      </Link>
    </div>
  );
};

export default Mobile;
