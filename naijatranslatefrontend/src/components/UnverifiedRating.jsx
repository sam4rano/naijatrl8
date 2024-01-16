import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DialogTitle from "@mui/material/DialogTitle";
import { useRatingStoreUnverified, useOpenNavbar } from "../Stores/Stores";
import thumbUp from "../assets/Thumbup.svg";
import { useState } from "react";
import close from "../assets/close.svg";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";

export default function UnverifiedRating({feedbackData}) {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStoreUnverified();
  const { setOpenNav } = useOpenNavbar();



  const mutation = useMutation({
    mutationFn: (updatedRatings) => {
      return axios.put('http://3.83.243.144/api/v1/task/unregistered-trial/rate', updatedRatings)
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingParams({ ...ratingParams, [name]: value });
  };

  const submitData = () => {
    mutation.mutate({ ...ratingParams });
  };

  const toggleDialog = () => {
    setOpen(!open);
    setRatingParams({
      id:feedbackData,
      rating: 0,
      feedback: "",
      correct_translation: "",
     
    });
  };

  return (
    <>
      <button onClick={toggleDialog}>
        Feedback
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
