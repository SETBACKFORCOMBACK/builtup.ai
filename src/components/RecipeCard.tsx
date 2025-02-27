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
      className="w-[350px] h-[450px] bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{cookingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-gray-500" />
            <Badge className={difficultyColor}>{difficulty}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
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
