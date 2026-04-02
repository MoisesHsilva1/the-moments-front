import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { TagsInput as TagType } from "@/schemas/shared/tagsSchema";

interface TagsInputProps {
  value?: TagType[];
  onChange?: (value: TagType[]) => void;
  placeholder?: string;
  options?: TagType[];
  className?: string;
  error?: string;
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = "Selecionar tags...",
  options = [],
  className,
  error,
}: TagsInputProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleUnselect = (tag: TagType) => {
    onChange?.(value.filter((t) => t.name !== tag.name));
  };

  const handleSelect = (tag: TagType) => {
    setInputValue("");
    if (value.some((t) => t.name === tag.name)) {
      handleUnselect(tag);
    } else {
      onChange?.([...value, tag]);
    }
  };

  const handleCreateTag = (name: string) => {
    if (!name.trim()) return;
    const newTag: TagType = { name: name.trim() };

    if (
      !value.some(
        (t) => t.name?.toLowerCase() === (newTag.name as string).toLowerCase(),
      )
    ) {
      onChange?.([...value, newTag]);
    }

    setInputValue("");
  };

  return (
    <div className={cn("grid gap-3 w-full", className)}>
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {value.map((tag) => (
          <Badge
            key={tag.id || tag.name}
            variant="outline"
            className="rounded-full bg-[#E75E43]/10 text-[#E75E43] border-[#E75E43]/20 px-3 py-1 flex items-center gap-1.5 hover:bg-[#E75E43]/20 transition-colors group"
          >
            {tag.name}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-1 h-3.5 w-3.5 rounded-full p-0 flex items-center justify-center hover:bg-[#E75E43]/20 text-[#E75E43] transition-all opacity-70 hover:opacity-100"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(tag);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleUnselect(tag)}
            >
              <X className="h-2.5 w-2.5" />
            </Button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between rounded-2xl border-0 bg-zinc-900 px-4 py-6 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-all",
              error ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-[#E75E43] outline-none",
            )}
          >
            <span className="truncate">
              {value.length > 0
                ? `${value.length} tag${value.length > 1 ? "s" : ""} selecionada${
                    value.length > 1 ? "s" : ""
                  }`
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[300px] p-0 border-zinc-800 bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden"
          align="start"
        >
          <Command className="bg-transparent text-zinc-200">
            <CommandInput
              placeholder="Pesquisar tags..."
              className="h-12 border-b border-zinc-800 focus:ring-0"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue) {
                  handleCreateTag(inputValue);
                }
              }}
            />
            <CommandList className="max-h-[250px]">
              <CommandEmpty className="p-4 text-center">
                <p className="text-sm text-zinc-400 mb-2">
                  Nenhuma tag encontrada.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-[#E75E43] hover:text-[#E75E43]/90 hover:bg-[#E75E43]/10 h-8 font-semibold"
                  onClick={() => handleCreateTag(inputValue)}
                >
                  Criar tag "{inputValue}"
                </Button>
              </CommandEmpty>
              <CommandGroup
                heading="Tags Sugeridas"
                className="px-2 text-zinc-500 font-medium"
              >
                {options.map((option) => (
                  <CommandItem
                    key={option.id || (option.name as string)}
                    value={option.name as string}
                    onSelect={() => handleSelect(option)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 my-1 rounded-xl cursor-default transition-colors",
                      "aria-selected:bg-zinc-800 aria-selected:text-white hover:bg-zinc-800/50",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          value.some((t) => t.name === option.name)
                            ? "bg-[#E75E43]"
                            : "bg-zinc-700",
                        )}
                      />
                      <span>{option.name}</span>
                    </div>
                    {value.some((t) => t.name === option.name) && (
                      <Check className="h-4 w-4 text-[#E75E43]" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
