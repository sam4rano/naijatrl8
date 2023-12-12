import outspeaker from "../../assets/Outspeaker.svg";
import thumbup from "../../assets/Thumbup.svg";
import thumbdown from "../../assets/Thumbdown.svg";
import Close from "../../assets/close.svg";
import share from "../../assets/Share.svg";
import copy from "../../assets/Copy.svg";
import { useState, useRef } from "react";

const OutputProperties = ({ translatedAudioUrl, outputType }) => {
  const [openAudio, setOpenAudio] = useState(false);

  const toggleAudio = () => {
    setOpenAudio(!openAudio);
  };

  return (
    <div className="flex flex-row justify-between px-[10px]">
      {outputType === "speech" && (
        <div
          className="flex flex-row justify-around rounded-full px-sm h-[30px] border-[1px] border-outline cursor-pointer"
          onClick={toggleAudio}
        >
          <img
            src={outspeaker}
            className="w-[30px] h-[30px]"
            alt="outspeaker"
          />
          <h1 className="pt-[3px]">Listen</h1>
        </div>
      )}

      <div className="flex flex-row justify-around">
        <img src={copy} className="w-[30px] h-[30px]" alt="copy" />
        <img src={thumbup} alt="thumbup" className="w-[30px] h-[30px]" />
        <img src={thumbdown} alt="thumbdown" className="w-[30px] h-[30px]" />
        <img src={share} alt="share" className="w-[30px] h-[30px]" />
      </div>
      {openAudio && (
        <div className="flex justify-center flex-col align-middle mx-auto">
          <div
            onClick={toggleAudio}
            className="flex flex-row  justify-end cursor-pointer"
          >
            <img src={Close} alt="close image" />
          </div>
          <audio
            src={translatedAudioUrl}
            controls
            className="h-[40px] w-[200px]"
          />
        </div>
      )}
    </div>
  );
};

export default OutputProperties;

// import outspeaker from "../../assets/Outspeaker.svg";
// import thumbup from "../../assets/Thumbup.svg";
// import thumbdown from "../../assets/Thumbdown.svg";
// import share from "../../assets/Share.svg";
// import copy from "../../assets/Copy.svg";
// import { useState, useRef } from "react";

// const OutputProperties = ({ translatedAudioUrl }) => {

//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const togglePlay = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="flex flex-row justify-between px-[10px]">
//       <div className="flex flex-row justify-around rounded-full px-sm h-[30px] border-[1px] border-outline">
//         <img src={outspeaker} className="w-[30px] h-[30px]" alt="outspeaker" />

//         <h1 className="pt-[3px]" onClick={togglePlay}>Listen</h1>
//       </div>
//       <div className="flex flex-row justify-around">
//         <img src={copy} className="w-[30px] h-[30px]" alt="copy" />
//         <img src={thumbup} alt="thumbup" className="w-[30px] h-[30px]" />
//         <img src={thumbdown} alt="thumbdown" className="w-[30px] h-[30px]" />
//         <img src={share} alt="share" className="w-[30px] h-[30px]" />
//       </div>
//       <audio ref={audioRef} src={translatedAudioUrl} />
//     </div>
//   );
// };

// export default OutputProperties;
