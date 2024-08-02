import * as React from "react";
import { useStore } from "@nanostores/react";

import { $theme } from "@/store";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeButton } from "./ThemeButton";

export const ThemeToggle = () => {
  const [supportsSViewTransition, setSupportsSViewTransition] =
    React.useState(false);

  const theme = useStore($theme);

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    $theme.set(isDark ? "dark" : "light");

    setSupportsSViewTransition(!!document.startViewTransition);
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ThemeButton className={cn(supportsSViewTransition && "hidden")} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => $theme.set("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => $theme.set("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => $theme.set("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
