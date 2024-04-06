import { useCallback, useState, useRef } from "react";
import axios from "axios";
import OutputProperties from "./outputfiles/OutputProperties";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../api/SpeechApi";
import copy from "copy-to-clipboard";
import OutputInputLanguage from "./outputfiles/OutputInputLanguage";
import { IoClipboardOutline, IoMic } from "react-icons/io5";
import OutputArea from "./outputfiles/OutputArea";
import { IoIosVolumeHigh } from "react-icons/io";

const TranslateUnregistered = () => {
  const [source_language, setSourceLanguage] = useState("en");
  const [target_language, setTargetLanguage] = useState("pcm");
  const [source_text, setSourceText] = useState("");
  const [target_text, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");

  const handleTextToTextSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = {
        source_language: source_language,
        target_language: target_language,
        source_text: source_text,
      };
      const apiUrl = `${baseURL}/translate-serverless/text-text/unregistered-trial`;

      try {
        const response = await axios.post(apiUrl, formData);

        if (response.data && response.data.data) {
          const { target_text } = response.data.data;
          setTargetText(target_text);
          setFeedbackData(response.data.data.feedback_id);
        } else if (response.data && response.data.message) {
          const responseError = response.data.message;
          toast.error(responseError);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const responseError = error.response.data.message;
          toast.error(responseError);
        } else {
          toast.error(error.message + "... please check your network");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [source_language, source_text, target_language]
  );

  // API endpoint for text-to-speech translation
  const handleTextToSpeechSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoadingAudio(true);
      const apiUrl = `${baseURL}/translate-serverless/text-speech/unregistered-trial`;
      try {
        const response = await axios.post(apiUrl, {
          text: source_text,
        });
        if (response.data && !response.data.error) {
          const { message, data } = response.data;
          if (data && data.url) {
            const { url } = data;
            toast.success(
              "Text to speech conversion successful, Click on listen button"
            );
            setTranslatedAudioUrl(url);
          } else {
            toast.error(
              "Error occurred while translating text to speech: " + message
            );
          }
        } else {
          const responseError = await response.json();
          toast.error("error:", responseError.data.message);
        }
      } catch (error) {
        toast.error("An error occurred: " + error.message);
      } finally {
        setLoadingAudio(false);
      }
    },
    [setLoadingAudio, source_text]
  );

  const textRef = useRef();
  //Function to add text to clipboard
  const copyToClipboard = () => {
    let copyText = textRef.current.value;

    let isCopy = copy(copyText);

    //Dispalying notification
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  const handleTargetTextChange = (e) => {
    setTargetText(e.target.value);
  };

  return (
    <form className="flex flex-col overflow-hidden max-w-[1000px] md:w-[400px] sm:w-[360px] sm:p-[10px] mx-auto px-[10px] py-[30px]">
      <OutputInputLanguage
        source_language={source_language}
        setSourceLanguage={setSourceLanguage}
        target_language={target_language}
        setTargetLanguage={setTargetLanguage}
      />
      <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]">
        <div className="flex flex-col w-1/2 h-[400px">
          {source_text.length === 0 && translatedAudioUrl.length === 0 && (
            <div className="absolute pl-[180px] sm:pl-[40px] pt-[90px] flex flex-col">
              <IoClipboardOutline className="w-[100px] h-[100px] sm:w-[80px] sm:h-[80px]" />
              <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px]">
                Paste your text here
              </p>
            </div>
          )}

          {!source_text.length === 0 && translatedAudioUrl.length > 0 && (
            <IoMic className="absolute pl-[190px] sm:w-[80px] sm:h-[80px] pt-[90px]" />
          )}
          <textarea
            className="h-[400px] active:border-0 p-[4px] focus-within:bg-none outline-none"
            id="source_text"
            name="source_text"
            value={source_text}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
          />

          <div className="flex flex-row flex-wrap gap-[10px]">
            <button
              type="button"
              className="px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200"
              disabled={isLoading}
              onClick={handleTextToTextSubmit}
            >
              {isLoading ? "Please wait" : "Translate"}
            </button>
            <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer">
              <IoIosVolumeHigh size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechSubmit}
                disabled={loadingAudio}
              >
                {loadingAudio ? "Please wait" : "listen"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray ">
          <OutputArea
            isLoading={isLoading}
            target_text={target_text}
            textRef={textRef}
            handleTargetTextChange={handleTargetTextChange}
          />
          {(isLoading || translatedAudioUrl || feedbackData) && (
            <OutputProperties
              translatedAudioUrl={translatedAudioUrl}
              handleTextToSpeechSubmit={handleTextToSpeechSubmit}
              loadingAudio={loadingAudio}
              copyToClipboard={copyToClipboard}
              feedbackData={feedbackData}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default TranslateUnregistered;
