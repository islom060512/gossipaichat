import React from 'react';
import { WrapUpResult } from '../types';

interface WrapUpCardProps {
  analysis: WrapUpResult;
}

const WrapUpCard: React.FC<WrapUpCardProps> = ({ analysis }) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-xl p-6 col-span-full animate-fade-in">
      <h3 className="text-2xl font-bold text-purple-800 mb-4">✨ AI Psychologist's Wrap-Up ✨</h3>
      <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">"{analysis.psychologistSummary}"</p>
      <div className="bg-white rounded-xl p-4 border border-purple-200">
        <h4 className="text-2xl font-semibold text-purple-700 mb-2">My Advice:</h4>
        <p className="text-lg text-gray-800">{analysis.advice}</p>
      </div>
    </div>
  );
};

export default WrapUpCard; 