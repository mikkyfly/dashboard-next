"use client"
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Brush
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

const data = [
  { date: '2024-01', value: 4000 },
  { date: '2024-02', value: 3000 },
  { date: '2024-03', value: 2000 },
  { date: '2024-04', value: 2780 },
  { date: '2024-05', value: 1890 },
  { date: '2024-06', value: 1890 },
  { date: '2024-07', value: 1890 },


  // ... больше данных
];

export function AreaChartWithZoom() {
  const [zoomDomain, setZoomDomain] = useState({ startIndex: 0, endIndex: 4 });

  const handleZoomIn = () => {
    if (zoomDomain.endIndex - zoomDomain.startIndex > 2) {
      setZoomDomain(prev => ({
        startIndex: prev.startIndex + 1,
        endIndex: prev.endIndex - 1
      }));
    }
  };

  const handleZoomOut = () => {
    if (zoomDomain.startIndex > 0 && zoomDomain.endIndex < data.length - 1) {
      setZoomDomain(prev => ({
        startIndex: prev.startIndex - 1,
        endIndex: prev.endIndex + 1
      }));
    }
  };

  const zoomedData = data.slice(zoomDomain.startIndex, zoomDomain.endIndex + 1);

  return (
    <Card className="flex flex-col max-h-[100%]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Анализ данных с zoom</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={zoomedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                fill="var(--color-chart-1)" 
                fillOpacity={0.3}
              />
              <Brush 
                dataKey="date"
                height={30}
                stroke="#8884d8"
                startIndex={zoomDomain.startIndex}
                endIndex={zoomDomain.endIndex}
                onChange={(domain) => {
                  if (domain.startIndex !== undefined && domain.endIndex !== undefined) {
                    setZoomDomain({
                      startIndex: domain.startIndex,
                      endIndex: domain.endIndex
                    });
                  }
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}