import { IoIosVolumeHigh } from "react-icons/io";
import InputVerifiedProps from "./InputVerifiedProps";
import { useState, useEffect } from "react";

const InputAreaVerified = ({
  isLoading,
  inputAudioUrl,
  inputLoadingAudio,
  setSource_text,
  handleTextToTextTranslation,
  handleTexttoSpeechInput,
  source_text,
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

  return (
    <div className="flex flex-col w-1/2 h-[450px] sm:h-[450px] outline-none">
      <textarea
        className="min-h-[300px] active:border-0 p-[4px] focus-within:bg-none outline-none "
        style={{ fontSize: `${fontSize}px` }}
        placeholder="Enter text to translate..."
        id="source_text"
        name="source_text"
        value={source_text}
        onChange={(e) => setSource_text(e.target.value)}
      />

      <div className="flex flex-row sm:flex-col justify-center gap-[10px]">
        <button
          type="button"
          className="px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200"
          disabled={isLoading}
          onClick={handleTextToTextTranslation}
        >
          {isLoading ? "Please wait" : "Translate"}
        </button>
        <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer">
          <IoIosVolumeHigh size={20} />
          <button
            type="button"
            onClick={handleTexttoSpeechInput}
            disabled={inputLoadingAudio}
            aria-disabled={isLoading}
          >
            {inputLoadingAudio ? "Please wait" : "listen"}
          </button>
        </div>
      </div>

      {inputAudioUrl && <InputVerifiedProps inputAudioUrl={inputAudioUrl} />}
    </div>
  );
};

export default InputAreaVerified;





