import {Inspeaker} from "../../icons/index";

const InputProperties = () => {
  return (
    <div className="flex flex-row justify-between p-sm">
      <div className="flex flex-row justify-around outline outline-offset-0  rounded-full px-lg h-[30px] outline-1">
        <Inspeaker width={"35px"} height={"35px"}/>

        <h1 className="pt-[5px]">Speak</h1>
      </div>
      <h1>0/2mins</h1>
    </div>
  );
};

export default InputProperties;
