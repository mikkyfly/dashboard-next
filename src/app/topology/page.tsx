// app/page.tsx
import AppTopology from '@/components/AppTopology';
import { 
  // Table, 
  Key, 
  Link, 
  Text, 
  Hash, 
  // Binary,
  // Calendar,
  // Database
} from 'lucide-react';

export default function Home() {
  return (
    <div className="">
      <div className="max-w-9xl mx-auto ">
        

        {/* Схема БД */}
        <div className='w-full h-[980px] rounded-lg border border-secondary'>
          <AppTopology />

        </div>
        {/* Легенда */}
        <div className="bg-card border border-secondary rounded-lg p-6 mt-6 ">
          <h2 className="text-xl font-semibold mb-4 ">Топология сети</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-yellow-400" />
              <div>
                <span className="text-sm">Первичный ключ</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link className="w-5 h-5 text-green-400" />
              <div>
                <span className="text-sm">Внешний ключ</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <Text className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="text-sm">Строковый тип</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <Hash className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <span className="text-sm">Числовой тип</span>
              </div>
            </div>
          </div>
          
          {/* Типы связей */}
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-lg font-medium mb-3">Типы связей</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-blue-400"></div>
                <span className="text-sm">Один-ко-многим (1:N)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-purple-400"></div>
                <span className="text-sm">Многие-ко-многим (N:M)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-green-400" style={{ strokeDasharray: '5,5' }}></div>
                <span className="text-sm">Саморефернтная связь</span>
              </div>
            </div>
          </div>
        </div>
        {/* Статистика
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Table className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-ring text-sm">Таблиц</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Key className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-ring text-sm">Связей</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-ring text-sm">Полей</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Link className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-ring text-sm">Типа связей</p>
              </div>
            </div>
          </div>
        </div> */}
  
      </div>
    </div>
  );
}