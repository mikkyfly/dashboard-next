'use client';

import { useCallback } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Table, 
  Link, 
  FileText,
  // User,
  PcCase
} from 'lucide-react';
import TableNode from './TableNode';

const nodeTypes: NodeTypes = {
  table: TableNode,
};

export default function AppTopology() {
  const [nodes, , onNodesChange] = useNodesState([
    {
      id: 'users',
      type: 'table',
      position: { x: 100, y: 100 },
      data: {
        tableName: 'device 1',
        icon: <PcCase className="w-4 h-4" />,
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
      position: { x: 100, y: 600 },
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
      position: { x: 450, y: 745 },
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
      position: { x: 800, y: 400 },
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
      animated: true,
      
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
      animated: true,
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
      animated: true,
    },
    {
      id: 'comments-self',
      source: 'comments',
      target: 'comments',
      sourceHandle: 'id',
      targetHandle: 'parent_id',
      type: 'smoothstep',
      style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '15,5' },
      label: '1:N (self)',
      labelStyle: { fill: '#10b981', fontWeight: 'bold' },
      labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
      animated: true,
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
      animated: true,
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
      animated: true,
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
      animated: true,
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
      animated: true,
    },
  ]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      label: '1:N',
      labelStyle: { fill: '#744c32ff', fontWeight: 'bold' },
      
    }, eds)),
    [setEdges],
  );

  return (
    <div className="h-[100%]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{hideAttribution:true}}  
        className="bg-card"
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