import Skeleton from "@mui/material/Skeleton";
import { BiSolidVolumeFull } from "react-icons/bi";
import OutputProperties from "./OutputProperties";
import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";
import UnverifiedRating from "../UnverifiedRating";

const OutputUnverifiedArea = ({
  isLoading,
  target_text,
  textRef,
  handleTextToSpeechOutput,
  loadingOutputAudio,
  handleTargetTextChange,
  outputAudioUrl,
  feedbackData,
  copyToClipboard,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray ">
      {!isLoading && target_text && (
        <>
          <textarea
            className="min-h-[300px] active:border-0 p-[4px] outline-none z-10"
            id="target_text"
            name="target_text"
            ref={textRef}
            value={target_text}
            onChange={handleTargetTextChange}
            placeholder="Translation will appear here..."
          />
          <div className="flex flex-row  justify-between items-center align-middle mx-auto gap-[40px] sm:flex-col sm:justify-center sm:gap-[10px]">
            <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[150px] sm:w-[100px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer sm:text-[12px] sm:h-[25px]">
              <BiSolidVolumeFull size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechOutput}
                disabled={loadingOutputAudio}
              >
                {loadingOutputAudio ? "Please wait" : "listen"}
              </button>
            </div>
            <div className="flex flex-row justify-center items-center gap-[10px]">
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
      {outputAudioUrl && <OutputProperties outputAudioUrl={outputAudioUrl} />}
    </div>
  );
};

export default OutputUnverifiedArea;
