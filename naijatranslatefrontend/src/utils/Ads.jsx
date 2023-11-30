
import cancel from "../assets/cancel.svg";

const Ads = ({toggleDivVisibility}) => {
  
  return (
    <div className="w-full h-[35px] flex flex-row justify-between  bg-light" onClick={toggleDivVisibility}>
      <h1 className="p-sm">
        Translate like a pro with our higher percentage translation solution
      </h1>
      <div className="w-[30px] h-[30px]" >
        <img src={cancel} alt="cancel" className="w-[40px] h-[30px] py-[10px] cursor-pointer" /> 
      </div>
    </div>
  );
};

export default Ads;
