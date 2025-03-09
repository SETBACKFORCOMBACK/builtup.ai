import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { X, Plus, Refrigerator } from "lucide-react";
import { generateRecipesFromIngredients } from "../lib/gemini";

interface IngredientInputProps {
  onRecipesGenerated?: (recipes: any[]) => void;
  isLoading?: boolean;
}

const IngredientInput = ({
  onRecipesGenerated = () => {},
  isLoading = false,
}: IngredientInputProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddIngredient = () => {
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) return;

    setIsGenerating(true);
    try {
      const recipes = await generateRecipesFromIngredients(ingredients);
      onRecipesGenerated(recipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Refrigerator className="h-5 w-5" />
          What's in your fridge?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter an ingredient"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleAddIngredient} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[100px] p-2 border rounded-md">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  {ingredient}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500 w-full text-center mt-8">
                Add ingredients to get recipe suggestions
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateRecipes}
          disabled={ingredients.length === 0 || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center w-full">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 opacity-75 blur animate-pulse"></div>
                <div className="relative flex items-center space-x-2 bg-black rounded-md px-3 py-1">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-white font-medium">
                    AI Generating Recipes
                  </span>
                  <div className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              </div>
            </div>
          ) : (
            "Generate Recipes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IngredientInput;
