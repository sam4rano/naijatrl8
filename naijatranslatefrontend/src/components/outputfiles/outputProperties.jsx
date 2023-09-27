import outspeaker from "../../assets/Outspeaker.svg";
import thumbup from "../../assets/Thumbup.svg";
import thumbdown from "../../assets/Thumbdown.svg";
import share from "../../assets/Share.svg";
import copy from "../../assets/Copy.svg";

const OutputProperties = () => {
  return (
    <div className="flex flex-row justify-between px-[10px]">
      <div className="flex flex-row justify-around rounded-full px-sm h-[30px] border-[1px]">
        <img src={outspeaker} className="w-[30px] h-[30px]" alt="outspeaker" />

        <h1 className="pt-[3px]">Listen</h1>
      </div>
      <div className="flex flex-row justify-around">
        <img src={copy} className="w-[30px] h-[30px]" alt="copy" />
        <img src={thumbup} alt="thumbup" className="w-[30px] h-[30px]" />
        <img src={thumbdown} alt="thumbdown" className="w-[30px] h-[30px]" />
        <img src={share} alt="share" className="w-[30px] h-[30px]" />
      </div>
    </div>
  );
};

export default OutputProperties;
