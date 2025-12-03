import { AreaChartWithZoom } from "@/components/AreaChartWithZoom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



export default async function LineChart() {


  return (
    <div className="py-3 space-y-3"> 
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Линейный график</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Журнал логов</h1>
        <p className="text-muted-foreground">
          Пример линейного графика
        </p>
      </div>      
      <AreaChartWithZoom />
    </div>
  );
}