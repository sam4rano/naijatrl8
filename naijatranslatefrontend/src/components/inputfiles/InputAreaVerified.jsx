import InputVerifiedUsers from "../outputfiles/InputVerifiedUsers";
import { IoIosVolumeHigh } from "react-icons/io";

const InputAreaVerified = ({
  isLoading,
  translatedAudioUrl,
  loadingAudio,
  setSource_text,
  handleTextToTextTranslation,
  handleTextToSpeechTranslation,
  source_text,
}) => {
  return (
    <div className="flex flex-col w-1/2 h-[400px] outline-none">
      <textarea
        className="h-[300px] active:border-0 p-[4px] focus-within:bg-none outline-none"
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
            onClick={handleTextToSpeechTranslation}
            disabled={loadingAudio}
            aria-disabled={isLoading}
          >
            {loadingAudio ? "Please wait" : "listen"}
          </button>
        </div>
      </div>
      {(isLoading || translatedAudioUrl || loadingAudio) && (
        <InputVerifiedUsers
          translatedAudioUrl={translatedAudioUrl}
          loadingAudio={loadingAudio}
        />
      )}
    </div>
  );
};

export default InputAreaVerified;
