import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DialogTitle from "@mui/material/DialogTitle";
import { useRatingStoreUnverified, useOpenNavbar } from "../Stores/Stores";
import { useState } from "react";
import close from "../assets/close.svg";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import thumpUp from "../assets/thumbUp.svg";
import { baseURL } from "../api/SpeechApi";
import { useCallback } from "react";



export default function UnverifiedRating({ feedbackData }) {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStoreUnverified();
  const { setOpenNav } = useOpenNavbar();

  const mutation = useMutation({
    mutationFn: (updatedRatings) => {
      return axios.put(
        `${baseURL}/task/unregistered-trial/rate`,
        updatedRatings
      );
    },
    onSuccess: (data) => {
      toast.success(`Rating submitted successfully: ${data.message}`);
      console.log("data", data);
    },
    onError: (error) => {
      // Access the response error and show error message
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(` ${errorMessage}`);
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

  const toggleDialog = useCallback(() => {
    setOpen(!open);
    setRatingParams({
      id: feedbackData,
      rating: 1,
      feedback: "",
      correct_translation: "",
    });
  }, [open, setRatingParams, feedbackData]);

  return (
    <>
      <button
        onClick={toggleDialog}
        className="flex justify-center align-items "
      >
        <img src={thumpUp} alt="thumpUp" />
      </button>
      <Dialog
        open={open}
        onClose={toggleDialog}
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
            <input
              type="text"
              name="correct_translation"
              step="1"
              value={ratingParams.correct_translation}
              onChange={handleChange}
              className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={toggleDialog}>
            <img src={close} alt="close img" />
          </Button>
          <Button
            onClick={() => {
              submitData();
              setOpenNav(true);
              toggleDialog();
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
