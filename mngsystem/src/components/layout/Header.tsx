import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
      {/* Search or Breadcrumb could go here */}
      <div className="flex-1">
        {/* Placeholder for future search or breadcrumb */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;