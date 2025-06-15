import React from 'react';
import { MessageSquare, Brain, BarChart3, Menu } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'analyze' | 'results') => void;
  conversationCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, conversationCount }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GossipAI
              </h1>
              <p className="text-xs text-gray-500">Conversation Intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('analyze')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'analyze'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              New Analysis
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-sm text-gray-500">
              {conversationCount} conversations analyzed
            </div>
            <button className="md:hidden p-2 text-gray-600 hover:text-purple-600">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;