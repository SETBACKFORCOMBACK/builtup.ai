import { Accordion, AccordionItem } from "@/components/ui/accordion";

interface Recipe {
  title: string;
  description: string;
  difficulty: string;
  cookingTime: string;
  steps: string[];
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-bold">{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <p>Cooking Time: {recipe.cookingTime}</p>

      <Accordion type="single">
        {recipe.steps.map((step, index) => (
          <AccordionItem key={index} title={`Step ${index + 1}`}>
            {step}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
