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
import { useCallback } from "react";

export default function VerifiedRating({ feedbackId }) {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStore();
  const { setOpenNav } = useOpenNavbar();

  const mutation = useMutation({
    mutationFn: (updatedRatings) => {
      return axios.put(`${baseURL}/task/rate`, updatedRatings, {
        headers: getCommonHeaders(), // Include the headers here
      });
    },
    onSuccess: (data) => {
      toast.success(`Rating submitted successfully: ${data.message}`);
      console.log("data", data);
    },
    onError: (error) => {
      // Handle error here
      toast.error("Error submitting data: " + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "rating" ? parseInt(value, 10) : value;
    setRatingParams({ ...ratingParams, [name]: updatedValue });
  };

  const submitData = () => {
    mutation.mutate({ ...ratingParams });
  };

  const handleClose = useCallback(() => {
    setOpen(!open);
    setRatingParams({
      id: feedbackId,
      rating: 1,
      feedback: "",
      correct_translation: "",
    });
  }, [open, setRatingParams, feedbackId]);

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

  return (
    <>
      <button onClick={handleClose}>
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
