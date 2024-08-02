import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "@/components/ui/button";

export const ThemeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-0 top-3 duration-500 animate-in fade-in-0",
          className
        )}
        {...props}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
);
