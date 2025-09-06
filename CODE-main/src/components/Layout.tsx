import React from 'react';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  showUserButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showUserButton = true }) => {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      
      {/* User Profile Button - Bottom Left */}
      {showUserButton && user && (
        <div className="fixed bottom-6 left-6">
          <button className="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 flex items-center justify-center group">
            <User size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;