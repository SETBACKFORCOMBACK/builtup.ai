import React, { useState, useEffect } from "react";
import IngredientInput from "./IngredientInput";
import RecipeGrid from "./RecipeGrid";
import RecipeDetail from "./RecipeDetail";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Refrigerator,
  ChefHat,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useAuth } from "./auth/AuthProvider";

interface HomeProps {
  isLoading?: boolean;
}

const Home = ({ isLoading = false }: HomeProps) => {
  const { user, signOut } = useAuth();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [showIngredientInput, setShowIngredientInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState<"main" | "favorites">(
    "main",
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);

  const [recipes, setRecipes] = useState<any[]>([]);

  // Load favorite recipes from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    if (savedFavorites) {
      try {
        setFavoriteRecipes(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorite recipes:", error);
      }
    }
  }, []);

  // Save favorite recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleRecipesGenerated = (generatedRecipes: any[]) => {
    try {
      setLoading(true);

      // Simulate a slightly longer loading time for better animation experience
      setTimeout(() => {
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
          nutrition: recipe.nutrition || {
            calories: "350 kcal",
            protein: "15 g",
            carbs: "40 g",
            fat: "12 g",
          },
          image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.title)},food`,
        }));
        setRecipes(formattedRecipes);
        setShowIngredientInput(false);
        setLoading(false);
      }, 1500); // Add a small delay for better animation experience
    } catch (error) {
      console.error("Error processing recipes:", error);
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  // Add a recipe to favorites
  const addToFavorites = (recipe: any) => {
    if (!favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id)) {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
  };

  // Remove a recipe from favorites
  const removeFromFavorites = (recipeId: string) => {
    setFavoriteRecipes(
      favoriteRecipes.filter((recipe) => recipe.id !== recipeId),
    );
  };

  // Check if a recipe is in favorites
  const isRecipeFavorite = (recipeId: string) => {
    return favoriteRecipes.some((recipe) => recipe.id === recipeId);
  };

  // Find the selected recipe from either regular recipes or favorites
  const selectedRecipe = [...recipes, ...favoriteRecipes].find(
    (recipe) => recipe.id === selectedRecipeId,
  );

  return (
    <div className="min-h-screen">
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
                <div className="mb-2 text-center flex justify-between items-center">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight relative group cursor-pointer transition-all duration-300 transform hover:scale-105">
                    <span className="relative inline-block">
                      <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 animate-gradient-x">
                        Fridge
                      </span>
                    </span>
                    <span className="relative inline-block">
                      <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 opacity-30 blur group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-gradient-x">
                        To
                      </span>
                    </span>
                    <span className="relative inline-block">
                      <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-30 blur group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 animate-gradient-x">
                        Plate
                      </span>
                    </span>
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  <span className="text-primary">AI-Powered</span> Recipe
                  Generator
                </h2>
                <p className="text-base text-gray-600 max-w-md leading-relaxed">
                  Enter ingredients from your fridge and get instant recipe
                  suggestions
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
                  <Button
                    onClick={() => setSelectedView("favorites")}
                    className="mt-4 px-6 py-6 text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group bg-gradient-to-r from-amber-500 to-orange-600"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"></span>
                    <span className="absolute -inset-px bg-gradient-to-r from-yellow-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 group-hover:animate-pulse"></span>
                    <span className="relative flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 transition-transform duration-500 group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="relative z-10">Favorite Recipes</span>
                    </span>
                  </Button>
                </div>
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
              {selectedView === "main" ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Recipe Suggestions
                    </h2>
                    {favoriteRecipes.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedView("favorites")}
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        View Favorites ({favoriteRecipes.length})
                      </Button>
                    )}
                  </div>
                  <RecipeGrid
                    recipes={recipes}
                    onRecipeClick={handleRecipeClick}
                  />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Favorite Recipes</h2>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedView("main")}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Suggestions
                    </Button>
                  </div>
                  {favoriteRecipes.length > 0 ? (
                    <RecipeGrid
                      recipes={favoriteRecipes}
                      onRecipeClick={handleRecipeClick}
                    />
                  ) : (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <p className="text-gray-500">No favorite recipes yet</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Save recipes you like to find them here
                      </p>
                      <Button
                        onClick={() => setSelectedView("main")}
                        className="mt-4"
                        variant="outline"
                      >
                        Browse Recipes
                      </Button>
                    </div>
                  )}
                </>
              )}
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
              isFavorite={isRecipeFavorite(selectedRecipeId)}
              onToggleFavorite={(isFavorite) => {
                if (isFavorite) {
                  removeFromFavorites(selectedRecipeId);
                } else {
                  addToFavorites(selectedRecipe);
                }
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
