import "../desktop.css";
import { Link } from "react-router-dom";
const Desktop = () => {
  return (
    <div className="flex flex-col items-center align-middle bg-blue-400 text-white sidebar_img">
      <Link to="/">
        <h2 className="font-bold leading-[60px] text-[30px]">AfriTranslate</h2>
      </Link>
    </div>
  );
};

export default Desktop;
