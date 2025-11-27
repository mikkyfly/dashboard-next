"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const chartData = [
  { browser: "FATAL ", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "ALERT ", visitors: 200, fill: "var(--color-safari)" },
  { browser: "CRITICAL ", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "WARNING ", visitors: 173, fill: "var(--color-edge)" },
  { browser: "INFO ", visitors: 190, fill: "var(--color-other)" },
];

const AppPieChart = () => {

  // If you don't use React compiler use useMemo hook to improve performance
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Статистика инцидентов</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Рост на 5,2% в этом месяце <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Показано общее количество инцидентов
        </div>
      </div>
    </div>
  );
};

export default AppPieChart;