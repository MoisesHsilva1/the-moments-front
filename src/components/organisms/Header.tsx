import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SidebarTrigger } from "../ui/sidebar";

const Header: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between gap-4  px-4 md:static md:bg-transparent ">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div
          className="cursor-pointer text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          The moments
        </div>
      </div>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="relative"
      >
        <InputGroup
          className={`transition-all duration-300 ease-in-out border-white/20 hover:border-white/40 bg-zinc-900/50 rounded-full ${
            isSearchExpanded ? "w-64 sm:w-80" : "w-10 sm:w-12 overflow-hidden"
          }`}
        >
          <InputGroupAddon
            align="inline-start"
            className="cursor-pointer text-white/70"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Explore lugares por tags..."
            className={`transition-all duration-300 text-white placeholder:text-white/40 border-none bg-transparent ${
              isSearchExpanded
                ? "opacity-100 flex-1 px-3"
                : "opacity-0 w-0 p-0 pointer-events-none"
            }`}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
          />
        </InputGroup>
      </form>
    </header>
  );
};

export default Header;
