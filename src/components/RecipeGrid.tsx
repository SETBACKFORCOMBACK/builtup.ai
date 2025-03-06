import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function RecipeGrid({ recipes = [] }: { recipes?: any[] }) {
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
          className="border rounded-lg p-4 shadow-md bg-white hover:scale-105 transition"
        >
          <h2 className="text-xl font-bold text-[#ff3b00]">{recipe.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{recipe.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-sm">{recipe.difficulty}</span>
            <span className="text-sm text-black">{recipe.cookingTime}</span>
          </div>

          <Accordion type="single" collapsible className="mt-4">
            {recipe.steps &&
              recipe.steps.map((step: string, i: number) => (
                <AccordionItem key={i} title={`Step ${i + 1}`}>
                  {step}
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
