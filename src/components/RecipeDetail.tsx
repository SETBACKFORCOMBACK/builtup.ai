import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function RecipeDetail({ recipe }: { recipe?: any }) {
  if (!recipe) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        No recipe details available
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-[#ff3b00]">{recipe.title}</h1>
      <p className="text-gray-600">{recipe.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="bg-green-200 text-green-700 text-sm px-2 py-1 rounded">
          {recipe.difficulty}
        </span>
        <span className="text-sm text-gray-500">{recipe.cookingTime}</span>
      </div>

      <Accordion type="single" collapsible className="mt-6">
        {recipe.steps &&
          recipe.steps.map((step: string, index: number) => (
            <AccordionItem key={index} title={`Step ${index + 1}`}>
              {step}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
