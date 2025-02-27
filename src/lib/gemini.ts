import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export async function analyzeImageForRecipes(imageBase64: string) {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(",")[1];

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Create image part
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    // Generate content with explicit JSON format request
    const result = await model.generateContent([
      `Analyze this image and suggest 4 possible recipes that can be made with the visible ingredients.
Provide the response in the following JSON format:
[
  {
    "title": "Recipe Name",
    "difficulty": "Easy/Medium/Hard",
    "cookingTime": "XX mins",
    "description": "Brief description"
  }
]
Ensure the response is valid JSON.`,
      imagePart,
    ]);

    const response = await result.response;
    let text = response.text();
    console.log("Raw Gemini Response:", text);

    // Clean up the response to ensure valid JSON
    text = text.replace(/```json\n?|```/g, "").trim();

    try {
      const recipes = JSON.parse(text);
      if (!Array.isArray(recipes)) {
        throw new Error("Response is not an array");
      }
      return recipes;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return [
        {
          title: "Quick Meal",
          difficulty: "Easy",
          cookingTime: "20 mins",
          description: "A simple recipe using available ingredients",
        },
      ];
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
