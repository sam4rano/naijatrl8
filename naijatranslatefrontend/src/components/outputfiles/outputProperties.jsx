import { useState } from "react";
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
      <div className="">
        {showPlayer &&
          translatedAudioUrl.length > 0 && ( 
            <div className="flex flex-col w-[150px] justify-center align-middle items-center mx-auto">
              <BiXCircle
                size={20}
                onClick={handleClosePlayer}
                className="cursor-pointer self-end text-red-400" 
              />

              <div
                className="flex flex-row align-middle justify-center items-center border-outline h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer py-[10px] border-[1px]"
                onClick={toggleAudio}
              >
                <BiSolidVolumeFull size={25} />
                <h1 className=" text-lg">Play</h1>
              </div>
            </div>
          )}
      </div>

      <div className="flex flex-row items-center gap-1.25">
        <IoClipboardOutline
          size={20}
          onClick={copyToClipboard}
          className="cursor-pointer"
        />

        <UnverifiedRating feedbackData={feedbackData} />
        <IoShareSocialOutline size={20} />
      </div>
      <div>
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
    </div>
  );
};

export default OutputProperties;
