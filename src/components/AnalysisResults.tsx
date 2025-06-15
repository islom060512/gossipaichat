import React, { useState } from 'react';
import { ArrowLeft, Star, MessageSquare, TrendingUp, Eye, Download, Share2 } from 'lucide-react';
import { AnalysisResult } from '../types';
import EmotionChart from './EmotionChart';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onBack: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'judge' | 'subtleties' | 'emotions'>('summary');

  const tabs = [
    { id: 'summary', label: 'Summary', icon: MessageSquare },
    { id: 'judge', label: 'AI Judge', icon: Star },
    { id: 'subtleties', label: 'Subtleties', icon: Eye },
    { id: 'emotions', label: 'Emotions', icon: TrendingUp },
  ];

  
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analysis Results
            </h2>
            <p className="text-gray-600">
              Comprehensive AI-powered conversation analysis and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/80 transition-all">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
        <div className="border-b border-white/20">
          <nav className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Summary
                </h3>
                <div className="bg-white/50 rounded-xl p-6 border border-white/30">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {analysis.summary?.summaryText}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-1">{analysis.judgeScore}/10</div>
                  <div className="text-purple-100">Overall Score</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-1">{analysis.subtleties?.length}</div>
                  <div className="text-blue-100">Subtleties Found</div>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-1">{analysis.emotions?.length}</div>
                  <div className="text-pink-100">Emotion Points</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'judge' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <span className="text-3xl font-bold text-white">{analysis.judgeScore}</span>
                  <span className="text-lg text-purple-100">/10</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Judge Assessment
                </h3>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-white/30">
                <h4 className="font-medium text-gray-900 mb-3">Detailed Comments</h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {analysis.aiJudge?.analysisText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Strengths</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 text-sm">Good conversation flow</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 text-sm">Clear communication</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800 text-sm">Active listening</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800 text-sm">Empathy expression</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subtleties' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Detected Subtleties & Hidden Meanings
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI has identified subtle communication patterns and underlying meanings in the conversation.
                </p>
              </div>

              <div className="space-y-4">
                {analysis.subtleties?.map((subtlety, index) => (
                  <div key={index} className="bg-white/50 rounded-xl p-6 border border-white/30 hover:bg-white/70 transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {subtlety}
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>High confidence</span>
                          </span>
                          <span>Pattern detected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'emotions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Emotional Timeline Analysis
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our AI provides a detailed timeline of emotional shifts throughout the conversation.
                </p>
              </div>

              <EmotionChart emotions={analysis.emotions || []} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-xl p-6 border border-white/30">
                  <h4 className="font-medium text-gray-900 mb-4">Emotion Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dominant Emotion</span>
                      <span className="font-medium text-purple-600">Curious</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Peak Intensity</span>
                      <span className="font-medium text-red-600">0.8 (Defensive)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Emotional Shifts</span>
                      <span className="font-medium text-blue-600">4 changes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6 border border-white/30">
                  <h4 className="font-medium text-gray-900 mb-4">Key Insights</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>• Speaker 2 showed defensive patterns when certain topics were raised</p>
                    <p>• Conversation ended on a positive note with apologetic tone</p>
                    <p>• Emotional intensity peaked around the 60-second mark</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;