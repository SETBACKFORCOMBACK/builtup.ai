import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { analyzeImageForRecipes } from "../lib/gemini";

interface PhotoUploaderProps {
  onPhotoSelect?: (file: File, recipes?: any[]) => void;
  isLoading?: boolean;
  defaultOpen?: boolean;
}

const PhotoUploader = ({
  onPhotoSelect = () => {},
  isLoading = false,
  defaultOpen = true,
}: PhotoUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateRecipes = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    try {
      const recipes = await analyzeImageForRecipes(selectedImage);
      onPhotoSelect(new File([], "image"), recipes);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full max-w-md">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose from Gallery</DialogTitle>
        </DialogHeader>
        <Card className="bg-white">
          <CardContent>
            <div
              className={`relative h-[300px] w-full rounded-lg border-2 border-dashed p-4 transition-colors ${
                isDragging ? "border-primary bg-primary/10" : "border-gray-200"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {selectedImage ? (
                <div className="relative h-full w-full">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedImage(null)}
                    >
                      Change Photo
                    </Button>
                    <Button
                      onClick={handleGenerateRecipes}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Generating...
                        </>
                      ) : (
                        "Generate Recipes"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <p className="text-center text-sm text-gray-500">
                    Drag and drop your photo here, or click to select
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose from Gallery
                    </Button>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              )}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploader;
