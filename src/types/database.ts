export interface TableColumn {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  nullable?: boolean;
  defaultValue?: string;
}

export interface TableNodeData {
  tableName: string;
  columns: TableColumn[];
  description?: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export interface DatabaseRelationship {
  id: string;
  sourceTable: string;
  targetTable: string;
  sourceColumn: string;
  targetColumn: string;
  relationshipType: 'one-to-one' | 'one-to-many' | 'many-to-many';
}