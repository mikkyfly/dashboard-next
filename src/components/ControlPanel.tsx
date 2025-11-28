'use client';

import React, { useState } from 'react';
import { useReactFlow, Node } from 'reactflow';
import { TableNodeData, TableColumn } from '../types/database';

interface ControlPanelProps {
  onTableAdd: (table: Node<TableNodeData>) => void;
  onResetView: () => void;
  onClearAll: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onTableAdd, onResetView, onClearAll }) => {
  const [tableName, setTableName] = useState('');
  const [description, setDescription] = useState('');
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const { project } = useReactFlow();

  const addColumn = () => {
    setColumns([
      ...columns,
      {
        id: `col-${Date.now()}`,
        name: '',
        type: 'VARCHAR(255)',
      },
    ]);
  };

  const updateColumn = (index: number, field: keyof TableColumn, value: string | boolean) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const addTable = () => {
    if (!tableName.trim()) return;

    const newNode: Node<TableNodeData> = {
      id: `table-${Date.now()}`,
      type: 'table',
      position: project({ x: Math.random() * 500, y: Math.random() * 500 }),
      data: {
        tableName: tableName.trim(),
        description: description.trim(),
        columns: columns.filter(col => col.name.trim() !== ''),
      },
    };

    onTableAdd(newNode);
    setTableName('');
    setDescription('');
    setColumns([]);
  };

  const columnTypes = [
    'SERIAL', 'INT', 'BIGINT', 'VARCHAR(255)', 'TEXT', 'BOOLEAN',
    'TIMESTAMP', 'DATE', 'TIME', 'DECIMAL', 'FLOAT', 'JSON'
  ];

  const presetTables = [
    {
      name: 'Users',
      columns: [
        { name: 'id', type: 'SERIAL', isPrimaryKey: true },
        { name: 'username', type: 'VARCHAR(50)' },
        { name: 'email', type: 'VARCHAR(100)' },
      ]
    },
    {
      name: 'Products',
      columns: [
        { name: 'id', type: 'SERIAL', isPrimaryKey: true },
        { name: 'name', type: 'VARCHAR(100)' },
        { name: 'price', type: 'DECIMAL' },
      ]
    }
  ];

  // const addPresetTable = (preset: any) => {
  //   const newNode: Node<TableNodeData> = {
  //     id: `table-${Date.now()}`,
  //     type: 'table',
  //     position: project({ x: Math.random() * 500, y: Math.random() * 500 }),
  //     data: {
  //       tableName: preset.name,
  //       columns: preset.columns.map((col: any, index: number) => ({
  //         id: `col-${Date.now()}-${index}`,
  //         ...col
  //       })),
  //     },
  //   };
  //   onTableAdd(newNode);
  // };

  return (
    <div className="absolute top-4 left-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 w-80 border border-gray-600 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">🗃️ Database Builder</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button
              onClick={onResetView}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
            >
              🔍 Reset View
            </button>
            <button
              onClick={onClearAll}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Preset Tables */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Tables</h4>
            <div className="flex space-x-2">
              {presetTables.map((preset, index) => (
                <button
                  key={index}
                  // onClick={() => addPresetTable(preset)}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 px-2 rounded-lg transition-colors text-xs"
                >
                  + {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Table Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Table Name *
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="Enter table name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="Table description"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Columns
                </label>
                <button
                  onClick={addColumn}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors font-medium"
                >
                  + Add Column
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {columns.map((column, index) => (
                  <div key={column.id} className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg">
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Column name"
                        value={column.name}
                        onChange={(e) => updateColumn(index, 'name', e.target.value)}
                        className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-sm text-white placeholder-gray-400"
                      />
                      <button
                        onClick={() => removeColumn(index)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-sm rounded transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <select
                      value={column.type}
                      onChange={(e) => updateColumn(index, 'type', e.target.value)}
                      className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-sm text-white mb-2"
                    >
                      {columnTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    <div className="flex justify-between text-sm">
                      <label className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          checked={column.isPrimaryKey || false}
                          onChange={(e) => updateColumn(index, 'isPrimaryKey', e.target.checked)}
                          className="mr-2 bg-gray-600 border-gray-500"
                        />
                        <span className="text-green-400">PK</span>
                      </label>
                      <label className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          checked={column.isForeignKey || false}
                          onChange={(e) => updateColumn(index, 'isForeignKey', e.target.checked)}
                          className="mr-2 bg-gray-600 border-gray-500"
                        />
                        <span className="text-orange-400">FK</span>
                      </label>
                      <label className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          checked={column.nullable || false}
                          onChange={(e) => updateColumn(index, 'nullable', e.target.checked)}
                          className="mr-2 bg-gray-600 border-gray-500"
                        />
                        <span className="text-blue-400">NULL</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={addTable}
              disabled={!tableName.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed font-bold shadow-lg"
            >
              🚀 Create Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;