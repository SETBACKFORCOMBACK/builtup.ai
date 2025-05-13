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
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    "nutrition": {
      "calories": "XXX kcal",
      "protein": "XX g",
      "carbs": "XX g",
      "fat": "XX g"
    }
  }
]
Ensure the response is valid JSON.
IMPORTANT: You MUST include at least 5 detailed step-by-step cooking instructions in the "steps" field for EACH recipe. Also, you MUST include nutritional information for EACH recipe. This is critical for user experience.`,
      imagePart,
    ]);

    const response = await result.response;
    let text = response.text();
    console.log("Raw Gemini Response:", text);

    // Clean up the response to ensure valid JSON
    text = text.replace(/```json\n?|```/g, "").trim();

    try {
      const recipes = JSON.parse(text);
      console.log("Parsed Recipes:", recipes); // Debugging step
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
          nutrition: {
            calories: "350 kcal",
            protein: "15 g",
            carbs: "40 g",
            fat: "12 g",
          },
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
      `I have these ingredients: ${ingredientsList}.

Suggest 4 recipes with:
- Title
- Difficulty level (Easy/Medium/Hard)
- Cooking time
- Short description
- **Step-by-step cooking instructions** (MANDATORY) in an array format.
- **Nutritional information** (MANDATORY) including calories, proteins (g), carbohydrates (g), and fats (g) per serving.

Return **ONLY JSON**, using this format:
[
  {
    "title": "Recipe Name",
    "difficulty": "Easy/Medium/Hard",
    "cookingTime": "XX mins",
    "description": "Brief description",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    "nutrition": {
      "calories": "XXX kcal",
      "protein": "XX g",
      "carbs": "XX g",
      "fat": "XX g"
    }
  }
]
IMPORTANT: You MUST include at least 5 detailed step-by-step cooking instructions in the "steps" field for EACH recipe. Also, you MUST include nutritional information for EACH recipe. This is critical for user experience.`,
    );

    const response = await result.response;
    let text = response.text();
    console.log("Raw Gemini Response:", text);

    // Clean up the response to ensure valid JSON
    text = text.replace(/```json\n?|```/g, "").trim();

    try {
      const recipes = JSON.parse(text);
      console.log("Parsed Recipes:", recipes); // Debugging step
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
          nutrition: {
            calories: "350 kcal",
            protein: "15 g",
            carbs: "40 g",
            fat: "12 g",
          },
        },
      ];
    }
  } catch (error) {
    console.error("Error generating recipes from ingredients:", error);
    throw error;
  }
}
