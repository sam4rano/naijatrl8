import inspeaker from "../../assets/Inspeaker.svg"

const InputProperties = () => {
  return (
    <div className="flex flex-row justify-between p-sm ">
      <div className="flex flex-row justify-around outline outline-offset-0  rounded-full px-lg h-[30px] outline-1">
        
        <img src={inspeaker} alt="speaker"/>
        <h1 className="pt-[3px]">Speak</h1>
      </div>
      <h1 className="text-center">0/2mins</h1>
    </div>
  );
};

export default InputProperties;
