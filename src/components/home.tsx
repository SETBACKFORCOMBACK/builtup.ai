import React, { useState } from "react";
import IngredientInput from "./IngredientInput";
import RecipeGrid from "./RecipeGrid";
import RecipeDetail from "./RecipeDetail";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Refrigerator, ChefHat, Sparkles, ArrowRight } from "lucide-react";

interface HomeProps {
  isLoading?: boolean;
}

const Home = ({ isLoading = false }: HomeProps) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [showIngredientInput, setShowIngredientInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState<any[]>([]);

  const handleRecipesGenerated = (generatedRecipes: any[]) => {
    try {
      setLoading(true);
      const formattedRecipes = generatedRecipes.map((recipe, index) => ({
        id: String(index + 1),
        title: recipe.title,
        difficulty: recipe.difficulty,
        cookingTime: recipe.cookingTime,
        description: recipe.description,
        steps: recipe.steps || [
          "Preheat oven",
          "Prepare ingredients",
          "Mix ingredients together",
          "Cook according to instructions",
          "Serve and enjoy",
        ],
        image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.title)},food`,
      }));
      setRecipes(formattedRecipes);
      setShowIngredientInput(false);
    } catch (error) {
      console.error("Error processing recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  // Find the selected recipe
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Compact Hero Section */}
        {!showIngredientInput && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-6 mb-8"
            >
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="mb-2 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">
                    builtup.ai
                  </h1>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  <span className="text-primary">AI-Powered</span> Recipe
                  Generator
                </h2>
                <p className="text-base text-gray-600 max-w-md leading-relaxed">
                  Enter ingredients from your fridge and get instant recipe
                  suggestions
                </p>
                <Button
                  onClick={() => setShowIngredientInput(true)}
                  className="mt-4 px-6 py-6 text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"></span>
                  <span className="absolute -inset-px bg-gradient-to-r from-pink-500 to-orange-500 rounded-md blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 group-hover:animate-pulse"></span>
                  <span className="relative flex items-center">
                    <Refrigerator className="mr-3 h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />
                    <span className="relative z-10">Get Started</span>
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Get Started
                    </span>
                  </span>
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2134&auto=format&fit=crop"
                  alt="Food ingredients"
                  className="rounded-lg shadow-md w-full max-w-xs object-cover h-48 md:h-64"
                />
              </div>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                {
                  icon: <Refrigerator className="h-4 w-4" />,
                  text: "Enter Ingredients",
                },
                { icon: <Sparkles className="h-4 w-4" />, text: "AI Analysis" },
                { icon: <ChefHat className="h-4 w-4" />, text: "Get Recipes" },
                {
                  icon: <ArrowRight className="h-4 w-4" />,
                  text: "Start Cooking",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-sm"
                >
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {showIngredientInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <IngredientInput
                onRecipesGenerated={handleRecipesGenerated}
                isLoading={loading}
              />
            </motion.div>
          )}

          {!showIngredientInput && selectedRecipeId === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Detail Dialog */}
        {selectedRecipeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RecipeDetail
              recipe={selectedRecipe}
              isOpen={!!selectedRecipeId}
              onClose={() => {
                setSelectedRecipeId(null);
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
