// src/components/ProgressRadix.tsx
import * as RadixProgress from "@radix-ui/react-progress";

type Props = {
  value: number;
  max?: number;
};

export function Progress({ value, max = 100 }: Props) {
  const percent = (value / max) * 100;

  return (
    <RadixProgress.Root
      className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 "
      value={value}
      max={max}
    >
      <RadixProgress.Indicator
        className="h-full w-full bg-blue-500 transition-transform"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </RadixProgress.Root>
  );
}
