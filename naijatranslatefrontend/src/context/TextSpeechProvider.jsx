import { createContext, useContext, useState } from "react"

const SpeechContext = createContext();

const TextSpeechProvider = () => {
	const [speechData, setSpeechData] = useState('');
	
  return (
	<SpeechContext.Provider value={{ speechData, setSpeechData }}>TextSpeechProvider</SpeechContext.Provider>
  )
}

export default TextSpeechProvider;