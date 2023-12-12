// // ... (other imports)

// const TranslateForm = () => {
//   // ... (other state variables)

//   const submitFeedback = async () => {
//     const feedbackApiUrl = "YOUR_FEEDBACK_API_ENDPOINT"; // Replace with your actual feedback API endpoint

//     try {
//       const response = await axios.put(feedbackApiUrl, {
//         id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         rating: 5,
//         feedback: "string",
//         correct_translation: "string",
//         is_rated: true,
//       });

//       if (response.data && !response.data.error) {
//         // Handle successful response, if needed
//         console.log("Feedback submitted successfully");
//       } else {
//         console.error(
//           "Error occurred while submitting feedback:",
//           response.data.message
//         );
//         toast.error(
//           "Error occurred while submitting feedback: " + response.data.message
//         );
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast.error("An error occurred: " + error.message);
//     }
//   };

//   const textToSpeechTranslate = async () => {
//     const apiUrl =
//       "http://3.83.243.144/api/v1/translate-serverless/text-speech/unregistered-trial";

//     try {
//       const response = await axios.post(apiUrl, {
//         text: isText,
//       });

//       if (response.data && !response.data.error) {
//         const { message, data } = response.data;

//         if (data && data.url) {
//           const { url } = data;
//           console.log("data url", url);
//           setTranslatedAudioUrl(url);

//           // Call the function to submit feedback after translation
//           submitFeedback();
//         } else {
//           console.error(
//             "Error occurred while translating text to speech:",
//             message
//           );
//           toast.error(
//             "Error occurred while translating text to speech: " + message
//           );
//         }
//       } else {
//         console.error(
//           "Error occurred while processing the request:",
//           response.data.message
//         );
//         toast.error(
//           "Error occurred while processing the request: " +
//             response.data.message
//         );
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast.error("An error occurred: " + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ... (other functions)

//   return <div className="">{/* ... (other JSX) */}</div>;
// };

// export default TranslateForm;
