import React from 'react';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showUserInfo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "SynergySphere 2.0", showUserInfo = true }) => {
  const { user } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          {showUserInfo && user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome back, {user.name}
              </span>
              <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                <User size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;