// export default TranslateVerUser;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useState } from "react";
import InputProperties from "./inputfiles/InputProperties";
import changeIcon from "../assets/Changeicon.png";
import history from "../assets/history.svg";
import Inspeaker from "../assets/speakerout.svg";
import Outspeaker from "../assets/loutspeaker.svg";
import ClipBoard from "../assets/clipboard.svg";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import NavVerified from "../navbar/NavVerified";

import { useBarStore } from "../Stores/Stores";
import VerOutputProperties from "./outputfiles/VerOutputProperties";

const TranslateVerUser = () => {
  const [source_language, setSource_language] = useState("en");
  const [inputType, setInputType] = useState("text");
  const [outputType, setOutputType] = useState("text");
  const [target_language, setTarget_language] = useState("");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isText, setIsText] = useState("");
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [feedbackData, setFeedbackData] = useState("");

  const { isOpen, setOpen, setClose } = useBarStore();

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleOutputTypeChange = (e) => {
    setOutputType(e.target.value);
  };
  //handlesubmit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let accessToken = "";
      await getAccessTokenFromCookie().then(
        (accessTokenId) => {
          accessToken = accessTokenId;
        },
        (error) => {
          console.error("Error while fetching access token:", error);
        }
      );

      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      const formDataText = {
        source_language: source_language,
        target_language: target_language,
        source_text: source_text,
        target_text: target_text,
      };

      const formDataSpeech = {
        text: isText,
      };

      let result;

      // multiple API text-to-text and text-to-speech
      if (inputType === "text" && outputType === "text") {
        result = await textToTextTranslate(formDataText, commonHeaders);
      } else if (inputType === "text" && outputType === "speech") {
        result = await textToSpeechTranslate(formDataSpeech, commonHeaders);
      }

      // Handle the result here if needed
      console.log("Result:", result);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // API endpoint for text-to-text translation
  const textToTextTranslate = async (formDataText, commonHeaders) => {
    const apiUrl = "http://3.83.243.144/api/v1/translate-serverless/text-text";

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
        console.log("feedback",responseData.data.feedback_id)
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
      toast.error("Network error, " + error.message);
    }
  };
  // API endpoint for text-to-speech translation
  const textToSpeechTranslate = async (formDataSpeech, commonHeaders) => {
    const apiUrl =
      "http://3.83.243.144/api/v1/translate-serverless/text-speech";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          ...commonHeaders,
          "Content-Type": "application/json",
        },
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
      console.error("An error occurred:", error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessTokenFromCookie = async () => {
    // Use async/await to wrap the cookie access
    try {
      const accessToken = await Cookies.get("access_token");
      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error while fetching access token:", error);
      toast.error("Error fetching access token: " + error.message);
      return "unauthenticated user";
    }
  };

  return (
    <>
      <div className="bg-graylight">
        <NavVerified />

        <div className="flex flex-row justify-around pl-[220px] w-full pt-[30px]">
          <div className="flex flex-row justify-around border-gray ">
            <div className="flex flex-row ">
              <select
                className="text-primary bg-light cursor-pointer border rounded-[10px] px-[10px] outline-none"
                id="input_language"
                name="input_language"
                value={inputType}
                onChange={handleInputTypeChange}
              >
                <option value="text">Text</option>
                <option value="speech">Speech</option>
              </select>
            </div>

            <img
              src={changeIcon}
              alt="change icon"
              className="w-[40px] h-[40px] "
            />
            <div className="flex flex-row">
              <select
                className="text-primary cursor-pointer bg-light border rounded-[10px] px-[10px] outline-none"
                id="output_language"
                name="output_language"
                value={outputType}
                onChange={handleOutputTypeChange}
              >
                <option value="text">Text</option>
                <option value="speech">Speech</option>
              </select>
            </div>
          </div>
          <Link
            to="/internalhistory"
            className="flex hover:px-[5px] hover:bg-light mb-[20px]"
          >
            <img src={history} alt="feedback" className="pr-[10px]" />
            <div className="">history</div>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[1000px] mx-auto p-[40px] "
        >
          <div className="flex flex-row w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray outline-none">
            <div className="flex flex-row w-1/2 justify-center bg-white outline-none">
              <select
                id="input_language"
                name="input_language"
                className="text-primary"
                value={source_language}
                onChange={(e) => setSource_language(e.target.value)}
              >
                <option value="en">English</option>
                <option value="yor">Yoruba</option>
                <option value="pcm">Pidgin</option>
              </select>
            </div>
            <img
              src={changeIcon}
              alt="change icon"
              className="w-[30px] h-[30px]"
            />
            <div className="flex flex-row w-1/2 pl-[100px] bg-white ">
              <select
                className="text-primary"
                id="output_language"
                name="output_language"
                value={target_language}
                onChange={(e) => setTarget_language(e.target.value)}
              >
                <option value="en">English</option>
                <option value="yor">Yoruba</option>
                <option value="pcm">Pidgin</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-[410px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]outline-none ">
            <div className="flex flex-col w-1/2 h-[400px] outline-none">
              {inputType === "text" &&
                source_text.length === 0 &&
                isText.length === 0 && (
                  <div className="absolute pl-[180px] pt-[90px] flex flex-col">
                    <img
                      src={ClipBoard}
                      alt="clipboard"
                      className="w-[100px]"
                    />
                    <p className="text-center text-[12px]">
                      Paste your text here
                    </p>
                  </div>
                )}
              {inputType === "speech" && source_text.length === 0 && (
                <img
                  src={Inspeaker}
                  alt="speak_img"
                  className="absolute pl-[190px] pt-[90px]"
                />
              )}
              {outputType === "text" && (
                <textarea
                  className="h-[400px] active:border-0 p-[4px] focus-within:bg-none outline-none"
                  id="source_text"
                  name="source_text"
                  value={source_text}
                  onChange={(e) => setSource_text(e.target.value)}
                />
              )}
              {outputType === "speech" && (
                <textarea
                  className="h-[400px] active:border-0 p-[4px] focus-within:bg-none outline-none"
                  id="speech_text"
                  name="speech_text"
                  value={isText}
                  onChange={(e) => setIsText(e.target.value)}
                />
              )}

              <button
                type="submit"
                className="px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center"
                disabled={isLoading}
              >
                {isLoading ? "Please wait" : "Translate"}
              </button>
              <InputProperties outputType={outputType} />
            </div>

            <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
              {outputType === "text" && target_text.length === 0 && (
                <div className="absolute pl-[80px] w-[300px] pt-[100px] flex flex-col">
                  <Skeleton className="h-[40px]" />
                  <Skeleton animation="wave" className="h-[40px]" />
                  <Skeleton animation={false} className="w-[200px] h-[40px]" />
                </div>
              )}
              {outputType === "speech" && target_text.length === 0 && (
                <img
                  src={Outspeaker}
                  alt="speak_img"
                  className="absolute pl-[40px] pt-[90px]"
                />
              )}
              <textarea
                className="h-[400px] active:border-none p-[8px] outline-none"
                id="target_text"
                name="target_text"
                value={target_text}
                onChange={(e) => setTarget_text(e.target.value)}
              />
              <VerOutputProperties
                translatedAudioUrl={translatedAudioUrl}
                outputType={outputType}
                feedbackId={feedbackData}
              />
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default TranslateVerUser;
