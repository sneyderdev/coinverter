import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Flag } from "./Flag";

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ value, ...props }, ref) => {
  return (
    <Button ref={ref} variant="outline" className="justify-between" {...props}>
      <div className="flex items-center gap-x-2">
        <Flag code={value} />
        {value}
      </div>
      <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
});
