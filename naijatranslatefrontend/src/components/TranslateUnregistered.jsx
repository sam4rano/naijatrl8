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
  const [loadingInputAudio, setLoadingInputAudio] = useState(false);
  const [inputAudioUrl, setInputAudioUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");
  const [loadingOutputAudio, setOutputAudioLoading] = useState(false);
  const [outputAudioUrl, setOutputAudioUrl] = useState("");
  const { setAudioData } = useAudioDataStore();

  const handleTextToTextInput = useCallback(
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

  const handleTextToSpeechInput = useCallback(
    async (e) => {
      e.preventDefault();

      setLoadingInputAudio(true);
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
        setLoadingInputAudio(false);
      }
    },
    [setAudioData, source_text]
  );

  const handleTextToSpeechOutput = useCallback(
    async (e) => {
      e.preventDefault();
      setOutputAudioLoading(true);
      const apiUrl = `${baseURL}/translate-serverless/text-speech/unregistered-trial`;
      try {
        const response = await axios.post(
          apiUrl,
          {
            text: target_text,
          },
          {
            headers: {
              "Content-type": "application/json",
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
            setOutputAudioUrl(url);
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
        setOutputAudioLoading(false);
      }
    },
    [setAudioData, target_text]
  );

  const textRef = useRef();

  const copyToClipboard = () => {
    let copyText = textRef.current.value;

    let isCopy = copy(copyText);

    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  const handleTargetTextChange = (e) => {
    setTargetText(e.target.value);
  };

  return (
    <form className="flex flex-col max-w-[1000px] sm:w-[360px] mx-auto px-[20px] pt-[10px] sm:items-center sm:align-middle min-h-screen">
      <OutputInputLanguage
        source_language={source_language}
        setSourceLanguage={setSourceLanguage}
        target_language={target_language}
        setTargetLanguage={setTargetLanguage}
      />
      <div className="flex flex-row justify-between w-full h-[420px] sm:h-[450px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px] outline-none ">
        <InputUnverifiedArea
          source_text={source_text}
          inputAudioUrl={inputAudioUrl}
          setSourceText={setSourceText}
          isLoading={isLoading}
          loadingInputAudio={loadingInputAudio}
          handleTextToSpeechInput={handleTextToSpeechInput}
          handleTextToTextInput={handleTextToTextInput}
        />

        <OutputUnverifiedArea
          isLoading={isLoading}
          target_text={target_text}
          textRef={textRef}
          handleTextToSpeechOutput={handleTextToSpeechOutput}
          loadingOutputAudio={loadingOutputAudio}
          handleTargetTextChange={handleTargetTextChange}
          outputAudioUrl={outputAudioUrl}
          feedbackData={feedbackData}
          copyToClipboard={copyToClipboard}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default TranslateUnregistered;
