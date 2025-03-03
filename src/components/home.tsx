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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  <span className="text-primary">AI-Powered</span> Recipe
                  Generator
                </h1>
                <p className="text-base text-gray-600 max-w-md leading-relaxed">
                  Enter ingredients from your fridge and get instant recipe
                  suggestions
                </p>
                <Button
                  onClick={() => setShowIngredientInput(true)}
                  className="mt-2"
                >
                  <Refrigerator className="mr-2 h-4 w-4" />
                  Get Started
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
          <RecipeDetail
            isOpen={!!selectedRecipeId}
            onClose={() => setSelectedRecipeId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
