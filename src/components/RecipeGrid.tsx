import React from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookingTime: string;
}

interface RecipeGridProps {
  recipes?: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
}

const RecipeGrid = ({
  recipes = [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      difficulty: "Medium",
      cookingTime: "30 mins",
    },
    {
      id: "2",
      title: "Grilled Chicken Salad",
      image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f",
      difficulty: "Easy",
      cookingTime: "20 mins",
    },
    {
      id: "3",
      title: "Beef Wellington",
      image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0",
      difficulty: "Hard",
      cookingTime: "2 hrs",
    },
    {
      id: "4",
      title: "Vegetable Stir Fry",
      image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b1",
      difficulty: "Easy",
      cookingTime: "25 mins",
    },
  ],
  onRecipeClick = () => {},
}: RecipeGridProps) => {
  return (
    <div className="w-full min-h-[500px] bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            difficulty={recipe.difficulty}
            cookingTime={recipe.cookingTime}
            onClick={() => onRecipeClick(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
