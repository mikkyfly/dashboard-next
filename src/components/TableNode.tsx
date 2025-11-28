import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TableNodeData } from '../types/database';

const TableNode: React.FC<NodeProps<TableNodeData>> = ({ data, selected }) => {
  return (
    <div className={`
      rounded-xl shadow-2xl border-2 min-w-[260px] transition-all duration-300 transform
      ${selected 
        ? 'border-blue-400 scale-105 shadow-blue-500/20' 
        : data.isHighlighted 
          ? 'border-purple-400 shadow-purple-500/20' 
          : 'border-blue-600'
      }
      ${data.isHighlighted ? 'bg-gray-800' : 'bg-gray-900'}
      hover:scale-102 hover:shadow-lg
    `}>
      {/* Table header */}
      <div className={`
        px-4 py-3 rounded-t-xl border-b transition-colors duration-300
        ${selected 
          ? 'bg-blue-600 border-blue-400' 
          : data.isHighlighted 
            ? 'bg-purple-600 border-purple-400' 
            : 'bg-blue-700 border-blue-600'
        }
      `}>
        <div className="font-bold text-white text-center text-lg">{data.tableName}</div>
        {data.description && (
          <div className="text-xs text-blue-200 text-center mt-1">
            {data.description}
          </div>
        )}
      </div>

      {/* Table columns */}
      <div className="py-2 max-h-80 overflow-y-auto custom-scrollbar">
        {data.columns.map((column, index) => (
          <div
            key={column.id}
            className={`
              px-4 py-3 flex justify-between items-center border-b transition-all duration-200
              ${column.isPrimaryKey ? 'bg-green-500/10' : ''}
              ${index === data.columns.length - 1 ? 'border-b-0' : 'border-gray-700'}
              hover:bg-gray-800/50 cursor-pointer group
            `}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
                {column.name}
              </span>
              <div className="flex space-x-1">
                {column.isPrimaryKey && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    PK
                  </span>
                )}
                {column.isForeignKey && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    FK
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {column.type}
              </span>
              {column.nullable && (
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">NULL</span>
              )}
            </div>

            {/* Handles for connections */}
            <Handle
              type="source"
              position={Position.Right}
              id={column.id}
              className="w-4 h-4 border-2 border-white bg-blue-500 hover:bg-blue-400 transition-colors shadow-lg"
            />
            <Handle
              type="target"
              position={Position.Left}
              id={column.id}
              className="w-4 h-4 border-2 border-white bg-green-500 hover:bg-green-400 transition-colors shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableNode;