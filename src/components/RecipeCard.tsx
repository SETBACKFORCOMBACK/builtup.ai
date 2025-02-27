import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, ChefHat } from "lucide-react";

interface RecipeCardProps {
  title?: string;
  image?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  cookingTime?: string;
  onClick?: () => void;
}

const RecipeCard = ({
  title = "Delicious Pasta Dish",
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  difficulty = "Medium",
  cookingTime = "30 mins",
  onClick = () => {},
}: RecipeCardProps) => {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }[difficulty];

  return (
    <Card
      className="w-full max-w-[280px] h-[320px] bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-36">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">{cookingTime}</span>
          </div>
          <Badge className={`${difficultyColor} text-xs px-2 py-0.5`}>
            {difficulty}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: "70%" }}
            title="Recipe match percentage"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
