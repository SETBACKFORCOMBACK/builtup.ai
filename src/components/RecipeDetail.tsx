import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";

interface RecipeDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  recipeId?: string;
}

const RecipeDetail = ({
  isOpen = false,
  onClose = () => {},
  recipeId = "1",
}: RecipeDetailProps) => {
  // Get recipe data based on recipeId
  // Find the recipe based on recipeId
  const recipe = {
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    difficulty: "Medium",
    cookingTime: "30 mins",
    servings: 4,
    ingredients: [
      "200g spaghetti",
      "100g pancetta or bacon, diced",
      "2 large eggs",
      "50g pecorino cheese, grated",
      "50g parmesan, grated",
      "2 garlic cloves, minced",
      "Salt and black pepper to taste",
    ],
    instructions: [
      "Cook the spaghetti in salted water according to package instructions until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.",
      "In a bowl, whisk together the eggs, grated cheeses, and black pepper.",
      "Drain the pasta, reserving about 1/2 cup of the pasta water.",
      "Working quickly, add the hot pasta to the skillet with the pancetta, remove from heat.",
      "Pour the egg and cheese mixture over the pasta, stirring quickly to create a creamy sauce.",
      "Add a splash of the reserved pasta water if needed to loosen the sauce.",
      "Serve immediately with extra grated cheese and black pepper.",
    ],
  };

  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }[recipe.difficulty];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {recipe.title}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 pb-4">
          <div className="space-y-6">
            {/* Recipe Image */}
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Recipe Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-gray-500" />
                <Badge className={difficultyColor}>{recipe.difficulty}</Badge>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="list-decimal pl-5 space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Save Recipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
