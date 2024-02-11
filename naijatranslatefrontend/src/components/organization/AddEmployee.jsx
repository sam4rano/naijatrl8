import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { HiOutlineX } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../api/SpeechApi";
import { toast } from "react-toastify";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",

  boxShadow: 24,
  p: 1,
};

export default function AddEmployee() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      try {
        const commonHeaders = await getCommonHeaders();
        const response = await axios.post(
          `${baseURL}/organization/add-user`,
          formData,
          {
            headers: commonHeaders,
          }
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutate();
      toast.success("User added successfully!");
    } catch (error) {
      toast.error("Error submitting data: " + error.message);
    }
  };

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
    <div>
      <div className="text-[14px] border-dashed min-w-[200px] h-[70px] border-2 border-slate-500 flex justify-center align-middle items-center rounded-lg hover:bg-blue-100 font-normal text-center  p-[10px]  mr-[5px]">
        <button className="" onClick={handleOpen}>
          Add Employee
        </button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form
            style={style}
            onSubmit={handleSubmit}
            className="bg-white p-[20px] rounded-lg gap-[20px]"
          >
            <div
              className="flex justify-end align-top cursor-pointer"
              onClick={handleClose}
            >
              <HiOutlineX />
            </div>
            <label>
              First Name
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="first name"
                className="placeholder:p-md appearance-none outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
              />
            </label>

            <label>
              Last Name
              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="last name"
                className="placeholder:p-md appearance-none outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="employee email"
                className="placeholder:p-md appearance-none outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="placeholder:p-md appearance-none outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
              />
            </label>
            <button className="bg-blue-400 w-full text-white text-[16px] text-center leading-20px font-semibold p-[5px] hover:bg-blue-300 my-[5px] rounded-lg">
              {isSuccess ? "Employee Added!" : "Add Employee"}
            </button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
