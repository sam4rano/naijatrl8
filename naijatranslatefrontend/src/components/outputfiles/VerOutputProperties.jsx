import outspeaker from "../../assets/Outspeaker.svg";
import Close from "../../assets/close.svg";
import share from "../../assets/Share.svg";
import copy from "../../assets/Copy.svg";
import { useState } from "react";
import { useOpenNavbar } from "../../Stores/Stores";
import VerifiedRating from "../VerifiedRating";

const VerOutputProperties = ({
  translatedAudioUrl,
  outputType,
  feedbackId,
}) => {
  const { openNav, setOpenNav } = useOpenNavbar();

  const [openAudio, setOpenAudio] = useState(false);

  const toggleAudio = () => {
    setOpenAudio(!openAudio);
  };

  return (
    <div className="flex flex-row justify-between px-[10px]">
      {outputType === "speech" && (
        <div
          className="flex flex-row justify-around rounded-full px-sm h-[30px] border-[1px] border-outline cursor-pointer"
          onClick={toggleAudio}
        >
          <img
            src={outspeaker}
            className="w-[30px] h-[30px]"
            alt="outspeaker"
          />
          <h1 className="pt-[3px]">Listen</h1>
        </div>
      )}

      <div className="flex flex-row justify-around align-middle items-center">
        <img src={copy} className="w-[30px] h-[30px]" alt="copy" />
        <VerifiedRating feedbackId={feedbackId} />
        <img src={share} alt="share" className="w-[30px] h-[30px]" />
      </div>
      {openAudio && (
        <div className="flex justify-center flex-col align-middle mx-auto">
          <div
            onClick={toggleAudio}
            className="flex flex-row  justify-end cursor-pointer"
          >
            <img src={Close} alt="close image" />
          </div>
          <audio
            src={translatedAudioUrl}
            autoPlay
            controls
            className="h-[40px] w-[200px]"
          />
        </div>
      )}
    </div>
  );
};

export default VerOutputProperties;
