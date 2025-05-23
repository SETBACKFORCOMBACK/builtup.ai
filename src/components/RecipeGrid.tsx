import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface RecipeGridProps {
  recipes?: any[];
  onRecipeClick?: (recipeId: string) => void;
}

import { motion } from "framer-motion";

export default function RecipeGrid({
  recipes = [],
  onRecipeClick,
}: RecipeGridProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No recipes available yet
      </div>
    );
  }

  // Animation variants for staggered recipe cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {recipes.map((recipe, index) => (
        <motion.div
          key={index}
          variants={item}
          className="border rounded-lg p-4 shadow-md glass-card hover:shadow-lg transition"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-xl font-bold text-white">{recipe.title}</h2>
          <p className="text-sm text-white mb-2">{recipe.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">{recipe.difficulty}</span>
            <span className="text-sm text-white">{recipe.cookingTime}</span>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
              className="w-full bg-black hover:bg-gray-800 text-white group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center">
                <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                View Recipe
              </span>
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
