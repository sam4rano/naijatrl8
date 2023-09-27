import inspeaker from "../../assets/Inspeaker.svg"

const InputProperties = () => {
  return (
    <div className="flex flex-row justify-between px-[10px]">
      <div className="flex flex-row justify-around rounded-full px-[5px] h-[30px] border-[1px]">
        
        <img src={inspeaker} className="w-[30px] h-[30px]" alt="speaker"/>
        <h3 className="pt-[2px] ">speak</h3>
      </div>
      <h1 className="text-center">0/2mins</h1>
    </div>
  );
};

export default InputProperties;
