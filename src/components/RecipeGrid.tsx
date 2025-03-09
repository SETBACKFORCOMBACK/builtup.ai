import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface RecipeGridProps {
  recipes?: any[];
  onRecipeClick?: (recipeId: string) => void;
}

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-[#ff3b00]">{recipe.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{recipe.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-sm">{recipe.difficulty}</span>
            <span className="text-sm text-black">{recipe.cookingTime}</span>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Recipe
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
