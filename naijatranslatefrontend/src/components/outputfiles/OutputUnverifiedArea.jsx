import Skeleton from "@mui/material/Skeleton";
import { BiSolidVolumeFull } from "react-icons/bi";
import OutputProperties from "./OutputProperties";
import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";
import UnverifiedRating from "../UnverifiedRating";

const OutputUnverifiedArea = ({
  isLoading,
  target_text,
  textRef,
  handleTextToSpeechSubmit,
  loadingAudio,
  handleTargetTextChange,
  translatedAudioUrl,
  feedbackData,
  copyToClipboard,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray ">
      {!isLoading && target_text && (
        <>
          <textarea
            className="min-h-[300px] active:border-0 p-[4px] focus-within:bg-none outline-none z-10 w-full"
            id="target_text"
            name="target_text"
            ref={textRef}
            value={target_text}
            onChange={handleTargetTextChange}
          />
          <div className="flex flex-row  justify-between items-center align-middle mx-auto gap-[40px]">
            <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer">
              <BiSolidVolumeFull size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechSubmit}
                disabled={loadingAudio}
              >
                {loadingAudio ? "Please wait" : "listen"}
              </button>
            </div>
            <div className="flex flex-row justify-center items-center gap-1.25">
              <IoClipboardOutline
                size={20}
                onClick={copyToClipboard}
                className="cursor-pointer"
              />
              <UnverifiedRating feedbackData={feedbackData} />
              <IoShareSocialOutline size={20} />
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="absolute pl-[80px] sm:pl-[50px] w-[300px] sm:w-[80px] sm:h-[80px] pt-[100px] flex flex-col">
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[80px] sm:h-[80px] "
          />
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[80px] sm:h-[80px] "
          />
          <Skeleton
            animation="wave"
            className="w-[200px] sm:w-[80px] sm:h-[80px] h-[40px]"
          />
        </div>
      )}
      {translatedAudioUrl && <OutputProperties translatedAudioUrl={translatedAudioUrl}  />}
    </div>
  );
};

export default OutputUnverifiedArea;
