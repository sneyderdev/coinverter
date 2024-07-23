interface FlagProps {
  code: string;
}

const CURRENCY_CODES_WITHOUT_FLAGS = ["ANG", "XAF", "XCD", "XOF", "XPF"];

export const Flag = ({ code }: FlagProps) => {
  const flagCode = code.toLowerCase().slice(0, 2);

  return (
    <>
      {CURRENCY_CODES_WITHOUT_FLAGS.includes(code) ? (
        <span className="inline-block size-6">
          <img src="/globe.svg" alt={code} className="size-full" />
        </span>
      ) : (
        <span
          className={`fib fi-${flagCode} fis inline-block size-6 rounded-full`}
        ></span>
      )}
    </>
  );
};
