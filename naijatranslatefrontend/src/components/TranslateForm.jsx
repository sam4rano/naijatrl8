import { useState } from "react";
import axios from "axios";
import changeIcon from "../assets/Changeicon.png";
import OutputProperties from "./outputfiles/OutputProperties";
import InputProperties from "./inputfiles/InputProperties";
import Navbar from "../navbar/Navbar";

const TranslateForm = () => {
  const [source_language, setSource_language] = useState("en");
  const [target_language, setTarget_language] = useState("");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/translate-serverless/text-text/unregistered-trial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_language: source_language,
            target_language: target_language,
            source_text: source_text,
            target_text: target_text,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { target_text } = responseData.data;
        setTarget_text(target_text);
      } else {
        console.log("Error");
        console.log(await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[1000px] mx-auto p-[40px]"
      >
        <div className="flex flex-row bg-orange-200 w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
          <div className="flex flex-row w-1/2 justify-center bg-white">
            <select className="text-primary"
              id="input_language"
              name="input_language"
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
          <div className="flex flex-row w-1/2 pl-[100px] bg-white">
            <select className="text-primary"
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
        <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]">
          <div className="flex flex-col w-1/2 h-[400px">
            
            <textarea
              className="h-[400px] active:border-0 p-[4px] focus-within:bg-none"
           
              id="source_text"
              name="source_text"
              value={source_text}
              onChange={(e) => setSource_text(e.target.value)}
            
            />
            <button
              type="submit"
              className="px-[8px] border-[1px] h-[30px] mx-auto rounded-full text-primary text-center"
              disabled={isLoading}
            >
              {isLoading ? "Please wait" : "Translate"}
            </button>
            <InputProperties />
          </div>

          <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
            
            <textarea
              className="h-[400px] active:border-none p-[8px]"
              
              id="target_text"
              name="target_text"
              value={target_text}
            
              onChange={(e) => setTarget_text(e.target.value)}
        
            />
            <OutputProperties />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TranslateForm;
