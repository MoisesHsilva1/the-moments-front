import * as React from "react";
import { X, Check, ChevronsUpDown, RotateCcw } from "lucide-react";
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
  options?: TagType[];
  placeholder?: string;
  className?: string;
  error?: string;
  onReload?: () => void;
}

export function TagsInput({
  value = [],
  onChange,
  options = [],
  placeholder = "Selecionar tags...",
  className,
  error,
  onReload,
}: TagsInputProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleUnselect = React.useCallback(
    (tag: TagType) => {
      onChange?.(value.filter((t) => t.name !== tag.name));
    },
    [onChange, value],
  );

  const handleSelect = (tag: TagType) => {
    setInputValue("");
    const isSelected = value.some((t) => t.name === tag.name);

    if (isSelected) {
      handleUnselect(tag);
      return;
    }

    onChange?.([...value, tag]);
  };

  const handleCreateTag = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setInputValue("");
    const isDuplicate = value.some(
      (t) => t.name?.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) return;

    const newTag: TagType = { name: trimmedName };
    onChange?.([...value, newTag]);
  };

  const renderBadge = (tag: TagType) => (
    <Badge
      key={tag.id || tag.name}
      variant="outline"
      className="group flex items-center gap-1.5 rounded-full border-[#E75E43]/20 bg-[#E75E43]/10 px-3 py-1 text-[#E75E43] transition-colors hover:bg-[#E75E43]/20"
    >
      {tag.name}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-3.5 w-3.5 rounded-full p-0 flex items-center justify-center opacity-70 transition-all hover:bg-[#E75E43]/20 hover:opacity-100"
        onClick={() => handleUnselect(tag)}
        onKeyDown={(e) => e.key === "Enter" && handleUnselect(tag)}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <X className="h-2.5 w-2.5" />
      </Button>
    </Badge>
  );

  const renderCommandList = () => {
    if (error && onReload) {
      return (
        <div className="flex flex-col items-center justify-center p-8 gap-3 text-center">
          <p className="text-xs text-red-500 font-medium leading-relaxed">
            Ops! Falha ao carregar as tags.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReload}
            className="text-xs text-zinc-400 hover:text-white"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Tentar novamente
          </Button>
        </div>
      );
    }

    return (
      <>
        <CommandEmpty className="p-4 text-center">
          <p className="text-sm text-zinc-400 mb-2">Nenhuma tag encontrada.</p>
          {inputValue && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 font-semibold text-[#E75E43] hover:bg-[#E75E43]/10 hover:text-[#E75E43]/90 text-xs"
              onClick={() => handleCreateTag(inputValue)}
            >
              Criar tag "{inputValue}"
            </Button>
          )}
        </CommandEmpty>
        <CommandGroup
          heading="Tags Sugeridas"
          className="px-2 font-medium text-zinc-500"
        >
          {options.map((option) => {
            const isSelected = value.some((t) => t.name === option.name);
            return (
              <CommandItem
                key={option.id || (option.name as string)}
                value={option.name as string}
                onSelect={() => handleSelect(option)}
                className="my-1 flex cursor-default items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-800/50 aria-selected:bg-zinc-800 aria-selected:text-white"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isSelected ? "bg-[#E75E43]" : "bg-zinc-700",
                    )}
                  />
                  <span>{option.name}</span>
                </div>
                {isSelected && <Check className="h-4 w-4 text-[#E75E43]" />}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </>
    );
  };

  return (
    <div className={cn("grid w-full gap-3", className)}>
      <div className="flex min-h-[40px] flex-wrap gap-2">
        {value.map(renderBadge)}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between rounded-2xl border-0 bg-zinc-900 px-4 py-6 text-zinc-300 transition-all hover:bg-zinc-800/80 hover:text-white",
              error
                ? "ring-2 ring-red-500"
                : "focus:ring-2 focus:ring-[#E75E43] outline-none",
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
          className="w-full min-w-[300px] overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900 p-0 shadow-2xl"
          align="start"
        >
          <Command className="bg-transparent text-zinc-200">
            <CommandInput
              placeholder="Pesquisar tags..."
              className="h-12 border-b border-zinc-800 focus:ring-0"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) =>
                e.key === "Enter" && inputValue && handleCreateTag(inputValue)
              }
            />
            <CommandList className="max-h-[250px]">
              {renderCommandList()}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
