import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import NavVerified from "../navbar/NavVerified";
import { baseURL } from "../api/SpeechApi";
import { IoTimeOutline } from "react-icons/io5";
import copy from "copy-to-clipboard";
import OutputInputVerLanguage from "./outputfiles/OutputInputVerLanguage";
import OutputAreaVerified from "./outputfiles/OutPutAreaVerified";
import { useHandleAccessToken } from "../utils/useAuth";
import InputAreaVerified from "./inputfiles/InputAreaVerified";

const TranslateRegisteredUsers = () => {
  const [source_language, setSourceLanguage] = useState("en");
  const [target_language, setTargetLanguage] = useState("pcm");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [outputTranslateUrl, setOutputTranslateUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingAudInput, setLoadingAudInput] = useState(false);

  const handleAccessToken = useHandleAccessToken();
  const handleTextToTextTranslation = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const formDataText = {
        source_language: source_language,
        target_language: target_language,
        source_text: source_text,
        target_text: target_text,
      };
      setTarget_text("");

      const accessToken = await handleAccessToken();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      const apiUrl = `${baseURL}/translate-serverless/text-text`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            ...commonHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataText),
        });
        if (response.ok) {
          const responseData = await response.json();
          setFeedbackData(responseData.data.feedback_id);
          if (responseData && responseData.data) {
            const { target_text } = responseData.data;
            setTarget_text(target_text);
          } else {
            toast.error("Error occurred while translating text.");
          }
        } else if (response.status === 400) {
          const responseData = await response.json();
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("Translation error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [
      handleAccessToken,
      source_language,
      source_text,
      target_language,
      target_text,
    ]
  );

  const handleTextToSpeechTranslation = useCallback(
    async (e) => {
      e.stopPropagation();
      const formDataSpeech = {
        text: source_text,
      };
      e.preventDefault();
      setLoadingAudio(true);
      const accessToken = await handleAccessToken();
      if (!accessToken) {
        setLoadingAudio(false);
        return;
      }

      const commonHeaders = {
        "Content-type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      const apiUrl = `${baseURL}/translate-serverless/text-speech`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: commonHeaders,
          body: JSON.stringify(formDataSpeech),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData && !responseData.error) {
            const { message, data } = responseData;
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
            const errorMessage = `Error: ${response.status} - ${response.statusText}`;
            console.error(errorMessage);
            toast.error(errorMessage);
          }
        }
      } catch (error) {
        console.error("Speech conversion error:", error);
        toast.error("Speech conversion error: " + error.message);
      } finally {
        setLoadingAudio(false);
      }
    },
    [handleAccessToken, source_text]
  );

  const handleTextToSpeechOutput = useCallback(
    async (e) => {
      e.stopPropagation();
      const formDataSpeech = {
        text: target_text,
      };
      console.log("Sending for speech synthesis:", formDataSpeech.text),
        e.preventDefault();
      setLoadingAudInput(true);
      const accessToken = await handleAccessToken();
      if (!accessToken) {
        setLoadingAudInput(false);
        return;
      }

      const commonHeaders = {
        "Content-type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      const apiUrl = `${baseURL}/translate-serverless/text-speech`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: commonHeaders,
          body: JSON.stringify(formDataSpeech),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData && !responseData.error) {
            const { message, data } = responseData;
            if (data && data.url) {
              const { url } = data;
              toast.success(
                "Text to speech conversion successful, Click on listen button"
              );
              setOutputTranslateUrl(url);
            } else {
              toast.error(
                "Error occurred while translating text to speech: " + message
              );
            }
          } else {
            const errorMessage = `Error: ${response.status} - ${response.statusText}`;
            console.error(errorMessage);
            toast.error(errorMessage);
          }
        }
      } catch (error) {
        console.error("Speech conversion error:", error);
        toast.error("Speech conversion error: " + error.message);
      } finally {
        setLoadingAudInput(false);
      }
    },

    [handleAccessToken, target_text]
  );

  const textRef = useRef();

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  console.log("source", source_text);
  console.log("target", target_text);

  return (
    <div className="bg-graylight">
      <NavVerified />
      <div className="max-w-[360px] w-full mx-auto flex flex-row justify-between align-middle items-center gap-[10px]">
        <div className="max-w-[360px] w-full flex flex-row justify-end align-middle items-center">
          <Link
            to="/internalhistory"
            className="flex p-[5px] hover:bg-light flex-row align-middle items-center gap-[10px] hover:rounded-[8px]"
          >
            <IoTimeOutline size={25} />

            <p className="text-[16px] leading-[25px] font-medium">History</p>
          </Link>
        </div>
      </div>
      <form className="flex flex-col max-w-[1000px] sm:w-[360px] mx-auto px-[20px] pt-[10px] pb-[20px]">
        <OutputInputVerLanguage
          source_language={source_language}
          setSourceLanguage={setSourceLanguage}
          target_language={target_language}
          setTargetLanguage={setTargetLanguage}
        />
        <div className="flex flex-row justify-between w-full h-[410px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]outline-none ">
          <InputAreaVerified
            isLoading={isLoading}
            translatedAudioUrl={translatedAudioUrl}
            loadingAudio={loadingAudio}
            setSource_text={setSource_text}
            handleTextToTextTranslation={handleTextToTextTranslation}
            handleTextToSpeechTranslation={handleTextToSpeechTranslation}
            source_text={source_text}
          />

          <OutputAreaVerified
            target_text={target_text}
            textRef={textRef}
            isLoading={isLoading}
            loadingAudInput={loadingAudInput}
            handleTextToSpeechOutput={handleTextToSpeechOutput}
            handleTextToTextTranslation={handleTextToTextTranslation}
            outputTranslateUrl={outputTranslateUrl}
            feedbackId={feedbackData}
            copyToClipboard={copyToClipboard}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TranslateRegisteredUsers;
