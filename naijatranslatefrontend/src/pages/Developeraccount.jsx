import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogTitle from "@mui/material/DialogTitle";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import "react-toastify/dist/ReactToastify.css";
import close from "../assets/close.svg";
import Cookies from "js-cookie";

import { useMutation } from "@tanstack/react-query";

import NavVerified from "../navbar/NavVerified";
import { baseURL } from "../api/SpeechApi";
import axios from "axios";

const Developeraccount = () => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const mutation = useMutation({
    mutationFn: (updatedRatings) => {
      return axios.put(`${baseURL}/developer/api-key-request`, updatedRatings, {
        headers: getCommonHeaders(), // Include the headers here
      });
    },


    onSuccess: (data) => {
      toast.success(`Request submitted successfully: ${data.message}`);
      console.log("data", data);
    },
    onError: (error) => {
      // Access the response error and show error message
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(` ${errorMessage}`);
    },
  });

  const submitData = () => {
    mutation.mutate({
      reason: reason,
    });
  };

  const getCommonHeaders = async () => {
    try {
      let accessToken = "";
      getAccessTokenFromCookie().then(
        (accessTokenId) => {
          accessToken = accessTokenId;
        },
        (error) => {
          console.error("Error while fetching access token", error);
        }
      );

      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      console.log("headers", commonHeaders);
      return commonHeaders;
    } catch (error) {
      console.error("Error in getCommonHeaders:", error);
      throw error;
    }
  };

  //working fine
  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      console.log("Access token: " + accessToken);
      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error during mutation:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);
      toast.error("Error submitting data: " + error.message);
      return "unauthenticated user";
    }
  };

  const toggleDialog = () => {
    setOpen(!open);
  };
  return (
    <>
      <NavVerified />
      <div className="flex justify-center flex-col px-[40px] py-[30px] bg-[#f0f0f0]">
        <div className="bg-white p-[20px]">
          <div className="flex flex-row justify-start px-[10px] py-[20px]">
            <h2 className=" text-[20px] font-bold">Developer Account</h2>
          </div>
          <div className="py-[10px]">
            <div>
              <button
                onClick={toggleDialog}
                className="bg-primary  hover:cursor-pointer text-white rounded-full w-[200px] px-lg h-[40px]"
              >
                Request for Api key
              </button>
            </div>
            <Dialog
              open={open}
              onClose={toggleDialog}
              aria-labelledby="draggable-dialog-title"
            >
              <div className="flex flex-row p-[10px]">
                <DialogTitle style={{ cursor: "move" }}>
                  Request For API key
                </DialogTitle>
                <Button autoFocus onClick={toggleDialog}>
                  <img src={close} alt="close img" />
                </Button>
              </div>
              <DialogContent>
                <label>
                  Reason for requesting API key
                  <br />
                  <input
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
                  />
                </label>
                <br />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    toggleDialog();
                    submitData();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
              <ToastContainer />
            </Dialog>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Developeraccount;
