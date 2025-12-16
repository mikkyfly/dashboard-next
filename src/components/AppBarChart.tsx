"use client";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { shortBar } from "./data/init-data-bar";

const chartConfig = {
  desktop: {
    label: "Предупреждения",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Аварии",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppBarChart = () => {
  return (
    <Card className="flex flex-col h-[100%]">
      <CardHeader className="items-center">
        <CardTitle>Столбчатая диаграмма</CardTitle>
        <CardDescription>
          Статистика инцидентов
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[370px] w-full "> {/*w-full */}
          <BarChart accessibilityLayer data={shortBar}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppBarChart;