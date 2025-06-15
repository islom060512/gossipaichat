import React from 'react';
import { SummaryResult } from '../types';

interface SummaryCardProps {
  summary: SummaryResult;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="text-6xl mb-4">
        {summary.mainEmotionEmoji}
      </div>
      <h3 className="text-4xl font-bold text-gray-800 mb-2">Summary</h3>
      <p className="text-2xl text-gray-600 mb-4">{summary.summaryText}</p>
      <div className="text-2xl font-semibold text-purple-700">
        Relationship Tone: <span className="text-purple-900">{summary.relationshipTone}</span>
      </div>
    </div>
  );
};

export default SummaryCard; 