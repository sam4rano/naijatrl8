import { BiSolidVolumeFull } from "react-icons/bi";
import OutputVerUser from "./OutputVerUser";
import Skeleton from "@mui/material/Skeleton";

const OutputAreaVerified = ({
  isLoading,
  target_text,
  textRef,
  handleTextToSpeechOutput,
  outputTranslateUrl,
  feedbackId,
  copyToClipboard,
  outputLoadingAudio,
  setTarget_text,
}) => {
  return (
    <div className="flex flex-col sm:align-middle sm:items-center sm:gap-[10px] w-1/2 h-[450px] sm:h-[450px] outline-none border-l-2 border-gray">
      {!isLoading && target_text && (
        <div className="sm:flex sm:flex-col sm:justify-center sm:align-middle">
          <textarea
            className="min-h-[300px] w-full p-[4px] border-none focus-within:bg-none outline-none"
            id="target_text"
            name="target_text"
            ref={textRef}
            value={target_text}
            onChange={(e) => setTarget_text(e.target.value)}
          />
          <div className="flex flex-row sm:flex-col justify-center gap-[10px]">
            <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer">
              <BiSolidVolumeFull size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechOutput}
                disabled={outputLoadingAudio}
                // aria-disabled={isLoading}
              >
                {outputLoadingAudio ? "Please wait" : "listen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute pl-[80px] sm:pl-[10px] w-[300px] sm:w-[100px] sm:h-[300px] pt-[40px] flex flex-col sm:gap-[30px]">
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[100px] sm:h-[40px] "
          />
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[100px] sm:h-[40px] "
          />
          <Skeleton
            animation="wave"
            className="w-[200px] sm:w-[80px] sm:h-[50px] h-[40px]"
          />
        </div>
      )}
      {(target_text.length > 0 || outputTranslateUrl || outputLoadingAudio) && (
        <OutputVerUser
          loadingAudInput={outputLoadingAudio}
          outputTranslateUrl={outputTranslateUrl}
          feedbackId={feedbackId}
          copyToClipboard={copyToClipboard}
        />
      )}
    </div>
  );
};

export default OutputAreaVerified;
