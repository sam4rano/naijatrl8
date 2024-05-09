import { useCallback, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../api/SpeechApi";
import copy from "copy-to-clipboard";
import OutputInputLanguage from "./outputfiles/OutputInputLanguage";
import { useAudioDataStore } from "../Stores/AudStoreUnregistered";
import InputUnverifiedArea from "./inputfiles/InputUnverifiedArea";
import OutputUnverifiedArea from "./outputfiles/OutputUnverifiedArea";

const TranslateUnregistered = () => {
  const [source_language, setSourceLanguage] = useState("en");
  const [target_language, setTargetLanguage] = useState("pcm");
  const [source_text, setSourceText] = useState("");
  const [target_text, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");
  const [inputLoading, setInputLoading] = useState(false);
  const [inputAudioUrl, setInputAudioUrl] = useState("");
  const { setAudioData } = useAudioDataStore();

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
        const response = await axios.post(
          apiUrl,
          {
            text: source_text,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.data && !response.data.error) {
          const { message, data } = response.data;
          if (data && data.url) {
            const { url } = data;
            toast.success(
              "Text to speech conversion successful, Click on listen button"
            );
            setTranslatedAudioUrl(url);
            setAudioData(url);
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
    [setAudioData, source_text]
  );

  const handleTextToSpeechInput = useCallback(
    async (e) => {
      e.preventDefault();
      setInputLoading(true);
      const apiUrl = `${baseURL}/translate-serverless/text-speech/unregistered-trial`;
      try {
        const response = await axios.post(
          apiUrl,
          {
            text: source_text,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.data && !response.data.error) {
          const { message, data } = response.data;
          if (data && data.url) {
            const { url } = data;
            toast.success(
              "Text to speech conversion successful, Click on listen button"
            );
            setInputAudioUrl(url);
            // setAudioData(url);
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
        setInputLoading(false);
      }
    },
    [source_text]
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
        <InputUnverifiedArea
          source_text={source_text}
          translatedAudioUrl={translatedAudioUrl}
          setSourceText={setSourceText}
          isLoading={isLoading}
          inputLoading={inputLoading}
          handleTextToSpeechInput={handleTextToSpeechInput}
          inputAudioUrl={inputAudioUrl}
          handleTextToTextSubmit={handleTextToTextSubmit}
        />

        <OutputUnverifiedArea
          isLoading={isLoading}
          target_text={target_text}
          textRef={textRef}
          handleTextToSpeechSubmit={handleTextToSpeechSubmit}
          loadingAudio={loadingAudio}
          handleTargetTextChange={handleTargetTextChange}
          translatedAudioUrl={translatedAudioUrl}
          feedbackData={feedbackData}
          copyToClipboard={copyToClipboard}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default TranslateUnregistered;
