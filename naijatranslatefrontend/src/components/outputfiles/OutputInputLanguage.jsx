import { HiArrowsRightLeft } from "react-icons/hi2";

const OutputInputLanguage = ({
  source_language,
  setSourceLanguage,
  target_language,
  setTargetLanguage,
}) => {
  return (
    <div className="flex flex-row w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
      <div className="flex flex-row w-1/2 justify-center bg-white outline-none">
        <select
          className="text-primary outline-none cursor-pointer"
          id="input_language"
          name="input_language"
          value={source_language}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="yor">Yoruba</option>
          <option value="pcm">Pidgin</option>
        </select>
      </div>
      <HiArrowsRightLeft size={30} />
      
      <div className="flex flex-row w-1/2 pl-[100px] sm:pl-[20px] bg-white outline-none h-auto">
        <select
          className="text-primary outline-none cursor-pointer"
          id="output_language"
          name="output_language"
          value={target_language}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="yor">Yoruba</option>
          <option value="pcm">Pidgin</option>
        </select>
      </div>
    </div>
  );
};

export default OutputInputLanguage;
