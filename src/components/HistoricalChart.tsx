import { toast } from "sonner";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useStore } from "@nanostores/react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { $historical, $converter } from "@/store";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  rate: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const HistoricalChart = () => {
  const historical = useStore($historical);

  const isMobile = useMediaQuery("(min-width: 425px)");

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-96 w-full">
      <AreaChart accessibilityLayer data={historical} width={768}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={8}
          minTickGap={216}
          className="text-[10px] xs:text-xs"
        />
        <YAxis
          dataKey="rate"
          width={isMobile ? 40 : 34}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency: $converter.get().symbol.code,
              currencyDisplay: "narrowSymbol",
              trailingZeroDisplay: "stripIfInteger",
            })
          }
          domain={["auto", "auto"]}
          className="text-[10px] xs:text-xs"
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <defs>
          <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-rate)" stopOpacity={0.8} />
            <stop
              offset="95%"
              stopColor="var(--color-rate)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="rate"
          fill="url(#fillArea)"
          fillOpacity={0.5}
          stroke="var(--color-rate)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
