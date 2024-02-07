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
    const updatedValue = name === "rating" ? parseInt(value, 10) : value;
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

  // working fine too
  const getCommonHeaders = async () => {
    try {
      let accessToken = "";
      await getAccessTokenFromCookie().then(
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

      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error during mutation:", error);
      console.error("Response data:", error.response?.data);

      toast.error("Error submitting data: " + error.message);
      return "unauthenticated user";
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <img src={thumbUp} alt="thumbUp" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }}>Rating Form</DialogTitle>
        <DialogContent>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={ratingParams.rating}
              onChange={handleChange}
              className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>
          <br />
          <label>
            Feedback:
            <input
              name="feedback"
              value={ratingParams.feedback}
              onChange={handleChange}
              className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>
          <br />
          <label>
            Correct Translation:
            <textarea
              type="text"
              name="correct_translation"
              value={ratingParams.correct_translation}
              onChange={handleChange}
              className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <img src={close} alt="close img" />
          </Button>
          <Button
            onClick={() => {
              submitData();
              setOpenNav(true);
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </>
  );
}
