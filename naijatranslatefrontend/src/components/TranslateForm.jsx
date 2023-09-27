// import OutputProperties from "./outputfiles/OutputProperties";
// import InputProperties from "./inputfiles/InputProperties";

// import { useState } from "react";
// import changeIcon from "../assets/Changeicon.png";
// import axios from "axios";

// const TranslateForm = () => {
//   const [source_language, setSource_language] = useState("en");
//   const [target_language, setTarget_language] = useState("");
//   const [source_text, setSource_text] = useState("");
//   const [target_text, setTarget_text] = useState("");
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(
//       "http://3.83.243.144/api/v1/translate/unregistered-trial",
//       {
//         method: "POST",
//         mode: 'no-cors',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           source_language:source_language,
//           target_language:target_language,
//           source_text:source_text,
//           target_text:target_text,
//           feedback:"3fa85f64-5717-4562-b3fc-2c963f66afa6"
//         }),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       const  {target_text}  = responseData.data;
//       setTarget_text(target_text);
//       setIsloading(true)
//     } else {
//       console.log("Error");
//       const data = await response.json();
//       console.log(data);
//     }

// if(isLoading) {
//   return (
//     <div className="w-[200px] text-[30px] text-primary">Please wait ...</div>
//   )
// }

//   };
//   return (
// <form
//   onSubmit={handleSubmit}
//   className="flex flex-col max-w-[1000px] mx-auto p-[40px] "
// >
//   <div className="flex flex-row bg-orange-200 w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
//     <div className="flex flex-row w-1/2 justify-center bg-white">
//       <select
//         id="input_language"
//         name="input_language"
//         value={source_language}
//         onChange={(e) => setSource_language(e.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="yor">Yoruba</option>
//         <option value="pcm">Pidgin</option>
//       </select>
//     </div>
//     <img src={changeIcon} alt="change icon" className="w-[30px] h-[30px]" />
//     <div className="flex flex-row w-1/2 pl-[100px] bg-white">
//       <select
//         id="output_language"
//         name="output_language"
//         value={target_language}
//         onChange={(e) => setTarget_language(e.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="yor">Yoruba</option>
//         <option value="pcm">Pidgin</option>
//       </select>
//     </div>
//   </div>
//   <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]">
//     <div className="flex flex-col w-1/2 h-[400px">
//       <label htmlFor="source_text " className="p-[4px] font-semibold">Source Text:</label>
//       <textarea
//         className="h-[400px] active:border-0 p-[4px] focus-within:bg-none"
//         // contentEditable
//         id="source_text"
//         name="source_text"
//         value={source_text}
//         onChange={(e) => setSource_text(e.target.value)}
//         // suppressContentEditableWarning={true}
//       />
//         <InputProperties />
//     </div>

//     <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
//       <label htmlFor="output_text" className="p-[4px] font-semibold">Output Text:</label>
//       <textarea
//         className="h-[400px] active:border-none p-[8px]"
//         // contentEditable
//         id="target_text"
//         name="target_text"
//         value={target_text}
//         // suppressContentEditableWarning={true}
//         onChange={(e) => setTarget_text(e.target.value)}
//         // onInput={(e) => setTarget_text(e.target.textContent)}
//         // onBlur={(e) => setTarget_text(e.target.textContent)}
//       />
//     <OutputProperties />
//     </div>
//   </div>

//   <button
//     type="submit"
//     className="text-white h-6 mt-4 p-[8px] mt-[10px] mx-auto rounded-md bg-primary"
//   >
//     Translate
//   </button>
// </form>
//   );
// };

// export default TranslateForm;

// // try {
// //   const response = await axios.post(
// //     "http://3.83.243.144/api/v1/translate/unregistered-trial",
// //     {
// //       source_language: source_language,
// //       target_language: target_language,
// //       source_text: source_text,
// //       target_text: target_text,
// //       feedback: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// //     },
// //     {
// //       headers: {
// //         "Content-Type": "application/json"
// //       }
// //     }
// //   );

// //   if (response.status === 201) {
// //     const responseData = response.data.data;
// //     const { target_text } = responseData;
// //     setTarget_text(target_text);
// //   } else {
// //     console.log("Error");
// //     console.log(response.data);
// //   }
// // } catch (error) {
// //   console.error("An error occurred:", error);
// // }

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
    setIsLoading(true); // Set loading state before making the request
    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/translate/unregistered-trial",
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
      setIsLoading(false); // Set loading state to false after request completion
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="w-[200px] text-[30px] text-primary">
          Please wait ...
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[1000px] mx-auto p-[40px] "
      >
        <div className="flex flex-row bg-orange-200 w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
          <div className="flex flex-row w-1/2 justify-center bg-white">
            <select
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
            <select
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
            <label htmlFor="source_text " className="p-[4px] font-semibold">
              Source Text:
            </label>
            <textarea
              className="h-[400px] active:border-0 p-[4px] focus-within:bg-none"
              // contentEditable
              id="source_text"
              name="source_text"
              value={source_text}
              onChange={(e) => setSource_text(e.target.value)}
              // suppressContentEditableWarning={true}
            />
            <button
              type="submit"
              className="px-[8px] border-[2px] h-[30px] mx-auto rounded-full text-primary text-center"
            >
              Translate
            </button>
            <InputProperties />
          </div>

          <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
            <label htmlFor="output_text" className="p-[4px] font-semibold">
              Output Text:
            </label>
            <textarea
              className="h-[400px] active:border-none p-[8px]"
              // contentEditable
              id="target_text"
              name="target_text"
              value={target_text}
              // suppressContentEditableWarning={true}
              onChange={(e) => setTarget_text(e.target.value)}
              // onInput={(e) => setTarget_text(e.target.textContent)}
              // onBlur={(e) => setTarget_text(e.target.textContent)}
            />
            <OutputProperties />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TranslateForm;
