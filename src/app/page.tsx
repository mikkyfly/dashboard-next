// import AppBarChart from "@/components/AppBarChart";
import AppCardList from "@/components/AppCardList";
// import AppPieChart from "@/components/AppPieChart";
import { AppRadialChart } from "@/components/AppRadialCharts";
import { AppAreaChart } from "@/components/AppAreaChart";
import AppTodoList from "@/components/AppTodoList";
import { AppHorizBarChart } from "@/components/AppHorizBarChart";
import { AppBarChart2 } from "@/components/AppBarChart2";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        {/* <AppBarChart /> */}
        <AppBarChart2/>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppCardList title="Список пользователей" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        {/* <AppPieChart /> */}
        <AppRadialChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppTodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        {/* <AppCardList title="Список событий" /> */}
        <AppHorizBarChart />
      </div>

    </div>
  );
}
