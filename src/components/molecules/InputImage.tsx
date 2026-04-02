import React, { useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface InputImageProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

const InputImage: React.FC<InputImageProps> = ({ value, onChange, error }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();

    if (!file.type.startsWith("image/")) {
      return;
    }

    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-[#E75E43] bg-[#E75E43]/10"
            : error
              ? "border-red-500 bg-red-500/5"
              : "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800"
        } ${value ? "border-none bg-black" : ""}`}
      >
        <Input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
          title=""
        />

        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40"
            />
            <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                size="sm"
                className="rounded-full px-6 bg-black/60 text-white backdrop-blur-md hover:bg-black/80"
              >
                <UploadCloud className="h-4 w-4" />
                Trocar Imagem
              </Button>
            </div>
            <Button
              onClick={handleRemove}
              className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="pointer-events-none flex flex-col items-center gap-4 text-zinc-400">
            <div className="rounded-full bg-zinc-800 p-4 transition-transform duration-300 group-hover:scale-110">
              <ImagePlus className="h-8 w-8 text-zinc-300" />
            </div>

            <span className="text-center">
              <p className="font-semibold text-zinc-300">
                Clique ou arraste uma imagem aqui
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                PNG, JPG, WEBP (max. 5MB)
              </p>
            </span>
          </div>
        )}
      </Card>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputImage;
