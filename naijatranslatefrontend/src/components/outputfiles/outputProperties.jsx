import { useState } from "react";
import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";
import { BiSolidVolumeFull, BiXCircle } from "react-icons/bi";

const OutputProperties = ({
  translatedAudioUrl,

  handleTextToSpeechSubmit,
  loadingAudio,
}) => {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const toggleAudio = () => setIsAudioOpen(!isAudioOpen);
  const handleAudioEnd = () => setIsAudioOpen(false);
  const handleClosePlayer = () => setIsPlayerVisible(false);

  const isPlayDisabled = loadingAudio || translatedAudioUrl.length === 0;
  const audioButtonClass = `flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 ${
    isPlayDisabled ? "cursor-not-allowed" : "cursor-pointer"
  }`;

  return (
    <div className="flex flex-col justify-between px-[10px] absolute top-[490px]">
      <button
        type="button"
        onClick={handleTextToSpeechSubmit}
        disabled={isPlayDisabled}
        className={audioButtonClass}
      >
        Play
      </button>

      {isPlayerVisible && translatedAudioUrl && (
        <div className="flex flex-col justify-center align-middle items-center mx-auto">
          <BiXCircle
            size={20}
            onClick={handleClosePlayer}
            className="cursor-pointer self-end text-red-400"
          />

          <button
            className="flex flex-row align-middle justify-center items-center border-outline h-[30px] w-[120px] bg-blue-100 rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer py-[10px] border-[1px]"
            onClick={toggleAudio}
          >
            <BiSolidVolumeFull size={25} />
            <span className="text-lg">Play</span>{" "}
            {/* Changed from h1 to span for semantic correctness */}
          </button>
        </div>
      )}
      {isAudioOpen && (
        <audio
          src={translatedAudioUrl}
          autoPlay
          onEnded={handleAudioEnd}
          controls
          className="h-[200px] w-52"
        />
      )}
    </div>
  );
};

export default OutputProperties;
