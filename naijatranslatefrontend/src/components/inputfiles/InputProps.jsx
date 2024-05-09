import { useState } from "react";
import { BiSolidVolumeFull, BiXCircle } from "react-icons/bi";


const InputProps = ({ inputAudioUrl }) => {
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
    <div className="flex flex-col justify-between  px-[10px] h-screen">
		
      <div className="">
        {showPlayer && inputAudioUrl.length > 0 && (
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
      <div>
        {openAudio && (
          <div className="flex justify-center items-center mt-[200px]">
            <audio
              src={inputAudioUrl}
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

export default InputProps;
