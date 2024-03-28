import { useState } from "react";
import { useOpenNavbar } from "../../Stores/Stores";
import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";
import { BiSolidVolumeFull, BiXCircle } from "react-icons/bi";

import UnverifiedRating from "../UnverifiedRating";
// eslint-disable-next-line react/prop-types

const OutputProperties = ({
  translatedAudioUrl,
  feedbackData,
  copyToClipboard,
}) => {
  const [openAudio, setOpenAudio] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  const toggleAudio = () => {
    setOpenAudio(!openAudio);
  };

  const handleAudioEnd = () => {
    setOpenAudio(false);
  };
  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="flex flex-col justify-between  px-[10px]">
      {showPlayer &&
        translatedAudioUrl.length > 0 && ( // Use showPlayer to control the visibility
          <div className="flex flex-col">
            <BiXCircle
              size={30}
              onClick={handleClosePlayer}
              className="cursor-pointer self-end" // Adjust position if needed
            />

            <div
              className="flex flex-col align-middle justify-center items-center rounded-full border-2 border-outline cursor-pointer"
              onClick={toggleAudio}
            >
              <BiSolidVolumeFull size={100} />
              <h1 className="pt-3 text-lg">Play</h1>
            </div>
          </div>
        )}

      <div className="flex flex-row items-center gap-1.25">
        <IoClipboardOutline
          size={20}
          onClick={copyToClipboard}
          className="cursor-pointer"
        />

        <UnverifiedRating feedbackData={feedbackData} />
        <IoShareSocialOutline size={20} />
      </div>

      {openAudio && (
        <div className="flex justify-center items-center mt-[200px]">
          <audio
            src={translatedAudioUrl}
            autoPlay
            onEnded={handleAudioEnd}
            controls
            className="h-[200px] w-52"
          />
        </div>
      )}
    </div>
  );
};

export default OutputProperties;
