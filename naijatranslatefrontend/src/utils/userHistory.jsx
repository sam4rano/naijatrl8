import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrowLeft from "../assets/arrowleft.svg";

import { baseURL } from "../api/SpeechApi";
import NavVerified from "../navbar/NavVerified";

const InternalHistory = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await Cookies.get("access_token");
        setAccessToken(token || "unauthenticated user");
      } catch (error) {
        toast.error("Error fetching access token: " + error.message);
        setAccessToken("unauthenticated user");
      }
    };

    fetchAccessToken();
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  };

  const { data, status } = useQuery({
    queryKey: ["reqdata"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${baseURL}/translate/my-translations`,
          requestOptions
        );
        return response.data;
      } catch (error) {
        toast.error(error.response.data.detail);
        throw error;
      }
    },
    enabled: !!accessToken,
  });

  return (
    <>
      <NavVerified />
      <div className="flex justify-center flex-col px-[20px] py-[10px] bg-[#f0f0f0]">
        <div className="bg-white p-[10px]  rounded-[12px]">
          <div className="flex flex-row justify-start px-[10px] py-[10px]">
            <h2 className=" text-[20px] font-bold">History</h2>
          </div>
          <div className="py-[10px]">
            <hr className="" />
            <div className="flex flex-row justify-end">
              <h2 className=" text-[16px] py-[10px]">Clear all history</h2>
            </div>
            <hr className="" />
          </div>

          {status === "error" && <p>Error fetching data</p>}
          {status === "loading" && <p>Fetching data...</p>}
          {status === "success" && (
            <div className="">
              {data.error ? (
                <p>Error: {data.error}</p>
              ) : (
                data.data.map((item) => (
                  <div key={item.id} className="">
                    <div className="flex ">
                      <h2 className="pr-[10px]">
                        {item.source_language === "en"
                          ? "English"
                          : item.source_language === "pcm"
                          ? "Pidgin"
                          : item.source_language}
                      </h2>
                      <img src={arrowLeft} alt="arrow left" className="" />
                      <h2 className="pl-[10px]">
                        {item.target_language === "en"
                          ? "English"
                          : item.target_language === "pcm"
                          ? "Pidgin"
                          : item.target_language}
                      </h2>
                    </div>
                    <div className="flex flex-row justify-between  p-[10px]">
                      <div className=" text-[14px] py-[5px] flex flex-auto">
                        <p className="p-2">{item.source_text}</p>
                      </div>
                      <div className="bg-gray text-[14px] flex flex-auto py-[5px] rounded-[6px]">
                        <p className="p-2">{item.target_text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default InternalHistory;
