'use client';

import React from 'react';
import { 
  Trash2, 
  Sun, 
  User, 
  ArrowSquareOut, 
  SignOut,
  Plus,
  Eye
} from 'lucide-react';

interface SidebarProps {
  onNewCase: () => void;
  onViewCases: () => void;
  onClearConversations: () => void;
  onLightMode: () => void;
  onMyAccount: () => void;
  onUpdatesFAQ: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onNewCase,
  onViewCases,
  onClearConversations,
  onLightMode,
  onMyAccount,
  onUpdatesFAQ,
  onLogout
}) => {
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-gray-50 to-gray-50 border-r border-gray-200 flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-5">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={onNewCase}
            className="w-full bg-primary-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            New Case
          </button>
          
          <button
            onClick={onViewCases}
            className="w-full bg-primary-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-3"
          >
            <Eye className="w-5 h-5" />
            View Cases
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 border-t border-gray-200">
        <div className="space-y-1">
          <button
            onClick={onClearConversations}
            className="sidebar-item w-full text-left"
          >
            <Trash2 className="w-6 h-6" />
            <span className="text-sm font-medium">Clear conversations</span>
          </button>
          
          <button
            onClick={onLightMode}
            className="sidebar-item w-full text-left"
          >
            <Sun className="w-6 h-6" />
            <span className="text-sm font-medium">Light mode</span>
          </button>
          
          <button
            onClick={onMyAccount}
            className="sidebar-item w-full text-left"
          >
            <User className="w-6 h-6" />
            <span className="text-sm font-medium">My account</span>
          </button>
          
          <button
            onClick={onUpdatesFAQ}
            className="sidebar-item w-full text-left"
          >
            <ArrowSquareOut className="w-6 h-6" />
            <span className="text-sm font-medium">Updates & FAQ</span>
          </button>
          
          <button
            onClick={onLogout}
            className="sidebar-item w-full text-left"
          >
            <SignOut className="w-6 h-6" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
