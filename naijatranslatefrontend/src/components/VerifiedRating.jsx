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
import { useMutation } from '@tanstack/react-query';
import axios from "axios";

export default function VerifiedRating({ feedbackId }) {
  const [open, setOpen] = useState(false);
  const { ratingParams, setRatingParams } = useRatingStore();
  const { setOpenNav } = useOpenNavbar();


  const mutation = useMutation({
    mutationFn: (updatedRatings) => {
      return axios.put('http://3.83.243.144/api/v1/task/unregistered-trial/rate', updatedRatings, {
        headers: getCommonHeaders(), // Include the headers here
      })
    },
    onError: (error) => {
      // Handle error here
      console.error("Error during mutation:", error);
      toast.error("Error submitting data: " + error.message);
    },
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingParams({ ...ratingParams, [name]: value });
  };

  const submitData = async () => {
    try {
      const result = await mutation.mutateAsync({ ...ratingParams });

      if (result) {
        setOpenNav(true);
        handleClose();
        toast.success("Data submitted successfully");
      } else {
        // Handle the case where the mutation was not successful
        toast.error("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error during mutation:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);
      toast.error(error.message);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRatingParams({
      id: feedbackId,
      rating: 0,
      feedback: " ",
      correct_translation: "",
    });
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
      const accessToken = await Cookies.get("access_token");
      console.log("Access token: " + accessToken)
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
      <button onClick={handleClickOpen}>Feedback</button>
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
    </React.Fragment>
  );
}
