import { useCallback, useState } from "react";
import axios from "axios";
import changeIcon from "../assets/Changeicon.png";
import OutputProperties from "./outputfiles/OutputProperties";
import Inspeaker from "../assets/speakerout.svg";
import inputSpeaker from "../assets/Inspeaker.svg";
import Outspeaker from "../assets/loutspeaker.svg";
import ClipBoard from "../assets/clipboard.svg";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../api/SpeechApi";

const TranslateForm = () => {
  //text to text
  const [inputType, setInputType] = useState("text");
  const [outputType, setOutputType] = useState("text");
  const [source_language, setSourceLanguage] = useState("en");
  const [target_language, setTargetLanguage] = useState("");
  const [source_text, setSourceText] = useState("");
  const [target_text, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState("");
  const [isText, setIsText] = useState("");
  const [feedbackData, setFeedbackData] = useState("");

  //text to speech
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleOutputTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  //text to speech
  // API endpoint for text-to-text translation
  const textToTextTranslate = useCallback(async () => {
    const formData = {
      source_language: source_language,
      target_language: target_language,
      source_text: source_text,
      target_text: target_text,
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
  }, [source_language, source_text, target_language, target_text]);

  // API endpoint for text-to-speech translation
  const textToSpeechTranslate = useCallback(async () => {
    const apiUrl = `${baseURL}/translate-serverless/text-speech/unregistered-trial`;

    try {
      const response = await axios.post(apiUrl, {
        text: isText,
      });

      if (response.data && !response.data.error) {
        const { message, data } = response.data;

        if (data && data.url) {
          const { url } = data;
          console.log("url", url)
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
      setIsLoading(false);
    }
  }, [isText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputType === "text" && outputType === "text") {
      textToTextTranslate();
    } else if (inputType === "text" && outputType === "speech") {
      textToSpeechTranslate();
    }
  };

  return (
    <div className="overflow-hidden">
        <div className="flex flex-row pt-[20px] border-gray justify-start pl-[220px] sm:items-center sm:align-middle sm:pl-[0px] w-full">
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
            className="w-[40px] h-[40px] sm:h-[25px] sm:w-[25px]"
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
      {/* <div className="flex flex-row justify-start pl-[220px] sm:items-center sm:align-middle sm:pl-[0px] w-full pt-[30px]">
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[1000px] sm:w-[400px] sm:p-[20px] mx-auto p-[40px]"
      >
        <div className="flex flex-row w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
          <div className="flex flex-row w-1/2 justify-center bg-white outline-none">
            <select
              className="text-primary outline-none cursor-pointer"
              id="input_language"
              name="input_language"
              value={source_language}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="yor">Yoruba</option>
              <option value="pcm">Pidgin</option>
            </select>
          </div>
          <img
            src={changeIcon}
            alt="change icon"
            className="w-[30px] h-[30px] sm:h-[25px] sm:w-[25px]"
          />
          <div className="flex flex-row w-1/2 pl-[100px] sm:pl-[20px] bg-white outline-none h-auto">
            <select
              className="text-primary outline-none cursor-pointer"
              id="output_language"
              name="output_language"
              value={target_language}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="yor">Yoruba</option>
              <option value="pcm">Pidgin</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]">
          <div className="flex flex-col w-1/2 h-[400px">
            {inputType === "text" &&
              source_text.length === 0 &&
              isText.length === 0 && (
                <div className="absolute pl-[180px] sm:pl-[40px] pt-[90px] flex flex-col">
                  <img src={ClipBoard} alt="clipboard" className="w-[100px] sm:w-[80px] sm:h-[80px]" />
                  <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px]">
                    Paste your text here
                  </p>
                </div>
              )}

            {inputType === "speech" && source_text.length === 0 && (
              <img
                src={Inspeaker}
                alt="speak_img"
                className="absolute pl-[190px] sm:w-[80px] sm:h-[80px] pt-[90px]"
              />
            )}
            {outputType === "text" && (
              <textarea
                className="h-[400px] active:border-0 p-[4px] focus-within:bg-none outline-none"
                id="source_text"
                name="source_text"
                value={source_text}
                onChange={(e) => setSourceText(e.target.value)}
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
            {outputType === "speech" && (
              <div className="flex flex-row justify-between px-[10px]">
                <div className="flex flex-row justify-around rounded-full px-[5px] h-[30px] border-[1px] border-outline">
                  <img
                    src={inputSpeaker}
                    className="w-[30px] h-[30px]"
                    alt="speaker"
                  />
                  <h3 className="pt-[2px] ">speak</h3>
                </div>
                <h3 className="text-center pt-[6px]">0/2mins</h3>
              </div>
            )}
          </div>

          <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
            {outputType === "text" && target_text.length === 0 && (
              <div className="absolute pl-[80px] sm:pl-[50px] w-[300px] sm:w-[80px] sm:h-[80px] pt-[100px] flex flex-col">
                <Skeleton className="h-[40px] sm:w-[80px] sm:h-[80px] " />
                <Skeleton animation="wave" className="h-[40px] sm:w-[80px] sm:h-[80px] " />
                <Skeleton animation={false} className="w-[200px] sm:w-[80px] sm:h-[80px] h-[40px]" />
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
              onChange={(e) => setTargetText(e.target.value)}
            />

            <OutputProperties
              translatedAudioUrl={translatedAudioUrl}
              outputType={outputType}
              feedbackData={feedbackData}
            />
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default TranslateForm;
