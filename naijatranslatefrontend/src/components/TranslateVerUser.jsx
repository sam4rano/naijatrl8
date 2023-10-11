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
import history from "../assets/history.svg";
import feedback from "../assets/feedback.svg";
import contact from "../assets/contact.svg";
import upload from "../assets/upload.svg";
import close from "../assets/open.svg";
import open from "../assets/close.svg";
import Title from "../utils/Title";
import { useNavigate, Link } from "react-router-dom";

const TranslateVerUser = () => {
  const [source_language, setSource_language] = useState("en");
  const [target_language, setTarget_language] = useState("");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    setIsLogout(false);

    const accessToken = getAccessTokenFromCookie();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
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
        const errorResponse = await response.json();
        console.error("Error in translation request:", errorResponse);

        toast.error("Translation request failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
    setIsLogout(true);
  };

  const handleClose = () => {
    setNavbar(false);
  };
  const handleOpen = () => {
    setNavbar(true);
  };

  const getAccessTokenFromCookie = () => {
    const accessToken = Cookies.get('access_token');
    return accessToken || 'unauthenticated user';
  };

  return (
    <>
      <div className="bg-graylight">
        <div className="flex flex-row justify-between w-full p-[10px]">
          <div className="flex flex-row">
            <div
              className=" text-dark focus:border-gray-400 cursor-pointer"
              onClick={() => setNavbar(!navbar)}
            >
              {!navbar && <img src={close} alt="close" onClick={handleClose} />}
              {navbar && (
                <img
                  src={open}
                  alt="open"
                  onClick={handleOpen}
                  className="w-[30px] h-[30px]"
                />
              )}
              {navbar && (
                <ul className="w-[200px] absolute p-[10px] rounded-[16px] h-full z-30 bg-gray flex flex-col gap-lg">
                  <ul>
                    <Link
                      to="/history"
                      className="flex hover:bg-light mb-[20px]"
                    >
                      <img src={history} alt="feedback" className="pr-[10px]" />
                      <div>history</div>
                    </Link>
                    <Link
                      to="/feedback"
                      className="flex hover:bg-light mb-[20px]"
                    >
                      <img
                        src={feedback}
                        alt="feedback"
                        className="pr-[10px]"
                      />
                      <div>feedback</div>
                    </Link>
                    <Link
                      to="help_center"
                      className="flex hover:bg-light mb-[20px]"
                    >
                      <img
                        src={upload}
                        alt="help_center"
                        className="pr-[10px]"
                      />
                      <div>Help Center</div>
                    </Link>
                    <Link to="/contact" className="flex hover:bg-light">
                      <img src={contact} alt="contact" className="pr-[10px]" />
                      <div>Contact us</div>
                    </Link>
                  </ul>
                  <Link to="/" className="flex mt-auto hover:bg-light">
                    <img src={contact} alt="contact" className="pr-[10px]" />
                    <div>Logout</div>
                  </Link>
                </ul>
              )}
            </div>
            <Title />
          </div>

          <div className="flex flex-row justify-around">
            <button
              onClick={handleLogout}
              type="submit"
              className="px-[8px] border-[1px] h-[30px] rounded-full text-primary text-center "
            >
              Logout
            </button>
            <p className="rounded-full h-[30px] w-[30px] bg-primary pl-[5px]"></p>
          </div>
        </div>
        <div className="flex flex-row justify-around w-full px-[10px]">
          <div className="flex flex-row border-gray ">
            <div className="flex flex-row">
              <select
                className="text-primary bg-graylight"
                id="input_language"
                name="input_language"
                // value={source_language}
                // onChange={(e) => setSource_language(e.target.value)}
              >
                <option value="sp">Speech</option>
                <option value="txt">Text</option>
              </select>
            </div>

            <img
              src={changeIcon}
              alt="change icon"
              className="w-[40px] h-[40px] bg-graylight"
            />
            <div className="flex flex-row">
              <select
                className="text-primary bg-graylight"
                id="output_language"
                name="output_language"
                // value={target_language}
                // onChange={(e) => setTarget_language(e.target.value)}
              >
                <option value="sp">Speech</option>
                <option value="txt">Text</option>
              </select>
            </div>
          </div>
          <Link to="/history" className="flex hover:bg-light mb-[20px]">
            <img src={history} alt="feedback" className="pr-[10px]" />
            <div>history</div>
          </Link>
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
            <div className="flex flex-row w-1/2 pl-[100px] bg-white">
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
                className="px-[8px] border-[2px] h-[30px] mx-auto rounded-full text-primary text-center"
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

          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default TranslateVerUser;
