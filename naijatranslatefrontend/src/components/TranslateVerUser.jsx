import { useState } from "react";

const TranslateVerUser = () => {
  const [source_language, setSource_language] = useState('');
  const [target_language, setTarget_language] = useState('');
  const [source_text, setSource_text] = useState('');
  const [target_text, setTarget_text] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://3.83.243.144/api/v1/translate/unregistered-trial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_language,
        target_language,
        source_text,
        target_text
      }),
    });
    if (response.ok) {


    const responseData = await response.json();
    const { target_text } = responseData.data;
    setTarget_text(target_text); 
    } else {
      console.log('Error');
      const data = await response.json();
      console.log(data);

    }
    
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[1000px] mx-auto"
    >
      <div className="flex flex-row bg-orange-200 w-full border-2 border-dark">
      <div className="flex flex-row w-1/2">
          
          <select
            id="input_language"
            name="input_language"
            value={source_language}
            onChange={(e) => setSource_language(e.target.value)}
          >
            <option value="en">English</option>
            <option value="yor">Yoruba</option>
            <option value="pcm">Pidgin</option>
            
          </select>
        </div>
        <div className="flex flex-row w-1/2">
          
          <select
            id="output_language"
            name="output_language"
            value={target_language}
            onChange={(e) => setTarget_language(e.target.value)}
          >
            <option value="en">English</option>
            <option value="yor">Yoruba</option>
            <option value="pcm">Pidgin</option>
           
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full border-2 border-dark h-[400px]">
        <div className="flex flex-col w-1/2 h-[400px]">
          <label htmlFor="source_text">Source Text:</label>
          <div
            className="h-[400px] border-2 border-dark"
            contentEditable
            id="source_text"
            name="source_text"
            value={source_text}
            onBlur={(e) => setSource_text(e.target.textContent)}
            suppressContentEditableWarning={true}
          >
            {source_text}
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-[400px] border-2 border-dark">
          <label htmlFor="output_text">Output Text:</label>
          <div
            className="h-[400px] border-2 border-dark"
            contentEditable
            id="target_text"
            name="target_text"
            value={target_text}
            // onChange={(e) => setTarget_text(e.target.value)}
            // onInput={(e) => setTarget_text(e.target.textContent)}
            onBlur={(e) => setTarget_text(e.target.textContent)}
          >
            {target_text}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="text-white h-6 mt-4 p-[8px] mx-auto rounded-md bg-primary"
      >
        Translate
      </button>
    </form>
  );
};

export default TranslateVerUser;