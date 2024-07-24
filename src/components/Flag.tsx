import { cn } from "@/lib/utils";

interface FlagProps {
  code: string;
}

const CURRENCY_CODES_WITHOUT_FLAGS = ["ANG", "XAF", "XCD", "XOF", "XPF"];

export const Flag = ({ code }: FlagProps) => {
  const flagCode = code.toLowerCase().slice(0, 2);

  return (
    <span
      className={cn(
        "inline-block size-6 rounded-full",
        CURRENCY_CODES_WITHOUT_FLAGS.includes(code)
          ? "flag-globe"
          : `fib fi-${flagCode} fis`
      )}
    ></span>
  );
};
