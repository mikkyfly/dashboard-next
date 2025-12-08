// app/page.tsx
import AppTopology from '@/components/AppTopology';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
ChartNetwork
} from 'lucide-react';

export default function Topology() {
  return (
    <div className="">
      <div className="max-w-9xl mx-auto ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Топология сети</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* HEAD */}
        <div className="bg-card border border-secondary rounded-lg p-6 mt-3 mb-6 flex items-center gap-3">
          <ChartNetwork className="w-6 h-6" />
          <h2 className="text-xl font-semibold  ">Сетевая структура испытательного центра промышленной автоматизации</h2> 
        </div>

        {/* Схема БД */}
        <div className='w-full h-[1100px] rounded-lg border-1'> {/*rounded-lg border border-secondary */}
          <AppTopology />

        </div>  
      </div>
    </div>
  );
}