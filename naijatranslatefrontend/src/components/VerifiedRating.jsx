import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DialogTitle from "@mui/material/DialogTitle";
import { useRatingStore, useOpenNavbar } from "../Stores/Stores";
import { useState } from "react";
import close from "../assets/close.svg";
import { useMutation } from "@tanstack/react-query";
import thumbUp from "../assets/thumbUp.svg";
import axios from "axios";
import { baseURL } from "../api/SpeechApi";
import { IoThumbsUpOutline } from "react-icons/io5";

export default function VerifiedRating({ feedbackId }) {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStore();
  const { setOpenNav } = useOpenNavbar();

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const commonHeaders = await getCommonHeaders();
        const response = await axios.put(`${baseURL}/task/rate`, ratingParams, {
          headers: commonHeaders,
        });
        toast.success(response.data.message);

        return response.data;
      } catch (error) {
        console.error("Error during mutation:", error);
        console.error("Response data:", error.response?.data);
        console.error("Status code:", error.response?.status);
        throw error;
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "rating" ? parseInt(value, 10) || "" : value;
    setRatingParams({ ...ratingParams, [name]: updatedValue });
  };

  const submitData = async () => {
    try {
      await mutate();
      setOpenNav(true);
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data: " + error.message);
    }
  };

  const handleClose = () => {
    setRatingParams({
      id: feedbackId,
      rating: 1,
      feedback: "",
      correct_translation: "",
    });
    setOpen(false);
  };

  const getCommonHeaders = async () => {
    try {
      let accessToken = await getAccessTokenFromCookie();
      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      return commonHeaders;
    } catch (error) {
      console.error("Error in getCommonHeaders:", error);
      throw error;
    }
  };

  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = Cookies.get("access_token") || "unauthenticated user";
      return accessToken;
    } catch (error) {
      console.error("Error during getAccessTokenFromCookie:", error);
      throw error;
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <IoThumbsUpOutline size={20} />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <div className="flex justify-end">
          <button autoFocus onClick={handleClose} className="p-[5px]">
            <img src={close} alt="close img" />
          </button>
        </div>
        <p className="text-center text-[20px] font-bold leading-[30px]">
          Rating Form
        </p>
        <div className="p-[10px] flex flex-col gap-[10px]">
          <label>
            Rating(number 1-5)
            <input
              type="number"
              name="rating"
              value={ratingParams.rating}
              onChange={handleChange}
              className="placeholder:p-[10px] appearance-none outline-none flex border rounded-[10px] px-[10px] py-[5px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>

          <label>
            Feedback
            <input
              name="feedback"
              value={ratingParams.feedback}
              onChange={handleChange}
              className="placeholder:p-[10px] appearance-none outline-none flex border rounded-[10px] px-[10px] py-[5px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>

          <label>
            Correct Translation
            <textarea
              name="correct_translation"
              value={ratingParams.correct_translation}
              onChange={handleChange}
              className="placeholder:p-[10px] appearance-none outline-none flex h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>
        </div>
        <DialogActions>
          <Button onClick={submitData}>Submit</Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </>
  );
}
