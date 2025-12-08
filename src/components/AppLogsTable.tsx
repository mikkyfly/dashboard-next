'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogEntry, LogLevel, ColumnFilterConfig, FilterOperator } from '@/types/log';
import {
  Download,
  Filter,
  Search,
  AlertCircle,
  Info,
  AlertTriangle,
  Bug,
  Calendar,
  ChevronDown,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ColumnFilterComponent } from './column-filter';

interface LogTableProps {
  logs: LogEntry[];
  onExport?: (logs: LogEntry[]) => void;
}

const levelConfig: Record<LogLevel, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
  info: {
    variant: 'default',
    icon: <Info className="h-3 w-3 mr-1" />,
  },
  warning: {
    variant: 'outline',
    icon: <AlertTriangle className="h-3 w-3 mr-1" />,
  },
  error: {
    variant: 'destructive',
    icon: <AlertCircle className="h-3 w-3 mr-1" />,
  },
  debug: {
    variant: 'secondary',
    icon: <Bug className="h-3 w-3 mr-1" />,
  },
};

// Кастомная функция фильтрации с правильными аргументами
const customFilterFn: FilterFn<LogEntry> = (row, columnId, filterValue: ColumnFilterConfig) => {
  if (!filterValue) return true;
  
  const { operator, value, value2 } = filterValue;
  const cellValue = row.getValue(columnId);
  
  // Обработка null/undefined значений
  if (operator === 'isNull') {
    return cellValue == null;
  }
  
  if (operator === 'isNotNull') {
    return cellValue != null;
  }
  
  if (cellValue == null) return false;
  
  const cellValueStr = String(cellValue).toLowerCase();
  const filterValueStr = value ? String(value).toLowerCase() : '';
  
  switch (operator) {
    case 'equals':
      return cellValueStr === filterValueStr;
    
    case 'contains':
      return cellValueStr.includes(filterValueStr);
    
    case 'startsWith':
      return cellValueStr.startsWith(filterValueStr);
    
    case 'endsWith':
      return cellValueStr.endsWith(filterValueStr);
    
    case 'greaterThan':
      if (typeof cellValue === 'number' && typeof value === 'number') {
        return cellValue > value;
      }
      if (cellValue instanceof Date && value instanceof Date) {
        return cellValue > value;
      }
      return false;
    
    case 'lessThan':
      if (typeof cellValue === 'number' && typeof value === 'number') {
        return cellValue < value;
      }
      if (cellValue instanceof Date && value instanceof Date) {
        return cellValue < value;
      }
      return false;
    
    case 'between':
      if (typeof cellValue === 'number' && typeof value === 'number' && typeof value2 === 'number') {
        return cellValue >= value && cellValue <= value2;
      }
      if (cellValue instanceof Date && value instanceof Date && value2 instanceof Date) {
        return cellValue >= value && cellValue <= value2;
      }
      return false;
    
    default:
      return true;
  }
};

// Константа для меток операторов
const operatorLabels: Record<FilterOperator, string> = {
  equals: 'Равно',
  contains: 'Содержит',
  startsWith: 'Начинается с',
  endsWith: 'Заканчивается на',
  greaterThan: 'Больше чем',
  lessThan: 'Меньше чем',
  between: 'Между',
  isNull: 'Пусто',
  isNotNull: 'Не пусто',
};

export function AppLogsTable({ logs, onExport }: LogTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'timestamp', desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilterConfig[]>([]);
  const [filteredData, setFilteredData] = React.useState<LogEntry[]>(logs);

  const columns: ColumnDef<LogEntry>[] = [
    {
      accessorKey: 'timestamp',
      header: () => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Время
                <ColumnFilterComponent
                    column="timestamp"
                    columnType="date"
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />  
            </span>
          </div>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('timestamp') as Date;
        return (
          <div className="flex items-center text-sm">
            <Calendar className="h-3 w-3 mr-2 opacity-50" />
            {format(date, 'dd.MM.yyyy HH:mm:ss', { locale: ru })}
          </div>
        );
      },
      filterFn: customFilterFn,
    },
    {
      accessorKey: 'level',
      header: ({  }) => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Уровень
                <ColumnFilterComponent
                    column="level"
                    columnType="enum"
                    enumValues={['info', 'warning', 'error', 'debug']}
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />
            </span>
            
          </div>
        );
      },
      cell: ({ row }) => {
        const level = row.getValue('level') as LogLevel;
        const config = levelConfig[level];
        return (
          <Badge variant={config.variant} className="flex items-center w-fit">
            {config.icon}
            {level.toUpperCase()}
          </Badge>
        );
      },
      filterFn: customFilterFn,
    },
    {
      accessorKey: 'source',
      header: ({  }) => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Источник
                <ColumnFilterComponent
                    column="source"
                    columnType="string"
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />
            </span>
            
          </div>
        );
      },
      cell: ({ row }) => (
        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
          {row.getValue('source')}
        </code>
      ),
      filterFn: customFilterFn,
    },
    {
      accessorKey: 'message',
      header: ({  }) => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Сообщение
                <ColumnFilterComponent
                    column="message"
                    columnType="string"
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />
            </span>
            
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="text-sm truncate">{row.getValue('message')}</p>
        </div>
      ),
      filterFn: customFilterFn,
    },
    {
      accessorKey: 'userId',
      header: ({  }) => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Пользователь
                <ColumnFilterComponent
                    column="userId"
                    columnType="string"
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />
            </span>
            
          </div>
        );
      },
      cell: ({ row }) => {
        const userId = row.getValue('userId') as string;
        return userId ? (
          <Badge variant="outline" className="font-mono text-xs">
            {userId.substring(0, 8)}...
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        );
      },
      filterFn: customFilterFn,
    },
    {
      accessorKey: 'statusCode',
      header: ({  }) => {
        return (
          <div className="flex flex-col space-y-2">
            <span>
                Код
                <ColumnFilterComponent
                    column="statusCode"
                    columnType="number"
                    filters={columnFilters}
                    onFilterChange={setColumnFilters}
                />
            </span>
            
          </div>
        );
      },
      cell: ({ row }) => {
        const statusCode = row.getValue('statusCode') as number;
        if (!statusCode) return null;
        
        let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
        if (statusCode >= 200 && statusCode < 300) variant = 'default';
        else if (statusCode >= 300 && statusCode < 400) variant = 'outline';
        else if (statusCode >= 400 && statusCode < 500) variant = 'outline';
        else variant = 'destructive';
        
        return (
          <Badge variant={variant}>
            {statusCode}
          </Badge>
        );
      },
      filterFn: customFilterFn,
    },
    {
      id: 'details',
      header: 'Детали',
      cell: ({ row }) => {
        const details = row.original.details;
        if (!details) return null;
        
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              console.log('Details:', details);
              alert(JSON.stringify(details, null, 2));
            }}
          >
            Просмотр
          </Button>
        );
      },
    },
  ];

  // Применяем фильтры к данным
  React.useEffect(() => {
    const applyFilters = () => {
      if (columnFilters.length === 0 && !globalFilter) {
        setFilteredData(logs);
        return;
      }

      const filtered = logs.filter(log => {
        // Применяем фильтры столбцов
        const passesColumnFilters = columnFilters.every(filter => {
          const columnValue = log[filter.column as keyof LogEntry];
          const rowObj = {
            id: filter.column,
            original: log,
            getValue: (columnId: string) => {
              return log[columnId as keyof LogEntry];
            },
            index: 0,
            depth: 0,
            parentId: undefined,
            renderValue: () => columnValue,
            subRows: [],
            getIsSelected: () => false,
            getIsAllSubRowsSelected: () => false,
            getCanSelect: () => false,
            getCanSelectSubRows: () => false,
            getIsSomeSelected: () => false,
            getToggleSelectedHandler: () => () => {},
            getVisibleCells: () => [],
            getAllCells: () => [],
            _getAllCellsByColumnId: () => ({}),
          };
          
          return customFilterFn(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rowObj as any,
            filter.column,
            filter,
            () => {} // Пустая функция для addMeta
          );
        });

        // Применяем глобальный фильтр
        const passesGlobalFilter = !globalFilter || 
          Object.values(log).some(val => {
            if (val == null) return false;
            return String(val).toLowerCase().includes(globalFilter.toLowerCase());
          });

        return passesColumnFilters && passesGlobalFilter;
      });

      setFilteredData(filtered);
    };

    applyFilters();
  }, [columnFilters, globalFilter, logs]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    filterFns: {
      customFilter: customFilterFn,
    },
    state: {
      sorting,
      globalFilter,
    },
  });

  // const handleExport = () => {
  //   if (onExport) {
  //     onExport(filteredData);
  //   } else {
  //     const csvContent = [
  //       ['Время', 'Уровень', 'Источник', 'Сообщение', 'Пользователь', 'Код состояния', 'IP', 'Длительность'],
  //       ...filteredData.map(log => [
  //         format(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
  //         log.level,
  //         log.source,
  //         log.message,
  //         log.userId || '',
  //         log.statusCode || '',
  //         log.ip || '',
  //         log.duration ? `${log.duration}ms` : '',
  //       ]),
  //     ]
  //       .map(row => row.map(cell => `"${cell}"`).join(','))
  //       .join('\n');

  //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = `logs_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
  //     link.click();
  //   }
  // };
  const handleExport = () => {
  if (onExport) {
    onExport(filteredData);
  } else {
    // Создаем CSV строку с правильной кодировкой
    const headers = ['Время', 'Уровень', 'Источник', 'Сообщение', 'Пользователь', 'Код состояния', 'IP', 'Длительность', 'Детали'];
    
    // Экранируем значения для CSV
    const escapeCsv = (value: unknown) => {
      if (value == null) return '';
      const stringValue = String(value);
      // Экранируем кавычки и добавляем кавычки если есть запятые, кавычки или переносы строк
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const rows = filteredData.map(log => [
      format(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      log.level,
      log.source,
      log.message,
      log.userId || '',
      log.statusCode || '',
      log.ip || '',
      log.duration ? `${log.duration}ms` : '',
      log.details ? JSON.stringify(log.details) : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => escapeCsv(cell)).join(','))
    ].join('\r\n'); // Используем \r\n для совместимости с Windows

    // Создаем BLOB с правильной кодировкой
    const blob = new Blob(['\uFEFF' + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });

    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `logs_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`;
    
    // Добавляем ссылку в DOM, кликаем и удаляем
    document.body.appendChild(link);
    link.click();
    
    // Очищаем ресурсы
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }
};

  const handleClearAllFilters = () => {
    setColumnFilters([]);
    setGlobalFilter('');
  };

  // Функция для форматирования значения фильтра для отображения
  const formatFilterValue = (filter: ColumnFilterConfig) => {
    if (filter.operator === 'isNull') return 'пусто';
    if (filter.operator === 'isNotNull') return 'не пусто';
    
    let valueText = filter.value;
    if (filter.value instanceof Date) {
      valueText = format(filter.value, 'dd.MM.yyyy HH:mm');
    }
    
    if (filter.operator === 'between' && filter.value2) {
      let value2Text = filter.value2;
      if (filter.value2 instanceof Date) {
        value2Text = format(filter.value2, 'dd.MM.yyyy HH:mm');
      }
      return `${valueText} - ${value2Text}`;
    }
    
    return `${valueText}`;
  };

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col space-y-4">
        {/* Верхняя панель с глобальным поиском и действиями */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по всем полям..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Быстрые фильтры
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setColumnFilters([...columnFilters, {
                    column: 'level',
                    operator: 'equals',
                    value: 'error',
                  }])}
                >
                  Только ошибки
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setColumnFilters([...columnFilters, {
                    column: 'timestamp',
                    operator: 'greaterThan',
                    value: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  }])}
                >
                  За последние 24 часа
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setColumnFilters([...columnFilters, {
                    column: 'statusCode',
                    operator: 'greaterThan',
                    value: 399,
                  }])}
                >
                  HTTP ошибки (≥400)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-2">
            {(columnFilters.length > 0 || globalFilter) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Очистить фильтры
              </Button>
            )}
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        {/* Панель активных фильтров */}
        {columnFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground self-center">Активные фильтры:</span>
            {columnFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <span className="font-medium">{filter.column}:</span>
                <span>
                  {operatorLabels[filter.operator]}: {formatFilterValue(filter)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => {
                    const newFilters = columnFilters.filter((_, i) => i !== index);
                    setColumnFilters(newFilters);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Таблица */}
      <ScrollArea className="bg-primary-foreground rounded-md border h-[calc(100vh-300px)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>Логи не найдены</p>
                    <p className="text-sm mt-1">
                      Попробуйте изменить параметры фильтрации
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Статистика */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-muted-foreground">
        <div>
          Всего записей: {logs.length}
          {columnFilters.length > 0 && (
            <span className="ml-2">
              (Отфильтровано: {filteredData.length})
            </span>
          )}
          {globalFilter && (
            <span className="ml-2">
              {`Поиск: ${globalFilter}`}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="flex items-center">
              <Info className="h-3 w-3 mr-1" />
              {filteredData.filter(l => l.level === 'info').length}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {filteredData.filter(l => l.level === 'warning').length}
            </Badge>
            <Badge variant="destructive" className="flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {filteredData.filter(l => l.level === 'error').length}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}