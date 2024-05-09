import InputProps from "./InputProps";
import { IoClipboardOutline, IoMic } from "react-icons/io5";
import { IoIosVolumeHigh } from "react-icons/io";

const InputUnverifiedArea = ({
  source_text,
  translatedAudioUrl,
  setSourceText,
  isLoading,
  inputLoading,
  handleTextToSpeechInput,
  inputAudioUrl,
  handleTextToTextSubmit,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-[400px]">
      {/* {!source_text.length && translatedAudioUrl.length === 0 && (
        <div className="absolute pl-[180px] sm:pl-[40px] pt-[90px] flex flex-col">
          <IoClipboardOutline className="w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] pointer-events-none" />
          <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px]">
            Paste your text here
          </p>
        </div>
      )}

      {source_text.length === 0 && translatedAudioUrl.length > 0 && (
        <IoMic className="absolute pl-[190px] sm:w-[80px] sm:h-[80px] pt-[90px]" />
      )} */}
      <textarea
        className="min-h-[300px] active:border-0 p-[4px] focus-within:bg-none outline-none z-10"
        id="source_text"
        name="source_text"
        value={source_text}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Enter text to translate..."
      />

      <div className="flex flex-col gap-[10px] justify-center">
        <div className="flex flex-row justify-between gap-[30px] flex-wrap mx-auto">
          <button
            type="button"
            className={`px-[8px] border-[1px] h-[30px] w-[150px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 ${
              isLoading || source_text.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isLoading || source_text.length === 0}
            onClick={handleTextToTextSubmit}
          >
            {isLoading ? "Please wait" : "Translate"}
          </button>
          <div className="flex flex-col ">
            <div
              className="flex flex-row align-middle justify-center items-center border-[1px] h-[30px] w-[150px] mx-auto bg-blue-100 rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer"
              disabled={inputLoading && translatedAudioUrl.length === 0}
            >
              <IoIosVolumeHigh size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechInput}
                className={`    ${
                  isLoading || source_text.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {inputLoading ? "Please wait" : "listen"}
              </button>
            </div>
          </div>
        </div>
        <div className="block mx-auto">
          {inputAudioUrl.length > 0 && (
            <InputProps inputAudioUrl={inputAudioUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputUnverifiedArea;
