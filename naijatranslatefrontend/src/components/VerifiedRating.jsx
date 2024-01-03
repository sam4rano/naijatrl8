import { FaStar } from "react-icons/fa";
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
import thumbUp from "../assets/Thumbup.svg";
import { useState } from "react";
import close from "../assets/close.svg";
import { useMutation } from "react-query";
import axios from "axios";

export default function VerifiedRating() {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStore();
  const { setOpenNav } = useOpenNavbar();

  const mutation = useMutation(
    (updatedRatings) =>
      axios.put(
        "http://3.83.243.144/api/v1/task/unregistered-trial/rate",
        updatedRatings,
        {
          headers: getCommonHeaders(), // Include the headers here
        }
      ),
    {
      onError: (error) => {
        // Handle error here
        console.error("Error during mutation:", error);
        toast.error("Error submitting data: " + error.message);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingParams({ ...ratingParams, [name]: value });
  };

  const submitData = () => {
    mutation.mutate({ ...ratingParams, is_rated: true });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRatingParams({
      id: "",
      rating: 0,
      feedback: "",
      correct_translation: "",
      is_rated: false,
    });
  };

  const getCommonHeaders = () => {
    // Fetch access token and return headers
    const accessToken = getAccessTokenFromCookie();
    return {
      "Content-Type": "application/json",
      Authorization: `JWT ${accessToken}`,
    };
  };

  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = await Cookies.get("access_token");
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
    <React.Fragment>
      <button onClick={handleClickOpen}>
        <img src={thumbUp} alt="thump up" className="w-[30px] h-[30px]" />
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
            />
          </label>
          <br />
          <label>
            Feedback:
            <textarea
              name="feedback"
              value={ratingParams.feedback}
              onChange={handleChange}
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
    </React.Fragment>
  );
}
