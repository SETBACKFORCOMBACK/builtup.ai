import React, { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import RecipeGrid from "./RecipeGrid";
import RecipeDetail from "./RecipeDetail";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChefHat, Sparkles } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Turn Your Fridge Into
            <span className="text-primary block mt-2">Delicious Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take a photo of your ingredients and let AI suggest amazing recipes
            you can make right now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => setShowUploader(true)}
            >
              <Camera className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <Camera className="h-6 w-6" />,
                title: "Snap a Photo",
                description: "Take a quick photo of your fridge or ingredients",
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "AI Magic",
                description: "Our AI analyzes your ingredients instantly",
              },
              {
                icon: <ChefHat className="h-6 w-6" />,
                title: "Get Recipes",
                description: "Receive personalized recipe suggestions",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {showUploader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
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
