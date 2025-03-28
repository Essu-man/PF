import {
    Bone,
    Egg,
    Home,
    Pill,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Egg,
      label: 'Egg Logging',
      path: '/egg-logging'
    },
    {
      icon: Bone,
      label: 'Feed Management',
      path: '/feed-management'
    },
    {
      icon: Pill,
      label: 'Medication Tracking',
      path: '/medication-tracking'
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Poultry Farm
        </h1>
      </div>
      <nav className="p-4 flex justify-center">
        <div className="flex space-x-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center p-3 rounded-lg transition-colors duration-200
                border border-transparent
                ${isActive(item.path)
                  ? 'bg-violet-50 text-violet-600 border-violet-200 shadow-sm'
                  : 'hover:bg-gray-100 text-gray-700 hover:border-gray-200'}
              `}
            >
              <item.icon className="mr-2" size={20} />
              <span className="text-sm font-bold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;