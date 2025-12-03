/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  details?: Record<string, any>;
  userId?: string;
  ip?: string;
  duration?: number;
  statusCode?: number;
}

export type LogLevel = LogEntry['level'];

export type FilterOperator = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'between'
  | 'isNull'
  | 'isNotNull';

export interface ColumnFilterConfig {
  column: string;
  operator: FilterOperator;
  value: any;
  value2?: any; // Для оператора 'between'
}