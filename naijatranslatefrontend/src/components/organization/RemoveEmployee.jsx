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

const RemoveEmployee = () => {
  const [open, setOpen] = React.useState(false);
  const [removeType, setRemoveType] = useState("email");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    email: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: async () => {
      try {
        const commonHeaders = await getCommonHeaders();
        let endpoint = "";

        if (removeType === "email") {
          endpoint = `${baseURL}/organization/remove-user/${formData.email}`;
        } else if (removeType === "id") {
          endpoint = `${baseURL}/organization/remove-user/${formData.id}`;
        }

        const response = await axios.delete(endpoint, {
          headers: commonHeaders,
        });

        return response.data;
      } catch (error) {
        toast.error(error.response?.data);
        throw error;
      }
    },
    mutationKey: "remove_user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutate();
      if (isSuccess) {
        handleClose();
        toast.success("User removed successfully!");
      }

      if (isError) {
        toast.error("User does not exist!");
      }
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
      toast.error("Error in getCommonHeaders:", error);
      throw error;
    }
  };

  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      return accessToken || "unauthenticated user";
    } catch (error) {
      toast.error("Response data:", error.response?.data);
      toast.error("Error submitting data: " + error.message);
      return "unauthenticated user";
    }
  };
  return (
    <div>
      <div className="text-[14px] border-dashed min-w-[200px] h-[70px] border-2 border-slate-500 flex justify-center align-middle items-center rounded-lg hover:bg-blue-100 font-normal text-center  p-[10px]  mr-[5px]">
        <button className="" onClick={handleOpen}>
          Remove Employee
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
            className="bg-white p-[20px] rounded-lg gap-[20px] "
          >
            <div
              className="flex justify-end align-top cursor-pointer"
              onClick={handleClose}
            >
              <HiOutlineX />
            </div>
            <div className="flex flex-col gap-[5px] pb-[5px]">
              <label className="text-[16px] font-medium text-dark p-[10px] ">
                Remove Employee by
              </label>
              <select
                value={removeType}
                className="placeholder:p-md outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none"
                onChange={(e) => setRemoveType(e.target.value)}
              >
                <option value="email">Email</option>
                <option value="id">ID</option>
              </select>
            </div>
            <div className="py-[10px]">
              {removeType === "email" && (
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
              )}

              {removeType === "id" && (
                <label>
                  ID
                  <input
                    name="id"
                    type="text"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="employee ID"
                    className="placeholder:p-md appearance-none outline-none flex  h-[30px] border rounded-lg px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
                  />
                </label>
              )}
            </div>

            <button className="bg-blue-400 w-full text-white text-[16px] text-center leading-20px font-semibold p-[5px] hover:bg-blue-300 my-[5px] rounded-lg">
              {isSuccess ? "Employee Removed" : "Remove Employee"}
            </button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default RemoveEmployee;
