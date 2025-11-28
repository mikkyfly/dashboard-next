'use client';

import React, { useState, useCallback } from 'react';
import { Node, Edge, useNodesState, useEdgesState, useReactFlow } from 'reactflow';
import DatabaseSchema from '@/components/AppTopology';
import ControlPanel from '@/components/ControlPanel';
import { TableNodeData } from '@/types/database';

const initialNodes: Node<TableNodeData>[] = [
  {
    id: 'users',
    type: 'table',
    position: { x: 100, y: 100 },
    data: {
      tableName: 'users',
      description: 'User accounts table',
      columns: [
        { id: 'users-id', name: 'id', type: 'SERIAL', isPrimaryKey: true },
        { id: 'users-username', name: 'username', type: 'VARCHAR(50)' },
        { id: 'users-email', name: 'email', type: 'VARCHAR(100)' },
        { id: 'users-created_at', name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  },
  {
    id: 'posts',
    type: 'table',
    position: { x: 400, y: 100 },
    data: {
      tableName: 'posts',
      description: 'Blog posts table',
      columns: [
        { id: 'posts-id', name: 'id', type: 'SERIAL', isPrimaryKey: true },
        { id: 'posts-title', name: 'title', type: 'VARCHAR(255)' },
        { id: 'posts-content', name: 'content', type: 'TEXT' },
        { id: 'posts-user_id', name: 'user_id', type: 'INT', isForeignKey: true },
        { id: 'posts-created_at', name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'users-posts',
    source: 'users',
    target: 'posts',
    sourceHandle: 'users-id',
    targetHandle: 'posts-user_id',
    label: '1:N',
    type: 'smoothstep',
    style: { stroke: '#60a5fa', strokeWidth: 3 },
  },
];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  // const { fitView } = useReactFlow();

  const handleTableAdd = useCallback((newTable: Node<TableNodeData>) => {
    setNodes((nds) => nds.concat(newTable));
  }, [setNodes]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedNode(null);
  }, []);

  // const handleResetView = useCallback(() => {
  //   fitView({ duration: 800 });
  // }, [fitView]);

  const handleClearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  return (
    <main className="h-screen w-full bg-gray-900">
      <DatabaseSchema 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        selectedNode={selectedNode}
      />
      
      {/* <ControlPanel 
        onTableAdd={handleTableAdd}
        onResetView={handleResetView}
        onClearAll={handleClearAll}
      /> */}
      
      {/* Statistics Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600 shadow-xl">
          <h4 className="font-bold text-white mb-2">📊 Table Info</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <div>• <span className="text-blue-400">Table:</span> {selectedNode.data.tableName}</div>
            <div>• <span className="text-green-400">Columns:</span> {selectedNode.data.columns.length}</div>
            {/* <div>• <span className="text-purple-400">Primary Keys:</span> {selectedNode.data.columns.filter(col => col.isPrimaryKey).length}</div> */}
          </div>
        </div>
      )}

      {/* Global Stats */}
      <div className="absolute bottom-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600 shadow-xl">
        <h4 className="font-bold text-white mb-2">📈 Schema Stats</h4>
        <div className="text-sm text-gray-300 space-y-1">
          <div>• <span className="text-blue-400">Tables:</span> {nodes.length}</div>
          <div>• <span className="text-green-400">Relationships:</span> {edges.length}</div>
          <div>• <span className="text-purple-400">Total Columns:</span> {nodes.reduce((acc, node) => acc + node.data.columns.length, 0)}</div>
        </div>
      </div>
    </main>
  );
}