import InputProps from "./InputProps";
import { IoClipboardOutline, IoMic } from "react-icons/io5";
import { IoIosVolumeHigh } from "react-icons/io";
import { useState, useEffect } from "react";

const InputUnverifiedArea = ({
  source_text,
  inputAudioUrl,
  setSourceText,
  isLoading,
  handleTextToSpeechInput,
  loadingInputAudio,
  handleTextToTextInput,
}) => {
  const [fontSize, setFontSize] = useState(16);
  useEffect(() => {
    const adjustFontSize = () => {
      if (source_text.length < 80) {
        setFontSize(16);
      } else if (source_text.length < 120) {
        setFontSize(14);
      } else if (source_text.length < 250) {
        setFontSize(12);
      } else {
        setFontSize(10);
      }
    };
    adjustFontSize();
  }, [source_text]);

  console.log("inputAudioUrl", inputAudioUrl);
  return (
    <div className="flex flex-col w-1/2 h-[400px]">
      {/* {!source_text.length && inputAudioUrl.length === 0 && (
        <div className="absolute pl-[180px] sm:pl-[40px] pt-[90px] flex flex-col">
          <IoClipboardOutline className="w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] pointer-events-none" />
          <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px]">
            Paste your text here
          </p>
        </div>
      )}

      {source_text.length === 0 && inputAudioUrl.length > 0 && (
        <IoMic className="absolute pl-[190px] sm:w-[80px] sm:h-[80px] pt-[90px]" />
      )} */}
      <textarea
        className="h-[450px] sm:h-[450px] active:border-0 p-[4px] focus-within:bg-none outline-none z-10"
        style={{ fontSize: `${fontSize}px` }}
        id="source_text"
        name="source_text"
        value={source_text}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Enter text to translate..."
      />

      <div className="flex flex-col gap-[10px] justify-center">
        <div className="flex flex-row justify-between gap-[30px] flex-wrap mx-auto sm:flex-col sm:justify-center sm:items-center sm:align-middle">
          <button
            type="button"
            className={`px-[8px] border-[1px] h-[30px] w-[150px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 ${
              isLoading || source_text.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isLoading || source_text.length === 0}
            onClick={handleTextToTextInput}
          >
            {isLoading ? "Please wait" : "Translate"}
          </button>
          <div className="flex flex-col ">
            <div
              className="flex flex-row align-middle justify-center items-center border-[1px] h-[30px] w-[150px] mx-auto bg-blue-100 rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer"
              disabled={loadingInputAudio && inputAudioUrl.length === 0}
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
                {loadingInputAudio ? "Please wait" : "listen"}
              </button>
            </div>
          </div>
        </div>
        <div className="block mx-auto sm:flex">
          {inputAudioUrl && <InputProps inputAudioUrl={inputAudioUrl} />}
        </div>
      </div>
    </div>
  );
};

export default InputUnverifiedArea;
