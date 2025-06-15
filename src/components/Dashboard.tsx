import React from 'react';
import { MessageSquare, Zap, Plus, Clock, TrendingUp } from 'lucide-react';
import { ConversationData, AnalysisResult } from '../types';

interface DashboardProps {
  conversations: (ConversationData & { analysis: AnalysisResult })[];
  onViewChange: (view: 'dashboard' | 'analyze' | 'results', selectedConversation?: (ConversationData & { analysis: AnalysisResult })) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ conversations, onViewChange }) => {
  const stats = [
    {
      title: 'Total Conversations',
      value: conversations.length.toString(),
      icon: MessageSquare,
      color: 'purple',
      change: '+12%'
    },
    {
      title: 'Insights Generated',
      value: (conversations.length * (conversations.length > 0 ? 5 : 0)).toString(),
      icon: Zap,
      color: 'blue',
      change: '+15%'
    }
  ];

  const getConversationPreview = (conversation: ConversationData) => {
    if (conversation.imageUrl) {
      return "Image-based conversation";
    } else if (conversation.audioUrl) {
      return "Audio-based conversation";
    } else {
      const textContent = conversation.text || '';
      return textContent.substring(0, 100) + (textContent.length > 100 ? '...' : '');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to GossipAI
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock deeper insights from your conversations with AI-powered analysis, 
          emotion tracking, and subtle communication pattern detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${
                stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                'from-green-500 to-green-600'
              }`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Conversations
            </h3>
            <button 
              onClick={() => onViewChange('analyze')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Analysis</span>
            </button>
          </div>
          
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No conversations analyzed yet</p>
              <button 
                onClick={() => onViewChange('analyze')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Analyze Your First Conversation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.filter(conversation => conversation != null).slice(-5).reverse().map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all cursor-pointer"
                  onClick={() => onViewChange('results', conversation)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Conversation #{conversation.id.substring(0, 4)}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.createdAt || '').toLocaleDateString()} at {new Date(conversation.createdAt || '').toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center space-x-1">
                      {conversation.imageUrl ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ) : conversation.audioUrl ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <MessageSquare className="h-3 w-3" />
                      )}
                      <span>{getConversationPreview(conversation)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Key Features
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">AI Judge</h4>
                <p className="text-sm text-gray-600">
                  Get objective analysis and scoring of conversation quality and dynamics.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Subtleties Detection</h4>
                <p className="text-sm text-gray-600">
                  Uncover hidden meanings, implications, and subtext in conversations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Emotion Timeline</h4>
                <p className="text-sm text-gray-600">
                  Track emotional changes and patterns throughout conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;