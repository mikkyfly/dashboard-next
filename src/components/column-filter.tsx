'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {  FilterOperator, ColumnFilterConfig } from '@/types/log';

interface ColumnFilterProps {
  column: string;
  columnType: 'string' | 'number' | 'date' | 'enum';
  enumValues?: string[];
  filters: ColumnFilterConfig[];
  onFilterChange: (filters: ColumnFilterConfig[]) => void;
}

const operatorConfig = {
  string: ['equals', 'contains', 'startsWith', 'endsWith', 'isNull', 'isNotNull'] as FilterOperator[],
  number: ['equals', 'greaterThan', 'lessThan', 'between', 'isNull', 'isNotNull'] as FilterOperator[],
  date: ['equals', 'greaterThan', 'lessThan', 'between', 'isNull', 'isNotNull'] as FilterOperator[],
  enum: ['equals', 'isNull', 'isNotNull'] as FilterOperator[],
};

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

export function ColumnFilterComponent({
  column,
  columnType,
  enumValues,
  filters,
  onFilterChange,
}: ColumnFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [operator, setOperator] = React.useState<FilterOperator>('equals');
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');

  const columnFilter = filters.find(f => f.column === column);

  const handleApplyFilter = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filterValue: any = value;
    
    if (operator === 'isNull' || operator === 'isNotNull') {
      filterValue = null;
    } else if (columnType === 'number') {
      filterValue = parseFloat(value);
    } else if (columnType === 'date') {
      filterValue = new Date(value);
    }

    const newFilter: ColumnFilterConfig = {
      column,
      operator,
      value: filterValue,
    };

    if (operator === 'between') {
      if (columnType === 'number') {
        newFilter.value2 = parseFloat(value2);
      } else if (columnType === 'date') {
        newFilter.value2 = new Date(value2);
      }
    }

    const otherFilters = filters.filter(f => f.column !== column);
    onFilterChange([...otherFilters, newFilter]);
    setOpen(false);
  };

  const handleClearFilter = () => {
    const newFilters = filters.filter(f => f.column !== column);
    onFilterChange(newFilters);
    setValue('');
    setValue2('');
    setOperator('equals');
  };

  const renderValueInput = () => {
    if (operator === 'isNull' || operator === 'isNotNull') {
      return null;
    }

    if (columnType === 'enum' && enumValues) {
      return (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите значение" />
          </SelectTrigger>
          <SelectContent>
            {enumValues.map(val => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (columnType === 'date') {
      return (
        <Input
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите значение"
        />
      );
    }

    return (
      <Input
        type={columnType === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите значение"
      />
    );
  };

  const getFilterDisplayText = () => {
    if (!columnFilter) return null;
    
    const { operator, value, value2 } = columnFilter;
    const baseText = `${operatorLabels[operator]}`;
    
    if (operator === 'isNull' || operator === 'isNotNull') {
      return baseText;
    }
    
    let valueText = value;
    if (value instanceof Date) {
      valueText = value.toLocaleDateString();
    }
    
    if (operator === 'between' && value2) {
      let value2Text = value2;
      if (value2 instanceof Date) {
        value2Text = value2.toLocaleDateString();
      }
      return `${baseText} ${valueText} и ${value2Text}`;
    }
    
    return `${baseText} ${valueText}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 lg:px-3"
        >
          <Filter className="h-4 w-4 mr-2" />
          {columnFilter ? (
            <>
              <span className="max-w-[100px] truncate">
                {getFilterDisplayText()}
              </span>
              <Badge variant="secondary" className="ml-2">
                1
              </Badge>
            </>
          ) : (
            ''
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Фильтр по {column}</h4>
            {columnFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilter}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Оператор</Label>
            <Select
              value={operator}
              onValueChange={(val) => setOperator(val as FilterOperator)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operatorConfig[columnType].map(op => (
                  <SelectItem key={op} value={op}>
                    {operatorLabels[op]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {operator !== 'isNull' && operator !== 'isNotNull' && (
            <div className="space-y-2">
              <Label>Значение</Label>
              {renderValueInput()}
            </div>
          )}

          {operator === 'between' && (
            <div className="space-y-2">
              <Label>Второе значение</Label>
              <Input
                type={columnType === 'date' ? 'datetime-local' : columnType === 'number' ? 'number' : 'text'}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Введите второе значение"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleApplyFilter}>
              Применить
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}