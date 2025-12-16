"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { horizShortBar } from "./data/init-data-bar";


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

export const description = "A horizontal bar chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function AppHorizBarChart() {
  return (
    <Card className="h-[100%]">
      <CardHeader className="h-20">
        <CardTitle>Cтолбчатая диаграмма</CardTitle>
        <CardDescription>Январь - Июнь 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
          <BarChart
            accessibilityLayer
            data={horizShortBar}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />}
            />
            <Bar dataKey="desktop" fill="var(--chart-2)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm ">
        <div className="flex gap-2 leading-none font-medium">
          Рост на 5,2% в этом месяце <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Показано общее количество аварий за последние 6 месяцев
        </div>
      </CardFooter>
    </Card>
  )
}
