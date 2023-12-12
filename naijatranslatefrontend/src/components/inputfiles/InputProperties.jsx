import inspeaker from "../../assets/Inspeaker.svg";

const InputProperties = ({ outputType }) => {
  return (
    <div className="flex flex-row justify-between px-[10px]">
      {outputType === "speech" && (
        <>
          <div className="flex flex-row justify-around rounded-full px-[5px] h-[30px] border-[1px] border-outline">
            <img src={inspeaker} className="w-[30px] h-[30px]" alt="speaker" />
            <h3 className="pt-[2px] ">speak</h3>
          </div>
          <h3 className="text-center pt-[6px]">0/2mins</h3>
        </>
      )}
    </div>
  );
};

export default InputProperties;
