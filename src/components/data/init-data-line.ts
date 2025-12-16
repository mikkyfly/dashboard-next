import { ChartConfig} from "../ui/chart";


export const dataLine = [
  { month: "Январь", desktop: 186, mobile: 80 },
  { month: "Февраль", desktop: 305, mobile: 200 },
  { month: "Март", desktop: 237, mobile: 120 },
  { month: "Апрель", desktop: 73, mobile: 190 },
  { month: "Май", desktop: 209, mobile: 130 },
  { month: "Июнь", desktop: 214, mobile: 140 },
];


export const lineConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;