export type FieldType = 'string' | 'integer' | 'boolean' | 'datetime' | 'text' | 'float' | 'json';

export interface TableField {
  name: string;
  type: FieldType;
  primaryKey?: boolean;
  foreignKey?: boolean;
  nullable?: boolean;
  unique?: boolean;
}

export interface TableNodeData {
  tableName: string;
  fields: TableField[];
  icon: React.ReactNode;
}