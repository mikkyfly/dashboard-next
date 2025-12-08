'use client';

import {
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Key, 
  Link, 
  Text, 
  Calendar, 
  Hash, 
  Binary,
  FileText,
  
} from 'lucide-react';
import { FieldType, TableNodeData } from '@/types/node';

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
    <div className="bg-topology-body border-1  border-border rounded-md shadow-xl min-w-[280px] relative">
      {/* Handle для левой стороны */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-400 border-2 border-gray-800"
      />
      
      {/* Заголовок таблицы */}
      <div className="flex items-center space-x-2 px-4 py-3 bg-chart-6 border-b border-border rounded-t-md h-15">
        <div className="text-secondery">
          {data.icon}
        </div>
        <div className="text-secondery font-bold text-md">{data.tableName}</div>
      </div>
      
      {/* Поля таблицы */}
      <div className="py-2">
        {data.fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 hover:bg-border border-b border-sidebar-border last:border-b-0 relative"
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
                field.foreignKey ? 'text-green-300' : 'text-secondery'
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
      {/* <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-400 border-2 border-gray-800"
      /> */}
    </div>
  );
}

export default TableNode;