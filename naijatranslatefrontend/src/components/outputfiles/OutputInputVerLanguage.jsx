import { HiArrowsRightLeft } from "react-icons/hi2";

const OutputInputVerLanguage = ({
  source_language,
  setSourceLanguage,
  target_language,
  setTargetLanguage,
}) => {
  const toggleLanguages = () => {
    const newTargetLanguage = source_language;
    const newSourceLanguage = target_language;
    setSourceLanguage(newSourceLanguage);
    setTargetLanguage(newTargetLanguage);
  };

  return (
    <div className="flex flex-row w-full p-[5px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
      <div className="flex flex-row w-1/2 justify-center bg-white outline-none">
        <select
          className="text-primary outline-none cursor-pointer"
          id="source_language"
          name="source_language"
          value={source_language}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="yor">Yoruba</option>
          <option value="pcm">Pidgin</option>
        </select>
      </div>
      <HiArrowsRightLeft
        onClick={toggleLanguages}
        className="cursor-pointer w-[40px] h-[40px] rounded-full text-primary hover:bg-blue-100 p-[10px]"
      />

      <div className="flex flex-row w-1/2 pl-[100px] sm:pl-[20px] bg-white outline-none h-auto">
        <select
          className="text-primary outline-none cursor-pointer"
          id="target_language"
          name="target_language"
          value={target_language}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="pcm">Pidgin</option>
          <option value="en">English</option>
          <option value="yor">Yoruba</option>
        </select>
      </div>
    </div>
  );
};

export default OutputInputVerLanguage;
