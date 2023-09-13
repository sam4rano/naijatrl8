import outspeaker from "../../assets/Outspeaker.svg";
import thumbup from "../../assets/Thumbup.svg";
import thumbdown from "../../assets/Thumbdown.svg";
import share from "../../assets/Share.svg";
import copy from "../../assets/Copy.svg";

const OutputProperties = () => {
  return (
    <div className="flex flex-row justify-around w-[300px]">
      <div className="flex flex-row mt-[10px] justify-around outline outline-offset-0  rounded-full px-md ml-[5px] h-[30px] outline-1 ">
        <img src={outspeaker} alt="outspeaker" />

        <h1 className="pt-[3px]">Listen</h1>
      </div>
      <div className="flex flex-row justify-around w-[80px] ">
      <img src={copy} alt="copy" />
      <img src={thumbup} alt="thumbup" />
      <img src={thumbdown} alt="thumbdown" />
      <img src={share} alt="share" />
      </div>
    </div>
  );
};

export default OutputProperties;
