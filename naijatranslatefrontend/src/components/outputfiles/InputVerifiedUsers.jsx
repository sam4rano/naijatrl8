import { useState } from "react";
import { BiSolidVolumeFull, BiXCircle } from "react-icons/bi";

const InputVerifiedUsers = ({ translatedAudioUrl }) => {
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
    <div>
      <div>
        {showPlayer && translatedAudioUrl && translatedAudioUrl.length > 0 && (
          <div className="flex flex-col w-[150px] justify-center align-middle items-center mx-auto">
            <button
              onClick={handleClosePlayer}
              className="self-end text-red-400 cursor-pointer"
            >
              <BiXCircle size={20} />
            </button>

            <div
              className="flex flex-row align-middle justify-center items-center border-outline h-[30px] w-[200px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer py-[10px] border-[1px]"
              onClick={toggleAudio}
            >
              <BiSolidVolumeFull size={25} />
              <span className="text-lg">Play</span>
              {openAudio && (
                <div className="flex justify-center items-center mt-[200px]">
                  <audio
                    src={translatedAudioUrl}
                    autoPlay
                    onEnded={handleAudioEnd}
                    controls
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputVerifiedUsers;
