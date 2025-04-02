import {
    Egg,
    HelpCircle,
    LayoutDashboard,
    Settings,
    Syringe,
    User,
    Wheat
} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

  interface SidebarProps {
    className?: string;
  }

  const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const location = useLocation();

    const navItems = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />
      },
      {
        name: 'Egg Logging',
        path: '/egg-logging',
        icon: <Egg className="h-5 w-5" />
      },
      {
        name: 'Feed Management',
        path: '/feed-management',
        icon: <Wheat className="h-5 w-5" />
      },
      {
        name: 'Medication Tracking',
        path: '/medication-tracking',
        icon: <Syringe className="h-5 w-5" />
      },
    ];

    const bottomNavItems = [
      {
        name: 'Settings',
        path: '/settings',
        icon: <Settings className="h-5 w-5" />
      },
      {
        name: 'Help',
        path: '/help',
        icon: <HelpCircle className="h-5 w-5" />
      },
    ];

    return (
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-md ${className || ''}`}>
        {/* Logo/Branding */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center">
            <div className="p-1 bg-blue-600 rounded-md mr-2">
              <Egg className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-blue-600">PoultryPro</h1>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className={`mr-3 ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? 'text-blue-500'
                      : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {(location.pathname === item.path || location.pathname.startsWith(item.path + '/')) && (
                    <span className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation (Settings/Help) */}
        <div className="py-4 px-3 border-t border-gray-200">
          <ul className="space-y-2">
            {bottomNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className={`mr-3 ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? 'text-blue-500'
                      : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Farm Manager</p>
              <p className="text-xs text-gray-500">admin@poultrypro.com</p>
            </div>
          </div>
        </div>
      </aside>
    );
  };

  export default Sidebar;