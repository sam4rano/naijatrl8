import outspeaker from "../../assets/Outspeaker.svg";
import Close from "../../assets/close.svg";
import { useState, useRef } from "react";
import { useOpenNavbar } from "../../Stores/Stores";
import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";

import UnverifiedRating from "../UnverifiedRating";

const OutputProperties = ({
  translatedAudioUrl,
  outputType,
  feedbackData,
  copyToClipboard,
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

      <div className="flex flex-row align-middle items-center gap-[5px]">
        <IoClipboardOutline size={20} onClick={copyToClipboard} className="cursor-pointer" />

        <UnverifiedRating feedbackData={feedbackData} />
        <IoShareSocialOutline size={20} />
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

export default OutputProperties;
