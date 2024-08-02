import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import invariant from "tiny-invariant";

import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Flag } from "./Flag";

import type { Currencies } from "@/types/app";

interface CurrencyListProps {
  currencies: Currencies;
  onSelect: (value: string) => void;
}

export const CurrencyList = ({ currencies, onSelect }: CurrencyListProps) => {
  const [options, setOptions] = React.useState(currencies);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isDesktop ? 48 : 40),
    paddingStart: 8,
    paddingEnd: 8,
  });

  const items = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    items.length > 0
      ? [
          Math.max(0, items[0].start - virtualizer.options.scrollMargin),
          Math.max(0, virtualizer.getTotalSize() - items[items.length - 1].end),
        ]
      : [0, 0];

  const handleSearch = (search: string) => {
    setOptions(() => {
      invariant(parentRef.current, "Parent ref is not available.");
      parentRef.current.scrollTop = 0;

      if (!search) {
        return currencies;
      }

      return currencies.filter((currency) =>
        currency.short_code.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search currency..."
        onValueChange={handleSearch}
      />
      <CommandEmpty>No currency found.</CommandEmpty>
      <CommandList ref={parentRef}>
        <CommandGroup
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            paddingTop,
            paddingBottom,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const currency = options[virtualRow.index];

            return (
              <CommandItem
                key={currency.short_code}
                value={currency.short_code}
                onSelect={onSelect}
                className="gap-x-2"
              >
                <Flag code={currency.short_code} />
                {currency.short_code} - {currency.name}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
