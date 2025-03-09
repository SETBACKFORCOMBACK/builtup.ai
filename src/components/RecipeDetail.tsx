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
  isFavorite?: boolean;
  onToggleFavorite?: (isFavorite: boolean) => void;
}

export default function RecipeDetail({
  recipe,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}: RecipeDetailProps) {
  if (!recipe) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        No recipe details available
      </div>
    );
  }

  // Define icons for common cooking steps
  const getStepIcon = (index: number, step: string) => {
    const stepLower = step.toLowerCase();
    if (stepLower.includes("preheat") || stepLower.includes("oven"))
      return "🔥";
    if (
      stepLower.includes("chop") ||
      stepLower.includes("cut") ||
      stepLower.includes("slice")
    )
      return "🔪";
    if (
      stepLower.includes("mix") ||
      stepLower.includes("stir") ||
      stepLower.includes("whisk")
    )
      return "🥣";
    if (stepLower.includes("boil") || stepLower.includes("simmer")) return "♨️";
    if (stepLower.includes("fry") || stepLower.includes("sauté")) return "🍳";
    if (stepLower.includes("bake")) return "🧁";
    if (
      stepLower.includes("serve") ||
      stepLower.includes("enjoy") ||
      stepLower.includes("plate")
    )
      return "🍽️";
    if (
      stepLower.includes("refrigerate") ||
      stepLower.includes("chill") ||
      stepLower.includes("cool")
    )
      return "❄️";
    if (stepLower.includes("measure") || stepLower.includes("weigh"))
      return "⚖️";
    // Default to numbered steps if no specific icon matches
    return `${index + 1}.`;
  };

  return (
    <div className="p-6 bg-black text-white rounded-lg shadow-lg relative">
      {/* Back Button with Animation */}
      <div className="flex justify-between items-center absolute top-4 left-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-white bg-gray-700 hover:bg-gray-600 border-gray-600 transition-all duration-300 transform hover:scale-105 group"
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

        {/* Save Button */}
        <Button
          variant={isFavorite ? "destructive" : "outline"}
          size="sm"
          className={`flex items-center transition-all duration-300 transform hover:scale-105 ${isFavorite ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"}`}
          onClick={() => onToggleFavorite && onToggleFavorite(isFavorite)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 mr-1 ${isFavorite ? "fill-white" : "fill-none"}`}
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
          {isFavorite ? "Saved" : "Save Recipe"}
        </Button>
      </div>

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
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full">
                    {getStepIcon(index, step)}
                  </span>
                  <p>{step}</p>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
