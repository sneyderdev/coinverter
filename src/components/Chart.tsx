import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useStore } from "@nanostores/react";

import { $converter } from "@/store";

import { updateHistorical } from "@/scripts/api";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { Historical } from "@/types";

const chartConfig = {
  rate: {
    label: "Price",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface ChartProps {
  historical: Historical;
}

export const Chart = ({ historical }: ChartProps) => {
  const [chartData, setChartData] = React.useState<Historical>(historical);

  const converter = useStore($converter);

  React.useEffect(() => {
    updateHistorical(converter.base, converter.symbol.code).then((data) => {
      setChartData(data);
    });
  }, [converter]);

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={8}
          minTickGap={216}
        />
        <YAxis
          dataKey="rate"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              trailingZeroDisplay: "stripIfInteger",
            })
          }
          domain={["auto", "auto"]}
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
