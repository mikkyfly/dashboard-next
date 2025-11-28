'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  BackgroundVariant,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TableNode from './TableNode';
import { TableNodeData } from '../types/database';

const nodeTypes: NodeTypes = {
  table: TableNode,
};

interface DatabaseSchemaProps {
  nodes: Node<TableNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onNodeClick?: (event: React.MouseEvent, node: Node) => void;
  onEdgeClick?: (event: React.MouseEvent, edge: Edge) => void;
  selectedNode?: Node | null;
}

const AppTopology: React.FC<DatabaseSchemaProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onEdgeClick,
  selectedNode,
}) => {
  // const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        style: { 
          stroke: '#60a5fa', 
          strokeWidth: 3,
          transition: 'all 0.3s ease'
        },
        label: '1:N',
        type: 'smoothstep',
        labelStyle: { 
          fill: '#60a5fa', 
          fontWeight: 'bold',
          background: '#1f2937',
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #374151'
        },
        labelBgStyle: { fill: '#1f2937', fillOpacity: 0.8 },
        animated: true,
      };
      // onEdgesChange([{ 
      //   type: 'add', 
      //   item: newEdge 
      // }]);
    },
    [onEdgesChange]
  );

  const highlightedNodes = useMemo(() => {
    if (!selectedNode) return nodes;
    
    const connectedEdges = edges.filter(
      edge => edge.source === selectedNode.id || edge.target === selectedNode.id
    );
    
    const connectedNodeIds = new Set([
      selectedNode.id,
      ...connectedEdges.map(edge => edge.source),
      ...connectedEdges.map(edge => edge.target)
    ]);

    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: connectedNodeIds.has(node.id)
      }
    }));
  }, [nodes, edges, selectedNode]);

  const highlightedEdges = useMemo(() => {
    if (!selectedNode) return edges;
    
    return edges.map(edge => ({
      ...edge,
      animated: edge.source === selectedNode.id || edge.target === selectedNode.id,
      style: {
        ...edge.style,
        stroke: edge.source === selectedNode.id || edge.target === selectedNode.id 
          ? '#a78bfa' 
          : '#60a5fa',
        strokeWidth: edge.source === selectedNode.id || edge.target === selectedNode.id ? 4 : 3,
      }
    }));
  }, [edges, selectedNode]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <ReactFlow
        nodes={highlightedNodes}
        edges={highlightedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        className="dark-theme"
      >
        <Controls 
          position="top-right"
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-xl"
          // style={{ button: { backgroundColor: '#374151', color: 'white' } }}
        />
        <MiniMap 
          position="bottom-right"
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-xl"
          nodeColor={(node) => {
            if (node.selected) return '#60a5fa';
            if (node.data?.isHighlighted) return '#a78bfa';
            return '#4b5563';
          }}
          maskColor="rgba(0, 0, 0, 0.6)"
          style={{ background: 'rgba(17, 24, 39, 0.8)' }}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={40} 
          size={2} 
          color="rgba(107, 114, 128, 0.3)"
          className="opacity-30"
        />
        
        <Panel position="top-center" className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-600 shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-2">🗃️ Database Schema</h1>
          <p className="text-gray-300">Click on tables to highlight relationships • Drag to connect tables</p>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default AppTopology;