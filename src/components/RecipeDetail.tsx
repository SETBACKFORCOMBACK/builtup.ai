import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, ChefHat, Users, Heart, Share2, Printer } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface RecipeDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  recipe?: {
    title: string;
    image: string;
    difficulty: "Easy" | "Medium" | "Hard";
    cookingTime: string;
    servings: number;
    ingredients: string[];
    instructions: string[];
  };
}

const RecipeDetail = ({
  isOpen = true,
  onClose = () => {},
  recipe = {
    title: "Homemade Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    difficulty: "Medium",
    cookingTime: "45 mins",
    servings: 4,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 cup warm water",
      "2 1/4 tsp active dry yeast",
      "1 tbsp olive oil",
      "Fresh mozzarella",
      "Fresh basil leaves",
      "San Marzano tomatoes",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Mix warm water with yeast and let stand for 5 minutes",
      "Combine flour and salt in a large bowl",
      "Add olive oil to yeast mixture",
      "Gradually mix wet ingredients into dry ingredients",
      "Knead dough for 10 minutes",
      "Let rise for 1 hour",
      "Roll out dough and add toppings",
      "Bake at 450°F for 15-20 minutes",
    ],
  },
}) => {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }[recipe.difficulty];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {recipe.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4 container">
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Recipe Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-gray-500" />
                  <Badge className={difficultyColor}>{recipe.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <ul className="grid grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="flex-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
