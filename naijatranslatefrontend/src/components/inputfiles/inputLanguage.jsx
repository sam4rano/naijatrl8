// const InputLanguage = () => {
//   return (
//     <form>
//       <select className="text-primary px-lg h-[30px]">
//         <option value="English">English</option>
//         <option value="Yoruba">Yoruba</option>
//         <option value="Hausa">Hausa</option>
//         <option value="Igbo">Igbo</option>
//       </select>
//     </form>
//   );
// };

// export default InputLanguage;


import { useState } from "react";

// eslint-disable-next-line react/prop-types
const InputLanguage = ({ onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onSelectLanguage(language);
  };

  return (
    <form>
      <select
        className="text-primary px-lg h-[30px]"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="English">English</option>
        <option value="Yoruba">Yoruba</option>
        <option value="Hausa">Hausa</option>
        <option value="Igbo">Igbo</option>
      </select>
    </form>
  );
};

export default InputLanguage;





