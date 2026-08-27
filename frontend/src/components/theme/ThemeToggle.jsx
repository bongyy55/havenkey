"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-sm border border-[#111111]/10 flex items-center justify-center text-[#111111] hover:border-[#C9975C] hover:text-[#C9975C] transition dark:border-white/10 dark:text-white/70 dark:hover:border-[#C9975C] dark:hover:text-[#C9975C]"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun size={17} strokeWidth={1.75} />
      ) : (
        <Moon size={17} strokeWidth={1.75} />
      )}
    </button>
  );
}
