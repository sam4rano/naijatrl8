// import { useState } from "react";
// import changeIcon from "../assets/Changeicon.png"
// import Navbar from "../navbar/Navbar";
// import axios from "axios"

// const TranslateVerUser = () => {
//   const [source_language, setSource_language] = useState("en");
//   const [target_language, setTarget_language] = useState("");
//   const [source_text, setSource_text] = useState("");
//   const [target_text, setTarget_text] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const response = await fetch("http://3.83.243.144/api/v1/translate", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     "Authorization": "Bearer "
//     //   },
//     //   body: JSON.stringify({
//     //     source_language,
//     //     target_language,
//     //     source_text,
//     //     target_text,
//     //   }),
//     // });
//     // if (response.ok) {
//     //   const responseData = await response.json();
//     //   const { target_text } = responseData.data;
//     //   setTarget_text(target_text);
//     // } else {
//     //   console.log("Error");
//     //   const data = await response.json();
//     //   console.log(data);
//     // }
//     try {
//       const response = await axios.post(
//         "http://3.83.243.144/api/v1/translate",
//         {
//           source_language:source_language,
//           target_language:target_language,
//           source_text:source_text,
//           target_text:target_text,
//           feedback:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
// "Authorization": `Bearer ${getAccessTokenFromCookie()}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const responseData = response.data.data;
//         const { target_text } = responseData;
//         setTarget_text(target_text);
//       } else {
//         console.log("Error");
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

// const getAccessTokenFromCookie = () => {
//   const cookieArray = document.cookie.split(';');
//   for (const cookie of cookieArray) {
//     const [name, value] = cookie.trim().split('=');
//     if (name === 'access_token') {
//       return value;
//     }
//   }
//   return '';
// };

//   return (
//     <>
//     <Navbar />

//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col max-w-[1000px] mx-auto"
//     >
//       <div className="flex flex-row bg-orange-200 w-full border-2 border-dark">
//         <div className="flex flex-row w-1/2">
//           <select
//             id="input_language"
//             name="input_language"
//             value={source_language}
//             onChange={(e) => setSource_language(e.target.value)}
//           >
//             <option value="en">English</option>
//             <option value="yor">Yoruba</option>
//             <option value="pcm">Pidgin</option>
//           </select>
//         </div>
//         <img src={changeIcon} alt="change icon" className=""/>

//         <div className="flex flex-row w-1/2">
//           <select
//             id="output_language"
//             name="output_language"
//             value={target_language}
//             onChange={(e) => setTarget_language(e.target.value)}
//           >
//             <option value="en">English</option>
//             <option value="yor">Yoruba</option>
//             <option value="pcm">Pidgin</option>
//           </select>
//         </div>
//       </div>
//       <div className="flex flex-row justify-between w-full border-2 border-dark h-[400px]">
//         <div className="flex flex-col w-1/2 h-[400px]">
//           <label htmlFor="source_text">Source Text:</label>
//           <div
//             className="h-[400px] border-2 border-dark"
//             contentEditable
//             id="source_text"
//             name="source_text"
//             value={source_text}
//             onBlur={(e) => setSource_text(e.target.textContent)}
//             suppressContentEditableWarning={true}
//           >
//             {source_text}
//           </div>
//         </div>
//         <div className="flex flex-col w-1/2 h-[400px] border-2 border-dark">
//           <label htmlFor="output_text">Output Text:</label>
//           <div
//             className="h-[400px] border-2 border-transparent"
//             contentEditable
//             id="target_text"
//             name="target_text"
//             value={target_text}
//             // onChange={(e) => setTarget_text(e.target.value)}
//             // onInput={(e) => setTarget_text(e.target.textContent)}
//             onBlur={(e) => setTarget_text(e.target.textContent)}
//           >
//             {target_text}
//           </div>
//         </div>
//       </div>
//       <button
//         type="submit"
//         className="text-white h-6 mt-4 p-[8px] mx-auto rounded-md bg-primary"
//       >
//         Translate
//       </button>
//     </form>
//     </>
//   );
// };

// export default TranslateVerUser;

// import OutputProperties from "./outputfiles/OutputProperties";
// import InputProperties from "./inputfiles/InputProperties";
// import axios from "axios"
// import Navbar from "../navbar/Navbar";

// import { useState } from "react";
// import changeIcon from "../assets/Changeicon.png";

// const TranslateVerUser = () => {
//   const [source_language, setSource_language] = useState("en");
//   const [target_language, setTarget_language] = useState("");
//   const [source_text, setSource_text] = useState("");
//   const [target_text, setTarget_text] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(
//       "http://3.83.243.144/api/v1/translate",
//       {
//         method: "POST",
//         // mode: 'no-cors',
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${getAccessTokenFromCookie()}`,
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
//       const { target_text } = responseData.data;
//       setTarget_text(target_text);
//     } else {
//       console.log("Error");
//       const data = await response.json();
//       console.log(data);
//     }
//   };

//   const getAccessTokenFromCookie = () => {
//     const cookieArray = document.cookie.split(';');
//     for (const cookie of cookieArray) {
//       const [name, value] = cookie.trim().split('=');
//       if (name === 'access_token') {
//         return value;
//       }
//     }
//     return 'unauthenticated user'+ name;
//   };
//   return (
//     <>
//     <Navbar />
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
//     </>
//   );
// };

// export default TranslateVerUser;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import InputProperties from "./inputfiles/InputProperties";
import OutputProperties from "./outputfiles/OutputProperties";
import changeIcon from "../assets/Changeicon.png";
import Title from "../utils/Title";

const TranslateVerUser = () => {
  const [source_language, setSource_language] = useState("en");
  const [target_language, setTarget_language] = useState("");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const accessToken = getAccessTokenFromCookie();
  //     const response = await axios.post(
  //       "http://3.83.243.144/api/v1/translate",
  //       {
  //         source_language: source_language,
  //         target_language: target_language,
  //         source_text: source_text,
  //         target_text: target_text,
  //         feedback: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const responseData = response.data;
  //       const { target_text } = responseData.data;
  //       setTarget_text(target_text);
  //     } else {
  //       console.error("Error in translation request");
  //       // Display an error message to the user
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     // Display an error message to the user
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const accessToken = getAccessTokenFromCookie();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NDI2OTQyLCJpYXQiOjE2OTU4MjIxNDIsImp0aSI6IjMzZTQzNzIzZmJjZjRmYWU4ODA2Zjc2ZTZmZWFhZDE2IiwidXNlcl9pZCI6MX0.CH4blmK_zPDm59843e3KF5TWxDu8fXXTI5Aayj-xAb4`,
      },
      body: JSON.stringify({
        source_language: source_language,
        target_language: target_language,
        source_text: source_text,
        target_text: target_text,
      }),
    };

    try {
      // const response = await axios.post(
      //   "http://3.83.243.144/api/v1/translate",
      //   {
      //     source_language: source_language,
      //     target_language: target_language,
      //     source_text: source_text,
      //     target_text: target_text,
      //     feedback: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      const response = await fetch(
        "http://3.83.243.144/api/v1/translate-serverless/text-text",
        requestOptions
      );

      if (response.ok) {
        const responseData = await response.json();
        const { target_text } = responseData.data;
        setTarget_text(target_text);
      } else {
        console.error("Error in translation request");
        toast.error("Translation request failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // const getAccessTokenFromCookie = () => {
  //   const accessToken = Cookies.get('access_token');
  //   return accessToken || 'unauthenticated user';
  // };

  return (
    <>
    <div>
    <Title />

    </div>

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
            <label htmlFor="source_text " className="p-[4px] font-semibold text-primary">
              Source Text
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
            <label htmlFor="output_text" className="p-[4px] text-primary font-semibold">
              Output Text
            </label>
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

        <button
          type="submit"
          className="text-white h-6 mt-4 p-[8px] mt-[10px] mx-auto rounded-md bg-primary"
        >
          Translate
        </button>
        <ToastContainer />
      </form>
    </>
  );
};

export default TranslateVerUser;
