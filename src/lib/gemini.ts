import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export async function generateRecipesFromIngredients(ingredients: string[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const ingredientsList = ingredients.join(", ");

    // ✅ New Prompt with Cooking Steps
    const result = await model.generateContent(
      `I have these ingredients: ${ingredientsList}.
      Suggest 4 recipes with step-by-step instructions.
      Assume I have basic pantry items like salt, oil, and pepper.

      Respond in this JSON format:
      [
        {
          "title": "Recipe Name",
          "difficulty": "Easy/Medium/Hard",
          "cookingTime": "XX mins",
          "description": "Short Description",
          "steps": [
            "Step 1: ...",
            "Step 2: ...",
            "Step 3: ..."
          ]
        }
      ]
      Ensure the response is valid JSON with at least 4 steps for each recipe.`,
    );

    const response = await result.response;
    let text = response.text();
    console.log("Raw Gemini Response:", text);

    // 🧠 Clean the Response
    text = text.replace(/```json\n?|```/g, "").trim();

    try {
      const recipes = JSON.parse(text);
      if (!Array.isArray(recipes)) {
        throw new Error("Response is not an array");
      }
      return recipes.map((recipe) => ({
        title: recipe.title,
        difficulty: recipe.difficulty,
        cookingTime: recipe.cookingTime,
        description: recipe.description,
        steps: recipe.steps || [],
      }));
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
}
