import { Accordion, AccordionItem } from "@/components/ui/accordion";

interface Recipe {
  title: string;
  description: string;
  difficulty: string;
  cookingTime: string;
  steps: string[];
}

export function RecipeCard({ recipe }: { recipe?: Recipe }) {
  if (!recipe) {
    return (
      <div className="border rounded-lg p-4 shadow-md glass-card">
        No recipe data available
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 shadow-md glass-card">
      <h2 className="text-lg font-bold text-white">{recipe.title}</h2>
      <p className="text-white">{recipe.description}</p>
      <p className="text-white">Difficulty: {recipe.difficulty}</p>
      <p className="text-white">Cooking Time: {recipe.cookingTime}</p>

      <Accordion type="single">
        {recipe.steps &&
          recipe.steps.map((step, index) => (
            <AccordionItem key={index} title={`Step ${index + 1}`}>
              {step}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
