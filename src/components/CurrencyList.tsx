import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import type { Currency } from "@/types";

interface CurrencyListProps {
  currencies: Array<Currency>;
  onSelect: (value: string) => void;
}

export const CurrencyList = ({ currencies, onSelect }: CurrencyListProps) => {
  return (
    <Command>
      <CommandInput placeholder="Search currency..." />
      <CommandEmpty>No currency found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {currencies.map((currency) => (
            <CommandItem
              key={currency.short_code}
              value={currency.name}
              onSelect={onSelect}
            >
              {currency.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
