import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useState, useRef, useCallback } from "react";
import Inspeaker from "../assets/speakerout.svg";
import { Link } from "react-router-dom";
import NavVerified from "../navbar/NavVerified";
import { baseURL } from "../api/SpeechApi";
import { IoTimeOutline } from "react-icons/io5";
import copy from "copy-to-clipboard";
import OutputInputVerLanguage from "./outputfiles/OutputInputVerLanguage";
import VerOutputProperties from "./outputfiles/VerOutputProperties";
import { IoIosVolumeHigh } from "react-icons/io";
import OutputAreaVerified from "./outputfiles/OutPutAreaVerified";
import { HiOutlineClipboard } from "react-icons/hi";
import InputVerifiedUsers from "./outputfiles/InputVerifiedUsers";

const TranslateRegisteredUsers = () => {
  const [source_language, setSourceLanguage] = useState("en");
  const [target_language, setTargetLanguage] = useState("pcm");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);

  const handleAccessToken = useCallback(async () => {
    let accessToken = "";
    try {
      accessToken = await getAccessTokenFromCookie();
      if (!accessToken || accessToken === "unauthenticated user") {
        toast.error("No access token found. Please log in.");
        return null;
      }
      return accessToken;
    } catch (error) {
      console.error("Error fetching access token:", error);
      toast.error("Error fetching access token: " + error.message);
      return null;
    }
  }, []);

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
        "Content-Type": "application/json",
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

  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = await Cookies.get("access_token");
      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error while fetching access token:", error);
      toast.error("Error fetching access token: " + error.message);
      return "unauthenticated user";
    }
  };

  const textRef = useRef();

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

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
          <div className="flex flex-col w-1/2 h-[400px] outline-none">
            <div className="absolute pl-[185px] sm:pl-[40px] pt-[50px] flex flex-col sm:align-middle sm:items-center">
              <HiOutlineClipboard className="w-[100px] h-[100px] sm:w-[40px] sm:h-[40px]" />
              <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px] font-medium">
                Paste your text here
              </p>
            </div>
            <img
              src={Inspeaker}
              alt="speak_img"
              className="absolute pl-[190px] pt-[50px]"
            />

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

          <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
            <OutputAreaVerified
              isLoading={isLoading}
              target_text={target_text}
              textRef={textRef}
              loadingAudio={loadingAudio}
              handleTextToSpeechSubmit={handleTextToSpeechTranslation}
            />
            <VerOutputProperties
              translatedAudioUrl={translatedAudioUrl}
              copyToClipboard={copyToClipboard}
              feedbackId={feedbackData}
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TranslateRegisteredUsers;
