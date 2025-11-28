"use client";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartData = [
  { month: "Январь", desktop: 186, mobile: 80 },
  { month: "Февраль", desktop: 305, mobile: 200 },
  { month: "Март", desktop: 237, mobile: 120 },
  { month: "Апрель", desktop: 173, mobile: 90 },
  { month: "Май", desktop: 209, mobile: 130 },
  { month: "Июнь", desktop: 214, mobile: 140 },
  { month: "Июль", desktop: 178, mobile: 40 },
  { month: "Август", desktop: 147, mobile: 87 },
  { month: "Сентябрь", desktop: 247, mobile: 17 },
  { month: "Октябрь", desktop: 107, mobile: 37 },
  { month: "Ноябрь", desktop: 57, mobile: 8 },
  { month: "Декабрь", desktop: 103, mobile: 67 },

];

const AppBarChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Статистика инцидентов</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[440px] w-full "> {/*w-full */}
        <BarChart accessibilityLayer data={chartData}>
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
    </div>
  );
};

export default AppBarChart;