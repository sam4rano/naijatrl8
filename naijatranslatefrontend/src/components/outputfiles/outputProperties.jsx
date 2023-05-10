import { Copy, Share, Outspeaker, Thumbup, Thumbdown } from "../../icons/index";

const OutputProperties = () => {
  return (
    <div className="flex flex-row justify-between ">
      <div className="flex flex-row mt-[10px] justify-around outline outline-offset-0  rounded-full px-md ml-[5px] h-[30px] outline-1 ">
        <Outspeaker width={"43px"} height={"43px"} />

        <h1 className="pt-[5px]">Speak</h1>
      </div>
      <div className="flex flex-row ">
        <Copy />
        <Thumbup />
        <Thumbdown />
        <Share />
      </div>
    </div>
  );
};

export default OutputProperties;
