"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { 
  // ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "./ui/chart";
import { dataLine, lineConfig } from "./data/init-data-line";

const AppLineChart = () => {
  return (
    <ChartContainer config={lineConfig} className="mt-6">
      <LineChart
        accessibilityLayer
        data={dataLine}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default AppLineChart;