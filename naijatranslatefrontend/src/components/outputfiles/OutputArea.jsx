import Skeleton from "@mui/material/Skeleton";

const OutputArea = ({ isLoading, target_text, textRef }) => {
  return (
    <div>
      {isLoading ? (
        <div className="h-[300px] active:border-none p-[12px] outline-none">
          <div className="absolute pl-[80px] sm:pl-[50px] w-[300px] sm:w-[80px] sm:h-[80px] pt-[100px] flex flex-col">
            <Skeleton
              animation="wave"
              className="h-[40px] sm:w-[80px] sm:h-[80px] "
            />
            <Skeleton
              animation="wave"
              className="h-[40px] sm:w-[80px] sm:h-[80px] "
            />
            <Skeleton
              animation="wave"
              className="w-[200px] sm:w-[80px] sm:h-[80px] h-[40px]"
            />
          </div>
        </div>
      ) : (
        <textarea
          className="h-[330px] w-full p-4 border-none outline-none"
          id="target_text"
          name="target_text"
          ref={textRef}
          value={target_text}
        />
      )}
    </div>
  );
};

export default OutputArea;
