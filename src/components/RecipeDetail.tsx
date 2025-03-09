import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat } from "lucide-react";

interface RecipeDetailProps {
  recipe?: {
    title: string;
    description: string;
    difficulty: string;
    cookingTime: string;
    steps?: string[];
  };
  isOpen?: boolean;
  onClose?: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  if (!recipe) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        No recipe details available
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white rounded-lg shadow-lg relative">
      {/* Back Button with Animation */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 flex items-center text-white bg-gray-700 hover:bg-gray-600 border-gray-600 transition-all duration-300 transform hover:scale-105 group"
        onClick={onClose}
      >
        <ArrowLeft className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="relative overflow-hidden">
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-full">
            Back to Recipes
          </span>
          <span className="absolute top-0 left-0 inline-block -translate-y-full transition-transform duration-300 group-hover:translate-y-full text-[#ff3b00]">
            Back to Recipes
          </span>
        </span>
      </Button>

      {/* Recipe Details */}
      <div className="mt-10">
        <div className="flex items-center mb-2">
          <ChefHat className="h-6 w-6 mr-2 text-[#ff3b00]" />
          <h1 className="text-2xl font-bold text-white">{recipe.title}</h1>
        </div>
        <p className="text-gray-300">{recipe.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="bg-green-900 text-green-100 text-sm px-2 py-1 rounded">
            {recipe.difficulty}
          </span>
          <span className="text-sm text-gray-300">{recipe.cookingTime}</span>
        </div>

        {/* Cooking Steps */}
        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          Cooking Instructions
        </h2>
        <div className="bg-gray-900 rounded-lg p-4">
          <Accordion type="single" collapsible className="mt-2">
            {(
              recipe.steps || [
                "Preheat oven",
                "Prepare ingredients",
                "Mix ingredients together",
                "Cook according to instructions",
                "Serve and enjoy",
              ]
            ).map((step: string, index: number) => (
              <AccordionItem key={index} title={`Step ${index + 1}`}>
                {step}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
