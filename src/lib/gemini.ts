import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export async function analyzeImageForRecipes(imageBase64: string) {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(",")[1];

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    "description": "Brief description",
    "steps": ["Step 1", "Step 2", "Step 3"]
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
          steps: ["Step 1", "Step 2", "Step 3"],
        },
      ];
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

export async function generateRecipesFromIngredients(ingredients: string[]) {
  try {
    // Initialize the model (using text-only model)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format the ingredients list
    const ingredientsList = ingredients.join(", ");

    // Generate content with explicit JSON format request
    const result = await model.generateContent(
      `I have these ingredients in my refrigerator: ${ingredientsList}.

Suggest 4 possible recipes that can be made with these ingredients. You can assume I have basic pantry staples like salt, pepper, oil, etc.

Provide the response in the following JSON format:
[
  {
    "title": "Recipe Name",
    "difficulty": "Easy/Medium/Hard",
    "cookingTime": "XX mins",
    "description": "Brief description",
    "steps": ["Step 1", "Step 2", "Step 3"]
  }
]
Ensure the response is valid JSON.`,
    );

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
          steps: ["Step 1", "Step 2", "Step 3"],
        },
      ];
    }
  } catch (error) {
    console.error("Error generating recipes from ingredients:", error);
    throw error;
  }
}
