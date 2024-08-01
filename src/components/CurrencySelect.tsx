import * as React from "react";
import { useStore } from "@nanostores/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { updateData } from "@/scripts/api";
import { $requestStatus } from "@/store";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CommandDialog } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SelectTrigger } from "./SelectTrigger";
import { CurrencyList } from "./CurrencyList";

import type { Currencies } from "@/types/app";

interface CurrencySelectProps {
  id: "base" | "symbol";
  currencies: Currencies;
}

export const CurrencySelect = ({ id, currencies }: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(id === "base" ? "USD" : "COP");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSelect = React.useCallback((value: string) => {
    setValue(value);
    setOpen(false);

    if (id === "base") {
      return updateData("base", value);
    }

    updateData("symbol", value);
  }, []);

  const requestStatus = useStore($requestStatus);

  const disabled = requestStatus === "loading";

  if (isDesktop) {
    return (
      <>
        <SelectTrigger
          value={value}
          disabled={disabled}
          onClick={() => setOpen(true)}
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogHeader className="border-b p-3 py-4">
            <DialogTitle>Select currency</DialogTitle>
          </DialogHeader>
          <CurrencyList currencies={currencies} onSelect={onSelect} />
        </CommandDialog>
      </>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SelectTrigger
          value={value}
          disabled={disabled}
          onClick={() => setOpen(true)}
        />
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
