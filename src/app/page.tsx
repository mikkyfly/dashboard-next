// import AppBarChart from "@/components/AppBarChart";
import AppCardList from "@/components/AppCardList";
import { AppRadialChart } from "@/components/AppRadialCharts";
import { AppAreaChart } from "@/components/AppAreaChart";
import { AppHorizBarChart } from "@/components/AppHorizBarChart";
import { AppBarChart2 } from "@/components/AppBarChart2";
import { AppRadarChart } from "@/components/AppRadarChart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart2/>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppCardList title="Список пользователей" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppRadialChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppRadarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppHorizBarChart />
      </div>

    </div>
  );
}
