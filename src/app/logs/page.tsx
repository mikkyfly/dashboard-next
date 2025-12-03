import { AppLogsTable } from '@/components/AppLogsTable';
import { LogEntry } from '@/types/log';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function getLogs(): Promise<LogEntry[]> {
  // Тестовые данные с разными типами для демонстрации фильтрации
  const logs: LogEntry[] = [];
  
  const sources = ['auth-service', 'payment-service', 'api-gateway', 'database', 'frontend', 'email-service'];
  const levels: LogEntry['level'][] = ['info', 'warning', 'error', 'debug'];
  const statusCodes = [200, 201, 301, 400, 401, 403, 404, 500, 502];
  
  for (let i = 1; i <= 50; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const hasUserId = Math.random() > 0.3;
    const hasStatusCode = Math.random() > 0.4;
    
    logs.push({
      id: `log-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      level,
      source,
      message: `Тестовое сообщение лога #${i} от ${source} с уровнем ${level}`,
      userId: hasUserId ? `user-${Math.floor(Math.random() * 1000)}` : undefined,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      duration: Math.floor(Math.random() * 1000),
      statusCode: hasStatusCode ? statusCodes[Math.floor(Math.random() * statusCodes.length)] : undefined,
      details: Math.random() > 0.7 ? {
        requestId: `req-${i}`,
        sessionId: `session-${Math.floor(Math.random() * 1000)}`,
        additionalInfo: `Дополнительная информация для лога ${i}`
      } : undefined,
    });
  }
  
  // Добавим несколько специальных записей для демонстрации фильтрации
  logs.push({
    id: 'error-1',
    timestamp: new Date(),
    level: 'error',
    source: 'payment-service',
    message: 'Ошибка при обработке платежа: недостаточно средств',
    userId: 'user-123',
    statusCode: 400,
  });
  
  logs.push({
    id: 'warning-1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    level: 'warning',
    source: 'auth-service',
    message: 'Подозрительная активность: 5 неудачных попыток входа',
    userId: 'user-456',
    statusCode: 429,
  });
  
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export default async function LogsPage() {
  const logs = await getLogs();

  return (
    <div className="py-3 space-y-3"> 
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Таблица логов</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Журнал логов</h1>
        <p className="text-muted-foreground">
          Просмотр системных логов с расширенной фильтрацией
        </p>
      </div>

      <AppLogsTable logs={logs} />
      
      
    </div>
  );
}