import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CommandDialog } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import type { Currency } from "@/types";

import { CurrencyList } from "./CurrencyList";

interface CurrencySelectProps {
  currencies: Array<Currency>;
}

export const CurrencySelect = ({ currencies = [] }: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSelect = React.useCallback((value: string) => {
    setValue(value);
    setOpen(false);
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
            ? currencies.find((currency) => currency.name === value)?.short_code
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
            ? currencies.find((currency) => currency.name === value)?.short_code
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
