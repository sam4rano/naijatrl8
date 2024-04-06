import Skeleton from "@mui/material/Skeleton";
import { BiSolidVolumeFull } from "react-icons/bi";

const OutputAreaVerified = ({
  isLoading,
  target_text,
  textRef,
  handleTextToSpeechSubmit,
  loadingAudio,
  setTarget_text
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="h-[300px] active:border-none p-[12px] outline-none">
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
        </div>
      ) : (
        <>
          <textarea
            className="h-[130px] w-full p-4 border-none outline-none"
            id="target_text"
            name="target_text"
            ref={textRef}
            value={target_text}
            onChange={(e) => setTarget_text(e.target.value)}
          />
          {target_text && (
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
          )}
        </>
      )}
    </div>
  );
};

export default OutputAreaVerified;
