"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with dots"

const chartData = [
  { month: "Январь", desktop: 186 },
  { month: "Февраль", desktop: 305 },
  { month: "Март", desktop: 237 },
  { month: "Апрель", desktop: 273 },
  { month: "Май", desktop: 209 },
  { month: "Июнь", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Аварии",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function AppRadarChart() {
  return (
    <Card className="flex flex-col h-[100%]">
      <CardHeader className="items-center">
        <CardTitle>Радиальная диаграмма</CardTitle>
        <CardDescription>
          Показано общее количество аварий за последние 6 месяцев
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[450px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-chart-1)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Рост на 5,2% в этом месяце <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Январь - Июнь 2025
        </div>
      </CardFooter>
    </Card>
  )
}
