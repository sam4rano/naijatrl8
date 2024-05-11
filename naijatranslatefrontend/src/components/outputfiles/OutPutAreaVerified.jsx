import { BiSolidVolumeFull } from "react-icons/bi";
import OutputVerUser from "./OutputVerUser";
import Skeleton from "@mui/material/Skeleton";
import VerifiedRating from "../VerifiedRating";

import { useState } from "react";
import { BiXCircle } from "react-icons/bi";

import { IoClipboardOutline, IoShareSocialOutline } from "react-icons/io5";

const OutputAreaVerified = ({
  isLoading,
  target_text,
  textRef,
  handleTextToSpeechOutput,
  outputTranslateUrl,
  feedbackId,
  copyToClipboard,
  handleTargetTextChange,
  outputLoadingAudio,
}) => {
  return (
    <div className="flex flex-col sm:align-middle sm:items-center sm:gap-[10px] w-1/2 h-[400px] outline-none border-l-2 border-gray">
      {!isLoading && target_text && (
        <div className="sm:flex sm:flex-col sm:justify-center sm:align-middle">
          <textarea
            className="min-h-[300px] w-full p-[4px] border-none focus-within:bg-none outline-none"
            id="target_text"
            name="target_text"
            ref={textRef}
            value={target_text}
            onChange={handleTargetTextChange}
            placeholder="Translation will appear here..."
          />
          <div className="flex flex-row  justify-between items-center align-middle mx-auto gap-[40px] sm:flex-col sm:justify-center sm:items-center sm:gap-[10px]">
            <div className="flex flex-row align-middle justify-center items-center px-[8px] border-[1px] h-[30px] w-[120px] sm:w-[100px] bg-blue-100 mx-auto rounded-full text-primary text-center hover:bg-blue-200 cursor-pointer sm:text-[12px] sm:h-[25px]">
              <BiSolidVolumeFull size={20} />
              <button
                type="button"
                onClick={handleTextToSpeechOutput}
                disabled={outputLoadingAudio}
              >
                {outputLoadingAudio ? "Please wait" : "listen"}
              </button>
            </div>
            <div className="flex flex-row justify-center items-center gap-[10px]">
              <IoClipboardOutline
                size={20}
                onClick={copyToClipboard}
                className="cursor-pointer"
              />
              <VerifiedRating feedbackId={feedbackId} />
              <IoShareSocialOutline size={20} />
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute pl-[80px] sm:pl-[10px] w-[300px] sm:w-[100px] sm:h-[300px] pt-[40px] flex flex-col sm:gap-[30px]">
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[100px] sm:h-[40px] "
          />
          <Skeleton
            animation="wave"
            className="h-[40px] sm:w-[100px] sm:h-[40px] "
          />
          <Skeleton
            animation="wave"
            className="w-[200px] sm:w-[80px] sm:h-[50px] h-[40px]"
          />
        </div>
      )}

      {outputTranslateUrl && (
        <OutputVerUser outputTranslateUrl={outputTranslateUrl} />
      )}
    </div>
  );
};

export default OutputAreaVerified;
