<form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[1000px] md:w-[400px] sm:w-[360px] sm:p-[10px] mx-auto p-[40px]"
      >
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
          <img
            src={changeIcon}
            alt="change icon"
            className="w-[30px] h-[30px] sm:h-[25px] sm:w-[25px]"
          />
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
        <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px] rounded-bl-[16px] rounded-br-[16px]">
          <div className="relative flex flex-col w-1/2 h-[400px]">
            {/* Conditional rendering for clipboard or speaker image and text */}
            {inputType === "text" && source_text.length === 0 && !isText && (
              <div className="absolute top-0 left-0 pl-[180px] sm:pl-[40px] pt-[90px] flex flex-col items-center justify-center w-full h-full z-10 pointer-events-none">
                <img
                  src={ClipBoard}
                  alt="clipboard"
                  className="w-[100px] sm:w-[80px] sm:h-[80px]"
                />
                <p className="text-center text-[12px] sm:text-[10px] sm:leading-[16px]">
                  Paste your text here
                </p>
              </div>
            )}

            {inputType === "speech" && source_text.length === 0 && (
              <div className="absolute top-0 left-0 pl-[190px] sm:pl-[40px] pt-[90px] flex flex-col items-center justify-center w-full h-full z-10 pointer-events-none">
                <img
                  src={Inspeaker}
                  alt="speak_img"
                  className="w-[80px] sm:h-[80px]"
                />
              </div>
            )}

            {/* Textarea for input */}
            <textarea
              className="w-full h-full p-[4px] focus:outline-none resize-none z-0"
              id={inputType === "speech" ? "speech_text" : "source_text"}
              name={inputType === "speech" ? "speech_text" : "source_text"}
              value={inputType === "speech" ? isText : source_text}
              onChange={(e) =>
                inputType === "speech"
                  ? setIsText(e.target.value)
                  : setSourceText(e.target.value)
              }
              placeholder={
                inputType === "speech" ? "Start speaking..." : "Enter text..."
              }
            ></textarea>

            <button
              type="submit"
              className="px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Please wait" : "Translate"}
            </button>
          </div>

          <div className="relative flex flex-col w-1/2 h-[400px] border-l-2 border-gray-300 pb-[10px]">
            {/* Conditional rendering based on outputType and whether there's any target_text */}
            {outputType === "text" && target_text.length === 0 && (
              <div className="absolute top-0 left-0 pl-[80px] sm:pl-[50px] pt-[100px] flex flex-col items-center justify-center w-full h-full z-10 pointer-events-none">
                <Skeleton variant="text" className="h-10 w-3/4 sm:w-1/4" />
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="h-10 w-3/4 sm:w-1/4"
                />
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  className="h-10 w-3/4 sm:w-1/4"
                />
              </div>
            )}
            {outputType === "speech" && !translatedAudioUrl && (
              <div className="absolute top-0 left-0 pl-[40px] pt-[90px] flex flex-col items-center justify-center w-full h-full z-10 pointer-events-none">
                <img
                  src={Outspeaker}
                  alt="speak_img"
                  className="w-[80px] sm:w-[80px] sm:h-[80px]"
                />
              </div>
            )}

            {/* Textarea for displaying output text */}
            <textarea
              className="w-full h-full p-[8px] focus:outline-none resize-none z-0"
              id="target_text"
              name="target_text"
              value={target_text}
              readOnly // Making textarea read-only since it's for output
            ></textarea>

            {/* OutputProperties for additional output details */}
            <OutputProperties
              translatedAudioUrl={translatedAudioUrl}
              outputType={outputType}
              feedbackData={feedbackData}
            />
          </div>
        </div>
        <ToastContainer />
      </form>


const handleSubmitAdmin = async (e) => {
  e.preventDefault();

  const checkedFormData = {
    name: orgName,
    address: orgAddress,
    city: orgCity,
    state: orgState,
    email: orgEmail,
    password: orgPwd,
    confirm_password: orgConfirmPwd,
  };

  try {
    const response = await fetch(`${baseURL}/organization/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkedFormData),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess(true);
      console.log(data);
      toast.success(data.success);
      navigate("/checkinbox");
    } else {
      const data = await response.json();
      toast.error(data);
    }
  } catch (error) {
    console.log("An error occurred:", error);
    toast.error(error.message);
  }
};