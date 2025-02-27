import React, { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import RecipeGrid from "./RecipeGrid";
import RecipeDetail from "./RecipeDetail";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChefHat, Sparkles, ArrowRight } from "lucide-react";

interface HomeProps {
  isLoading?: boolean;
}

const Home = ({ isLoading = false }: HomeProps) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState<any[]>([]);

  const handlePhotoSelect = async (file: File, generatedRecipes?: any[]) => {
    try {
      setLoading(true);
      if (generatedRecipes) {
        const formattedRecipes = generatedRecipes.map((recipe, index) => ({
          id: String(index + 1),
          title: recipe.title,
          difficulty: recipe.difficulty,
          cookingTime: recipe.cookingTime,
          image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.title)},food`,
        }));
        setRecipes(formattedRecipes);
        setShowUploader(false);
      }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-8"
        >
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              <span className="text-primary">AI-Powered</span> Recipe Generator
            </h1>
            <p className="text-base text-gray-600 max-w-md leading-relaxed">
              Take a photo of your ingredients and get instant recipe
              suggestions
            </p>
            <Button onClick={() => setShowUploader(true)} className="mt-2">
              <Camera className="mr-2 h-4 w-4" />
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
            { icon: <Camera className="h-4 w-4" />, text: "Snap a Photo" },
            { icon: <Sparkles className="h-4 w-4" />, text: "AI Analysis" },
            { icon: <ChefHat className="h-4 w-4" />, text: "Get Recipes" },
            { icon: <ArrowRight className="h-4 w-4" />, text: "Start Cooking" },
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

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {showUploader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhotoUploader
                onPhotoSelect={handlePhotoSelect}
                isLoading={loading}
                defaultOpen={true}
              />
            </motion.div>
          )}

          {!showUploader && selectedRecipeId === null && (
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
