import axios from "axios";

/**
 * Translates the given content into a target language using the Google Translation API.
 * @param {string} content - The text to be translated.
 * @param {string} targetLanguage - The language code of the target language (e.g., "es" for Spanish).
 * @returns {Promise<Object>} - The translated content as received from the API.
 * @throws Will throw an error if the API call fails.
 */
export async function translateContent(content, targetLanguage) {
  const BASE_URL = "https://translation.googleapis.com/language/translate/v2";
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY_TRANSLATE; // API key from environment variables for security.

  try {
    const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
      q: content,
      target: targetLanguage,
    });
    console.log(response.data); // Log the response data for debugging.
    return response.data; // Return the translated data.
  } catch (error) {
    console.error("Error calling Translation API:", error); // Log general error details.
    if (error.response) {
      console.error("Response error:", error.response.data); // Log specific response errors if available.
    }
    throw error; // Propagate the error for handling by the caller.
  }
}

/**
 * Generates text based on a prompt using the Gemini API.
 * @param {string} promptText - The input text or prompt for generating content.
 * @returns {Promise<Object>} - The generated content as received from the API.
 * @throws Will throw an error if the API call fails or if the response is not OK.
 */
export const generateText = async (promptText) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // API key from environment variables for security.
  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST", // API requires a POST request.
      headers: {
        "Content-Type": "application/json", // Content type is JSON.
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }], // Format required by the API.
      }),
    });

    if (!response.ok) {
      // Check if the response status is not successful.
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}` // Throw an error with status details.
      );
    }

    const data = await response.json(); // Parse the response JSON.
    return data; // Return the parsed data.
  } catch (error) {
    console.error("Error calling Gemini API:", error); // Log the error details.
    throw error; // Propagate the error for handling by the caller.
  }
};

// export async function rewriteContent(content) {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}:rewrite?key=${API_KEY}`, // Замените endpoint на реальный
//       {
//         contents: [{ parts: [{ text: content }] }],
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error calling Rewrite API:", error);
//     throw error;
//   }
// }

// export async function createPrompt(promptText) {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}:generateContent?key=${API_KEY}`,
//       {
//         contents: [{ parts: [{ text: promptText }] }],
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error calling Prompt API:", error);
//     throw error;
//   }
// }

// export async function summarizeContent(content) {
//   const BASE_URL =
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest";
//   const API_KEY =

//   console.log(content)
//   try {
//     const response = await axios.post(
//       `${BASE_URL}:summarize?key=${API_KEY}`, // Замените endpoint на реальный
//       {
//         contents: [{ parts: [{ text: content }] }],
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error calling Summarization API:", error);
//     throw error;
//   }
// }
