 // components/DatabaseSchema.tsx
'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  // Node,
  // Edge,
  Background,
  // Controls,
  // MiniMap,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  NodeTypes,
  BackgroundVariant,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { 
  Table, 
  Key, 
  Link, 
  Text, 
  Calendar, 
  Hash, 
  Binary,
  FileText,
  User
} from 'lucide-react';

// Типы данных полей
type FieldType = 'string' | 'integer' | 'boolean' | 'datetime' | 'text' | 'float' | 'json';

interface TableField {
  name: string;
  type: FieldType;
  primaryKey?: boolean;
  foreignKey?: boolean;
  nullable?: boolean;
  unique?: boolean;
}

interface TableNodeData {
  tableName: string;
  fields: TableField[];
  icon: React.ReactNode;
}

// Кастомный узел таблицы с handle'ами
const TableNode = ({ data }: { data: TableNodeData }) => {
  const getTypeColor = (type: FieldType) => {
    const colors = {
      string: 'text-green-400',
      integer: 'text-blue-400',
      boolean: 'text-purple-400',
      datetime: 'text-orange-400',
      text: 'text-teal-400',
      float: 'text-indigo-400',
      json: 'text-pink-400'
    };
    return colors[type];
  };

  const getTypeIcon = (type: FieldType) => {
    const icons = {
      string: <Text className="w-3 h-3" />,
      integer: <Hash className="w-3 h-3" />,
      boolean: <Binary className="w-3 h-3" />,
      datetime: <Calendar className="w-3 h-3" />,
      text: <FileText className="w-3 h-3" />,
      float: <Hash className="w-3 h-3" />,
      json: <FileText className="w-3 h-3" />
    };
    return icons[type];
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg shadow-lg min-w-[280px] relative">
      {/* Handle для левой стороны */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-400 border-2 border-gray-800"
      />
      
      {/* Заголовок таблицы */}
      <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 border-b border-gray-700 rounded-t-lg">
        <div className="text-blue-400">
          {data.icon}
        </div>
        <div className="text-white font-bold text-sm">{data.tableName}</div>
      </div>
      
      {/* Поля таблицы */}
      <div className="py-2">
        {data.fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-800 border-b border-gray-800 last:border-b-0 relative"
          >
            {/* Handle для каждого поля с внешним ключом */}
            {(field.primaryKey || field.foreignKey) && (
              <Handle
                type={field.primaryKey ? "source" : field.foreignKey ? "target" : "source"}
                position={Position.Right}
                id={field.name}
                className="w-2 h-2 bg-yellow-400 border border-gray-800"
                style={{
                  backgroundColor: field.primaryKey ? '#fbbf24' : '#34d399'
                }}
              />
            )}
            
            <div className="flex items-center space-x-2 flex-1">
              {/* Иконки ключей */}
              <div className="flex space-x-1">
                {field.primaryKey && (
                  <Key className="w-3 h-3 text-yellow-400" />
                )}
                {field.foreignKey && (
                  <Link className="w-3 h-3 text-green-400" />
                )}
              </div>
              
              {/* Имя поля */}
              <span className={`text-sm ${
                field.primaryKey ? 'text-yellow-300 font-semibold' : 
                field.foreignKey ? 'text-green-300' : 'text-gray-300'
              }`}>
                {field.name}
              </span>
              
              {/* Ограничения */}
              <div className="flex space-x-1">
                {field.unique && (
                  <span className="text-xs text-purple-400">U</span>
                )}
                {field.nullable && (
                  <span className="text-xs text-gray-500">NULL</span>
                )}
              </div>
            </div>
            
            {/* Тип данных */}
            <div className={`flex items-center space-x-1 text-xs ${getTypeColor(field.type)}`}>
              {getTypeIcon(field.type)}
              <span>{field.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Handle для правой стороны */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-400 border-2 border-gray-800"
      />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  table: TableNode,
};

export default function DatabaseSchema() {
  const [nodes, , onNodesChange] = useNodesState([
    {
      id: 'users',
      type: 'table',
      position: { x: 100, y: 100 },
      data: {
        tableName: 'users',
        icon: <User className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'username', type: 'string', unique: true },
          { name: 'email', type: 'string', unique: true },
          { name: 'password_hash', type: 'string' },
          { name: 'first_name', type: 'string' },
          { name: 'last_name', type: 'string' },
          { name: 'created_at', type: 'datetime' },
          { name: 'updated_at', type: 'datetime' },
          { name: 'is_active', type: 'boolean' }
        ]
      },
    },
    {
      id: 'posts',
      type: 'table',
      position: { x: 450, y: 100 },
      data: {
        tableName: 'posts',
        icon: <FileText className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'user_id', type: 'integer', foreignKey: true },
          { name: 'title', type: 'string' },
          { name: 'content', type: 'text' },
          { name: 'slug', type: 'string', unique: true },
          { name: 'created_at', type: 'datetime' },
          { name: 'updated_at', type: 'datetime' },
          { name: 'published', type: 'boolean' }
        ]
      },
    },
    {
      id: 'categories',
      type: 'table',
      position: { x: 800, y: 100 },
      data: {
        tableName: 'categories',
        icon: <Table className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'name', type: 'string', unique: true },
          { name: 'slug', type: 'string', unique: true },
          { name: 'description', type: 'text', nullable: true },
          { name: 'created_at', type: 'datetime' }
        ]
      },
    },
    {
      id: 'comments',
      type: 'table',
      position: { x: 300, y: 400 },
      data: {
        tableName: 'comments',
        icon: <FileText className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'post_id', type: 'integer', foreignKey: true },
          { name: 'user_id', type: 'integer', foreignKey: true },
          { name: 'parent_id', type: 'integer', foreignKey: true, nullable: true },
          { name: 'content', type: 'text' },
          { name: 'created_at', type: 'datetime' },
          { name: 'updated_at', type: 'datetime' },
          { name: 'is_approved', type: 'boolean' }
        ]
      },
    },
    {
      id: 'tags',
      type: 'table',
      position: { x: 600, y: 400 },
      data: {
        tableName: 'tags',
        icon: <Table className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'name', type: 'string', unique: true },
          { name: 'slug', type: 'string', unique: true },
          { name: 'created_at', type: 'datetime' }
        ]
      },
    },
    {
      id: 'post_tags',
      type: 'table',
      position: { x: 900, y: 400 },
      data: {
        tableName: 'post_tags',
        icon: <Link className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'post_id', type: 'integer', foreignKey: true },
          { name: 'tag_id', type: 'integer', foreignKey: true },
          { name: 'created_at', type: 'datetime' }
        ]
      },
    },
    {
      id: 'post_categories',
      type: 'table',
      position: { x: 1200, y: 250 },
      data: {
        tableName: 'post_categories',
        icon: <Link className="w-4 h-4" />,
        fields: [
          { name: 'id', type: 'integer', primaryKey: true },
          { name: 'post_id', type: 'integer', foreignKey: true },
          { name: 'category_id', type: 'integer', foreignKey: true },
          { name: 'created_at', type: 'datetime' }
        ]
      },
    }
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: 'users-posts',
      source: 'users',
      target: 'posts',
      sourceHandle: 'id',
      targetHandle: 'user_id',
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      label: '1:N',
      labelStyle: { fill: '#60a5fa', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'posts-comments',
      source: 'posts',
      target: 'comments',
      sourceHandle: 'id',
      targetHandle: 'post_id',
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      label: '1:N',
      labelStyle: { fill: '#60a5fa', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'users-comments',
      source: 'users',
      target: 'comments',
      sourceHandle: 'id',
      targetHandle: 'user_id',
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      label: '1:N',
      labelStyle: { fill: '#60a5fa', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'comments-self',
      source: 'comments',
      target: 'comments',
      sourceHandle: 'id',
      targetHandle: 'parent_id',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' },
      label: '1:N (self)',
      labelStyle: { fill: '#10b981', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'posts-tags',
      source: 'posts',
      target: 'post_tags',
      sourceHandle: 'id',
      targetHandle: 'post_id',
      type: 'smoothstep',
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      label: 'N:M',
      labelStyle: { fill: '#8b5cf6', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'tags-post_tags',
      source: 'tags',
      target: 'post_tags',
      sourceHandle: 'id',
      targetHandle: 'tag_id',
      type: 'smoothstep',
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'posts-categories',
      source: 'posts',
      target: 'post_categories',
      sourceHandle: 'id',
      targetHandle: 'post_id',
      type: 'smoothstep',
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      label: 'N:M',
      labelStyle: { fill: '#f59e0b', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
    {
      id: 'categories-post_categories',
      source: 'categories',
      target: 'post_categories',
      sourceHandle: 'id',
      targetHandle: 'category_id',
      type: 'smoothstep',
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
    },
  ]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      label: '1:N',
      labelStyle: { fill: '#60a5fa', fontWeight: 'bold' },
    }, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[850px] bg-gray-950 rounded-lg border border-gray-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{hideAttribution:true}}  
        className="bg-gray-950"
        connectionLineStyle={{ stroke: '#60a5fa', strokeWidth: 2 }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={25} 
          size={1} 
          color="#374151"
        />
        {/* <Controls 
          className="!bg-gray-800 !border !border-gray-700 rounded-md"
          style={{
            backgroundColor: '#1f2937',
            borderColor: '#374151',
          }}
        /> */}
        {/* <MiniMap 
          className="bg-gray-900 border border-gray-700"
          nodeColor="#1f2937"
          maskColor="rgba(0, 0, 0, 0.6)"
        /> */}
      </ReactFlow>
    </div>
  );
}