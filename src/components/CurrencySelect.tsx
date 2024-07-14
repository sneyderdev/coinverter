import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { updateBase, updateSymbol } from "@/scripts/api";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CommandDialog } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { CurrencyList } from "./CurrencyList";

import type { Currency } from "@/types";

interface CurrencySelectProps {
  id: "base" | "symbol";
  currencies: Array<Currency>;
}

export const CurrencySelect = ({ id, currencies }: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(id === "base" ? "USD" : "COP");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSelect = React.useCallback((value: string) => {
    setValue(value);
    setOpen(false);

    if (id === "base") {
      return updateBase(value);
    }

    updateSymbol(value);
  }, []);

  if (isDesktop) {
    return (
      <div>
        <Button
          variant="outline"
          className="w-[200px] justify-between"
          onClick={() => setOpen(true)}
        >
          {value
            ? currencies.find((currency) => currency.short_code === value)
                ?.short_code
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogHeader className="border-b p-3 py-4">
            <DialogTitle>Select currency</DialogTitle>
          </DialogHeader>
          <CurrencyList currencies={currencies} onSelect={onSelect} />
        </CommandDialog>
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {value
            ? currencies.find((currency) => currency.short_code === value)
                ?.short_code
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogHeader className="border-b p-3 py-4">
          <DialogTitle>Select currency</DialogTitle>
        </DialogHeader>
        <CurrencyList currencies={currencies} onSelect={onSelect} />
      </DrawerContent>
    </Drawer>
  );
};
